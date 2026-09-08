package com.ada.app.common.security;
import java.time.Instant;
import java.util.Collections;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.script.DefaultRedisScript;
import org.springframework.stereotype.Component;
@Component
@RequiredArgsConstructor
public class RedisRateLimiter {
  private final StringRedisTemplate redisTemplate;
  private static final String slidingWindowLuaScript =
    "local key = KEYS[1]\n" +
    "local now = tonumber(ARGV[1])\n" +
    "local window = tonumber(ARGV[2])\n" +
    "local limit = tonumber(ARGV[3])\n" +
    "local clearBefore = now - window\n" +
    "redis.call('ZREMRANGEBYSCORE', key, 0, clearBefore)\n" +
    "local currentRequests = redis.call('ZCARD', key)\n" +
    "if currentRequests < limit then\n" +
    "    redis.call('ZADD', key, now, now)\n" +
    "    redis.call('EXPIRE', key, math.ceil(window / 1000))\n" +
    "    return 1\n" +
    "else\n" +
    "    return 0\n" +
    "end";
  private static final DefaultRedisScript<Long> redisScript = new DefaultRedisScript<>(slidingWindowLuaScript, Long.class);
  public boolean tryAcquire(String key, int maxRequests, long windowMillis) {
    long now = Instant.now().toEpochMilli();
    Long result = redisTemplate.execute(
      redisScript,
      Collections.singletonList(key),
      String.valueOf(now),
      String.valueOf(windowMillis),
      String.valueOf(maxRequests)
    );
    return result != null && result == 1L;
  }
}