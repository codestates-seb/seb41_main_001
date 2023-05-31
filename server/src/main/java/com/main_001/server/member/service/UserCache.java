package com.main_001.server.member.service;

import com.main_001.server.member.entity.Member;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

@Service
public class UserCache {
    @PersistenceContext
    private EntityManager entityManager;

    private final ConcurrentMap<String, Member> store = new ConcurrentHashMap<>(256);

//    public Member getByUserName(String userName) {
//        return store.computeIfAbsent(userName, k ->
//                entityManager.createQuery("from Member where login=:login", Member.class)
//                        .setParameter("login", k)
//                        .getSingleResult());
//    }

    public void evictUser(String userName) {
        store.remove(userName);
    }
}
