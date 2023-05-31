package com.main_001.server.member.repository;

import com.main_001.server.member.entity.MemberTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberTagRepository extends JpaRepository<MemberTag, Long> {
    void deleteAllByMember_MemberId(Long memberId);
}
