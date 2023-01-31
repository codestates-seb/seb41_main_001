package com.main_001.server.tag.repository;

import com.main_001.server.tag.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TagRepository extends JpaRepository<Tag, Long> {
    Optional<Tag> findByTagName(String tagName);
    List<Tag> findAllByCategoryExercise(boolean category);

}
