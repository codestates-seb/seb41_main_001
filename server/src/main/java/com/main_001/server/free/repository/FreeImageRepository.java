package com.main_001.server.free.repository;

import com.main_001.server.free.entity.FreeImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface FreeImageRepository extends JpaRepository<FreeImage, Long> {
    void deleteByFreeImageId(Long freeImageId);
    void deleteByStoredFileName(@Param("storedFileName") String storedFileName);
}
