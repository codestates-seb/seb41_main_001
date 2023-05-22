package com.main_001.server.recruit.repository;

import com.main_001.server.recruit.entity.RecruitImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface RecruitImageRepository extends JpaRepository<RecruitImage, Long> {
    void deleteByStoredFileName(@Param("storedFileName") String storedFileName);
}
