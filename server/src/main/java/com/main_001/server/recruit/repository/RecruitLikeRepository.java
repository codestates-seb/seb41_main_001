package com.main_001.server.recruit.repository;

import com.main_001.server.recruit.entity.RecruitLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecruitLikeRepository extends JpaRepository<RecruitLike,Long> {
    void deleteRecruitLikeByMember_MemberIdAndRecruit_RecruitId(Long member_memberId, Long recruit_recruitId);
}
