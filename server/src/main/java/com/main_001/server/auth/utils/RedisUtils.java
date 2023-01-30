package com.main_001.server.auth.utils;

import com.main_001.server.auth.exception.AuthException;
import com.main_001.server.exception.ExceptionCode;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.concurrent.TimeUnit;
@Component
public class RedisUtils {
    private final RedisTemplate<String, Object> redisTemplate;
    private final RedisTemplate<String, Object> redisBlackListTemplate;

    public RedisUtils(RedisTemplate<String, Object> redisTemplate,
                      RedisTemplate<String, Object> redisBlackListTemplate) {
        this.redisTemplate = redisTemplate;
        this.redisBlackListTemplate = redisBlackListTemplate;
    }

    public void setData(String key, Object o, int minutes) {
        redisTemplate.setValueSerializer(new Jackson2JsonRedisSerializer<>(o.getClass()));
        redisTemplate.opsForValue().set(key, o, minutes, TimeUnit.MINUTES);
    }

    public Object getData(String key) {
        return redisTemplate.opsForValue().get(key);
    }

    public void deleteData(String key) {
        redisTemplate.delete(key);
    }

    public void setBlackList(String key, Object o, Long setTime) {
        redisTemplate.setValueSerializer(new Jackson2JsonRedisSerializer<>(o.getClass()));
        redisBlackListTemplate.opsForValue().set(key, o, setTime, TimeUnit.MILLISECONDS);
    }

    public String isBlackList(String key) {
        return (String) redisBlackListTemplate.opsForValue().get(key);
    }

    public Long getId(String refreshToken) {
        if (!StringUtils.hasText(refreshToken))
            throw new AuthException(ExceptionCode.INVALID_REFRESH_TOKEN);

        Long memberId = (Long) redisTemplate.opsForValue().get(refreshToken);

        if (memberId == null)
            throw new AuthException(ExceptionCode.INVALID_REFRESH_TOKEN);

        return memberId;
    }
}
