package com.main_001.server.tag.service;

import com.main_001.server.exception.BusinessLogicException;
import com.main_001.server.exception.ExceptionCode;
import com.main_001.server.tag.entity.Tag;
import com.main_001.server.tag.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TagService {
    private final TagRepository tagRepository;

    public Tag createTag(Tag tag){
        existCheck(tag);
        return tagRepository.save(tag);
    }

    private void existCheck(Tag tag) {
        Optional<Tag> findTag = tagRepository.findByTagName(tag.getTagName());
        if(findTag.isPresent()) throw new BusinessLogicException(ExceptionCode.TAG_ALREADY_EXIST);
    }

    public List<Tag> findRecruitTags(){
        return tagRepository.findAllByCategoryExercise(true);
    }

    public List<Tag> findFreeTags(){
        return tagRepository.findAll();
    }
}
