package com.main_001.server.tag.repository;

import com.main_001.server.tag.entity.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TagRepository extends JpaRepository<Tag, Long> {
    Optional<Tag> findByTagName(String tagName);
    Page<Tag> findAllByCategoryExercise(boolean category, Pageable pageable);

}
