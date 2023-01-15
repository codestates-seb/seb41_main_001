package com.main_001.server.recruit.repository;

import com.main_001.server.recruit.entity.Apply;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplyRepository extends JpaRepository<Apply, Long> {
    void deleteApplyByMember_MemberIdAndRecruit_RecruitId(Long member_memberId, Long recruit_recruitId);
}
