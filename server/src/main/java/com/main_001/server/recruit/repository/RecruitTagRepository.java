package com.main_001.server.recruit.repository;

import com.main_001.server.recruit.entity.RecruitTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecruitTagRepository extends JpaRepository<RecruitTag, Long> {
}
