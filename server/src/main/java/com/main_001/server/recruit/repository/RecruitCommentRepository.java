package com.main_001.server.recruit.repository;

import com.main_001.server.recruit.entity.RecruitComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecruitCommentRepository extends JpaRepository<RecruitComment, Long> {
}
