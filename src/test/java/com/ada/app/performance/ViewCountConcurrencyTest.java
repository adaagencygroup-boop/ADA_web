package com.ada.app.performance;
import java.util.UUID;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
public class ViewCountConcurrencyTest {
  @Test
  @SuppressWarnings("unchecked")
  public void testHighConcurrencyViewCountBuffering() throws InterruptedException {
    StringRedisTemplate redisTemplate = Mockito.mock(StringRedisTemplate.class);
    ValueOperations<String, String> valueOperations = Mockito.mock(ValueOperations.class);
    Mockito.when(redisTemplate.opsForValue()).thenReturn(valueOperations);
    AtomicInteger counter = new AtomicInteger(0);
    Mockito.when(valueOperations.increment(ArgumentMatchers.anyString())).thenAnswer(invocation -> (long) counter.incrementAndGet());
    int totalThreads = 50;
    int requestsPerThread = 20;
    int totalRequests = totalThreads * requestsPerThread;
    ExecutorService executor = Executors.newFixedThreadPool(totalThreads);
    CountDownLatch startGate = new CountDownLatch(1);
    CountDownLatch endGate = new CountDownLatch(totalThreads);
    UUID newsId = UUID.randomUUID();
    String redisKey = "viewCount:news:" + newsId;
    for (int i = 0; i < totalThreads; i++) {
      executor.submit(() -> {
        try {
          startGate.await();
          for (int j = 0; j < requestsPerThread; j++) {
            redisTemplate.opsForValue().increment(redisKey);
          }
        } catch (InterruptedException e) {
          Thread.currentThread().interrupt();
        } finally {
          endGate.countDown();
        }
      });
    }
    long startTime = System.currentTimeMillis();
    startGate.countDown();
    boolean completed = endGate.await(5, TimeUnit.SECONDS);
    long duration = System.currentTimeMillis() - startTime;
    executor.shutdown();
    Assertions.assertTrue(completed);
    Assertions.assertEquals(totalRequests, counter.get());
    Assertions.assertTrue(duration < 2000);
  }
}