import http from 'k6/http';
import { Rate, Trend } from 'k6/metrics';
import { check } from 'k6';
export const reqLatency = new Trend('reqLatency');
export const errorRate = new Rate('errors');
export const options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  scenarios: {
    load: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '5s', target: 500 },
        { duration: '10s', target: 1000 },
        { duration: '10s', target: 1000 },
        { duration: '5s', target: 0 }
      ]
    }
  },
  thresholds: {
    http_req_failed: ['rate<0.05'],
    errors: ['rate<0.05']
  }
};
const baseURL = 'https://localhost';
export default function () {
  const endpoints = [
    '/api/v1/public/news',
    '/api/v1/public/news/featured',
    '/api/v1/public/newsCategories',
    '/api/v1/public/recruitments',
    '/api/v1/public/departments',
    '/api/v1/public/employmentTypes',
    '/actuator/health'
  ];
  const targetEndpoint = endpoints[Math.floor(Math.random() * endpoints.length)];
  const url = `${baseURL}${targetEndpoint}`;
  const fakeIP = `198.51.${Math.floor(__VU / 250)}.${(__VU % 250) + 1}`;
  const res = http.get(url, {
    headers: {
      'Accept': 'application/json',
      'User-Agent': 'K6LoadTester',
      'X-Forwarded-For': fakeIP,
      'X-Real-IP': fakeIP
    }
  });
  reqLatency.add(res.timings.duration);
  const success = check(res, {
    '200': (r) => r.status === 200
  });
  if (!success) {
    errorRate.add(1);
  } else {
    errorRate.add(0);
  }
}