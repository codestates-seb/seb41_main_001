package com.main_001.server.free.repository;

import com.main_001.server.free.entity.FreeComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FreeCommentRepository extends JpaRepository<FreeComment, Long> {
}
