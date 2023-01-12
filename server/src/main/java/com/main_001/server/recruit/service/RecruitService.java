package com.main_001.server.recruit.service;

import com.main_001.server.exception.BusinessLogicException;
import com.main_001.server.exception.ExceptionCode;
import com.main_001.server.recruit.entity.Recruit;
import com.main_001.server.recruit.entity.RecruitTag;
import com.main_001.server.recruit.repository.RecruitRepository;
import com.main_001.server.tag.entity.Tag;
import com.main_001.server.tag.repository.TagRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Transactional
public class RecruitService {
    private final TagRepository tagRepository;
    private final RecruitRepository recruitRepository;

    public RecruitService(TagRepository tagRepository, RecruitRepository recruitRepository) {
        this.tagRepository = tagRepository;
        this.recruitRepository = recruitRepository;
    }

    public Recruit createRecruit(Recruit recruit) {
        verifyRecruit(recruit);
        recruit.setCreatedAt(LocalDateTime.now());
        recruit.setModifiedAt(LocalDateTime.now());
        for (RecruitTag recruitTag : recruit.getRecruitTags()) {
            Tag tag = tagRepository.findById(recruitTag.getTag().getTagId()).orElseThrow();
//            if(tag.getCount()==null) tag.setCount(0);
            tag.setCount(tag.getCount()+1);
        }
        return saveRecruit(recruit);
    }

    public Recruit findRecruit(long recruitId) {
        Recruit findRecruit = findVerifiedRecruit(recruitId);
        int views = findRecruit.getViews();
        findRecruit.setViews(views+1);
        return saveRecruit(findRecruit);
    }

    private Recruit findVerifiedRecruit(long recruitId) {
        Optional<Recruit> optionalRecruit = recruitRepository.findById(recruitId);
        return optionalRecruit.orElseThrow(()->
                new BusinessLogicException(ExceptionCode.RECRUIT_NOT_FOUND));
    }

    private Recruit saveRecruit(Recruit recruit){
        return recruitRepository.save(recruit);
    }

    private void verifyRecruit(Recruit recruit) {
        //Todo : MemberService 와 연계하여 존재하는 멤버가 보낸 요청인지 확인

        //Todo : 멤버가 모집글에 등록한 태그가 유효한지 확인
    }

}
