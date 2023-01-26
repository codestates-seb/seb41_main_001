package com.main_001.server.tag.repository;

import com.main_001.server.free.entity.Free;
import com.main_001.server.recruit.entity.Recruit;
import com.main_001.server.tag.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TagRepository extends JpaRepository<Tag, Long> {
//    List<Tag> findAllbyFreeTag();
//    List<Tag> finndAllbyRcruitTag();
}
