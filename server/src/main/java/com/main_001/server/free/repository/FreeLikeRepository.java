package com.main_001.server.free.repository;

import com.main_001.server.free.entity.FreeLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FreeLikeRepository extends JpaRepository<FreeLike, Long> {
    void deleteFreeLikeByMember_MemberIdAndFree_FreeId(Long member_memberId, Long free_freeId);
}
