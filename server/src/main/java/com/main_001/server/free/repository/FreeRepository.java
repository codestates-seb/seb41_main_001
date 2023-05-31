package com.main_001.server.free.repository;

import com.main_001.server.free.entity.Free;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FreeRepository extends JpaRepository<Free, Long> {
//    Page<Free> findAllByCategoryOrTaGOrKeywordOrsort();
    Optional<Free> findByFreeId(long freeId);
    List<Free> findAllByFreeTitleContainingIgnoreCase(String keyword);
}
