package com.main_001.server.recruit.service;

import com.main_001.server.exception.BusinessLogicException;
import com.main_001.server.exception.ExceptionCode;
import com.main_001.server.member.entity.Member;
import com.main_001.server.member.repository.MemberRepository;
import com.main_001.server.member.service.MemberService;
import com.main_001.server.recruit.dto.RecruitDto;
import com.main_001.server.recruit.entity.*;
import com.main_001.server.recruit.repository.RecruitCommentRepository;
import com.main_001.server.recruit.repository.RecruitLikeRepository;
import com.main_001.server.recruit.repository.RecruitRepository;
import com.main_001.server.recruit.repository.RecruitTagRepository;
import com.main_001.server.tag.entity.Tag;
import com.main_001.server.tag.repository.TagRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class RecruitService {
    private final TagRepository tagRepository;
    private final RecruitRepository recruitRepository;

    private final RecruitTagRepository recruitTagRepository;

    private final MemberService memberService;
    private final RecruitLikeRepository recruitLikeRepository;
    private final RecruitCommentRepository recruitCommentRepository;
    private final MemberRepository memberRepository;

    public RecruitService(TagRepository tagRepository, RecruitRepository recruitRepository, RecruitTagRepository recruitTagRepository, MemberService memberService,
                          RecruitLikeRepository recruitLikeRepository,
                          RecruitCommentRepository recruitCommentRepository,
                          MemberRepository memberRepository) {
        this.tagRepository = tagRepository;
        this.recruitRepository = recruitRepository;
        this.recruitTagRepository = recruitTagRepository;
        this.memberService = memberService;
        this.recruitLikeRepository = recruitLikeRepository;
        this.recruitCommentRepository = recruitCommentRepository;
        this.memberRepository = memberRepository;
    }

    public Recruit createRecruit(Recruit recruit) {
        verifyRecruit(recruit);
        recruit.setCreatedAt(LocalDateTime.now());
        recruit.setModifiedAt(LocalDateTime.now());
        recruit.setMember(memberRepository.findById(recruit.getMember().getMemberId()).orElseThrow());
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

    public RecruitComment createComment(long recruitId, RecruitComment recruitComment) {
        Recruit findRecruit = findVerifiedRecruit(recruitId);
        recruitComment.setCreatedAt(LocalDateTime.now());
        recruitComment.setRecruit(findRecruit);
        saveRecruit(findRecruit);
        return recruitComment;
    }

    public Page<Recruit> findRecruits(int page, int size, String tag, String status) {
        List<Recruit> recruits;
        if(tag.equals("all")) recruits = recruitRepository.findAll(Sort.by("modifiedAt").descending());
        else {
            List<RecruitTag> recruitTags = recruitTagRepository.findAll();
            recruits = recruitTags.stream()
                    .filter(recruitTag -> recruitTag.getTag().getTagName().equals(tag))
                    .map(RecruitTag::getRecruit)
                    .collect(Collectors.toList());

            Comparator<Recruit> cp = new Comparator<Recruit>() {
                @Override
                public int compare(Recruit o1, Recruit o2) {
                    LocalDateTime a = o1.getModifiedAt();
                    LocalDateTime b = o2.getModifiedAt();

                    if(a.isAfter(b)) return -1;
                    else return 1;
                }
            };
            recruits.sort(cp);
        }
        if(!status.equals("all")){
            recruits = recruits.stream()
                    .filter(recruit -> recruit.getRecruitStatus().getStepDescription().equals(status))
                    .collect(Collectors.toList());
        }
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("modifiedAt").descending());
        int start = (int) pageRequest.getOffset();
        int end = Math.min((start + pageRequest.getPageSize()), recruits.size());

        return new PageImpl<>(recruits.subList(start, end), pageRequest, recruits.size());
    }
    public Recruit updateRecruit(long recruitId, Recruit recruit) {
        Recruit findRecruit = findVerifiedRecruit(recruitId);
        if(!Objects.equals(findRecruit.getMember().getMemberId(), recruit.getMember().getMemberId())) throw new BusinessLogicException(ExceptionCode.RECRUIT_MODIFY_DENIED);
        findRecruit.setBody(recruit.getBody());
        findRecruit.setTitle(recruit.getTitle());
        return saveRecruit(findRecruit);
    }

    public void deleteRecruit(long recruitId, RecruitDto.Delete requestBody) {
        Recruit findRecruit = findVerifiedRecruit(recruitId);
        if(findRecruit.getMember().getMemberId()!=requestBody.getMemberId()) throw new BusinessLogicException(ExceptionCode.RECRUIT_MODIFY_DENIED);
        if(findRecruit.getApplies().size()!=0) throw new BusinessLogicException(ExceptionCode.RECRUIT_DELETE_DENIED);
        recruitRepository.deleteById(recruitId);
    }

    public Recruit updateStatus(long recruitId, RecruitDto.Patch requestBody) {
        Recruit findRecruit = findVerifiedRecruit(recruitId);
        Member findMember = memberService.findMember(requestBody.getMemberId());
        List<Member> members = new ArrayList<>();
        members.add(findRecruit.getMember());
        members.addAll(findRecruit.getApplies().stream()
                .map(Apply::getMember)
                .collect(Collectors.toList()));
        if(!members.contains(findMember)) throw new BusinessLogicException(ExceptionCode.RECRUIT_MODIFY_DENIED);
        findRecruit.setRecruitStatus(Recruit.RecruitStatus.RECRUIT_END);
        return saveRecruit(findRecruit);
    }

    public Recruit updateLike(long recruitId, RecruitLike recruitLike) {
        Recruit findRecruit = findVerifiedRecruit(recruitId);
        long recruitLikeMemberId = recruitLike.getMember().getMemberId();
        long count = findRecruit.getRecruitLikes().stream()
                        .filter(rc -> Objects.equals(rc.getMember().getMemberId(), recruitLikeMemberId))
                        .count();
        if(count==0) recruitLike.setRecruit(findRecruit);
        else {
            findRecruit.getRecruitLikes().removeIf(rl -> Objects.equals(rl.getMember().getMemberId(), recruitLike.getMember().getMemberId()));
            recruitLikeRepository.deleteRecruitLikeByMember_MemberIdAndRecruit_RecruitId(recruitLikeMemberId,recruitId);
        }
        return saveRecruit(findRecruit);
    }

    public RecruitComment updateComment(long recruitId, long commentId, RecruitComment recruitComment) {
        Recruit findRecruit = findVerifiedRecruit(recruitId);
        RecruitComment targetComment = recruitCommentRepository.findById(commentId).orElseThrow();
        if(!Objects.equals(targetComment.getMember().getMemberId(), recruitComment.getMember().getMemberId())) throw new BusinessLogicException(ExceptionCode.COMMENT_MODIFY_DENIED);
        targetComment.setModifiedAt(recruitComment.getModifiedAt());
        targetComment.setBody(recruitComment.getBody());
        saveRecruit(findRecruit);

        return targetComment;
    }

    public Recruit deleteComment(long recruitId, long commentId, long memberId) {
        Recruit findRecruit = findVerifiedRecruit(recruitId);
        RecruitComment targetComment = recruitCommentRepository.findById(commentId).orElseThrow();
        if(targetComment.getMember().getMemberId()!=memberId) throw new BusinessLogicException(ExceptionCode.COMMENT_DELETE_DENIED);
        recruitCommentRepository.deleteById(commentId);

        return saveRecruit(findRecruit);
    }

    public Recruit bringUpRecruit(long recruitId) {
        Recruit findRecruit = findVerifiedRecruit(recruitId);
        findRecruit.setModifiedAt(LocalDateTime.now());
        return saveRecruit(findRecruit);
    }

    public Recruit createAppliment(long recruitId, Apply apply) {
        Recruit findRecruit = findVerifiedRecruit(recruitId);
        long applyMemberId = apply.getMember().getMemberId();
        long count = findRecruit.getApplies().stream()
                .filter(a -> Objects.equals(a.getMember().getMemberId(), applyMemberId))
                .count();
        if(count==0) apply.setRecruit(findRecruit);
        else {
            findRecruit.getApplies().removeIf(a -> Objects.equals(a.getMember().getMemberId(), apply.getMember().getMemberId()));
            recruitLikeRepository.deleteRecruitLikeByMember_MemberIdAndRecruit_RecruitId(applyMemberId,recruitId);
        }
        return saveRecruit(findRecruit);
    }

    public List<Review> createReview(long recruitId, Review review) {
        Recruit findRecruit = findVerifiedRecruit(recruitId);
        Member findMember = memberService.findMember(review.getMember().getMemberId());
        List<Member> members = new ArrayList<>();
        members.add(findRecruit.getMember());
        members.addAll(findRecruit.getApplies().stream()
                .map(Apply::getMember)
                .collect(Collectors.toList()));
        if(!members.contains(findMember)) throw new BusinessLogicException(ExceptionCode.NOT_MEMBER);
        long count = findRecruit.getReviews().stream()
                .filter(r -> Objects.equals(r.getMember().getMemberId(), review.getMember().getMemberId()))
                .count();
        if(count==0) review.setRecruit(findRecruit);
        else throw new BusinessLogicException(ExceptionCode.ONLY_ONE_REVIEW);

        saveRecruit(findRecruit);
        return findRecruit.getReviews();
    }
}
