package com.main_001.server.free.repositpry;

import com.main_001.server.free.entity.FreeComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FreeCommentReposittory extends JpaRepository<FreeComment, Long> {
    FreeComment findFreeCommentByCommentId(long commentId);
}
