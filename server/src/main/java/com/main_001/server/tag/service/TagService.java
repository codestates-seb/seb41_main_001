package com.main_001.server.tag.service;

import com.main_001.server.tag.entity.Tag;
import com.main_001.server.tag.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TagService {
    private final TagRepository tagRepository;

    public Tag createTag(Tag tag){
        return tagRepository.save(tag);
    }
    public List<Tag> findTagsRecruit(){
        return tagRepository.finndAllbyRcruitTag();
    }

    public List<Tag> findTagsFreeboard(){
        return findTagsFreeboard();
    }
}
