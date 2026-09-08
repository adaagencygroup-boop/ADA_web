package com.ada.app.security;
import com.ada.app.common.security.RedisRateLimiter;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.script.DefaultRedisScript;
public class RateLimiterSecurityTest {
  private StringRedisTemplate redisTemplate;
  private RedisRateLimiter redisRateLimiter;
  @BeforeEach
  public void setUp() {
    redisTemplate = Mockito.mock(StringRedisTemplate.class);
    redisRateLimiter = new RedisRateLimiter(redisTemplate);
  }
  @Test
  public void testRateLimiterAllowsWithinLimit() {
    Mockito.when(redisTemplate.execute(
      ArgumentMatchers.<DefaultRedisScript<Long>>any(),
      ArgumentMatchers.anyList(),
      ArgumentMatchers.any(),
      ArgumentMatchers.any(),
      ArgumentMatchers.any()
    )).thenReturn(1L);
    boolean allowed = redisRateLimiter.tryAcquire("RateLimit:Login:127.0.0.1", 10, 60000);
    Assertions.assertTrue(allowed);
  }
  @Test
  public void testRateLimiterBlocksWhenLimitExceeded() {
    Mockito.when(redisTemplate.execute(
      ArgumentMatchers.<DefaultRedisScript<Long>>any(),
      ArgumentMatchers.anyList(),
      ArgumentMatchers.any(),
      ArgumentMatchers.any(),
      ArgumentMatchers.any()
    )).thenReturn(0L);
    boolean allowed = redisRateLimiter.tryAcquire("RateLimit:Login:127.0.0.1", 10, 60000);
    Assertions.assertFalse(allowed);
  }
}