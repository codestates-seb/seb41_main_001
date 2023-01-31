package com.main_001.server.member.repository;

import com.main_001.server.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    boolean existsByEmail(String email);

    boolean existsByNickname(String nickname);

    boolean existsByPhone(String phone);

    Optional<Member> findByEmail(String email);

    Optional<Member> findByNickname(String worstMemberNickname);
}
