package com.main_001.server.free.repositpry;

import com.main_001.server.free.entity.Free;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FreeRepository extends JpaRepository<Free, Long> {
//    Page<Free> findAllByCategoryOrTaGOrKeywordOrsort();
    Free findByFreeId(long freeId);
    Optional<Free> findById(long freeId);
}
