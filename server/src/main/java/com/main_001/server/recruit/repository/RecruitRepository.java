package com.main_001.server.recruit.repository;

import com.main_001.server.recruit.entity.Recruit;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecruitRepository extends JpaRepository<Recruit, Long> {
    List<Recruit> findAllByTitleContaining(String keyword, Sort sort);
}
