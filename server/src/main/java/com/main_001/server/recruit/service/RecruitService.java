package com.main_001.server.recruit.service;

import com.main_001.server.exception.BusinessLogicException;
import com.main_001.server.exception.ExceptionCode;
import com.main_001.server.member.entity.Member;
import com.main_001.server.member.repository.MemberRepository;
import com.main_001.server.member.service.MemberService;
import com.main_001.server.recruit.dto.RecruitDto;
import com.main_001.server.recruit.entity.*;
import com.main_001.server.recruit.repository.ApplyRepository;
import com.main_001.server.recruit.repository.RecruitCommentRepository;
import com.main_001.server.recruit.repository.RecruitLikeRepository;
import com.main_001.server.recruit.repository.RecruitRepository;
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
    private final MemberService memberService;
    private final RecruitLikeRepository recruitLikeRepository;
    private final RecruitCommentRepository recruitCommentRepository;
    private final MemberRepository memberRepository;
    private final ApplyRepository applyRepository;

    public RecruitService(TagRepository tagRepository, RecruitRepository recruitRepository, MemberService memberService,
                          RecruitLikeRepository recruitLikeRepository,
                          RecruitCommentRepository recruitCommentRepository,
                          MemberRepository memberRepository,
                          ApplyRepository applyRepository) {
        this.tagRepository = tagRepository;
        this.recruitRepository = recruitRepository;
        this.memberService = memberService;
        this.recruitLikeRepository = recruitLikeRepository;
        this.recruitCommentRepository = recruitCommentRepository;
        this.memberRepository = memberRepository;
        this.applyRepository = applyRepository;
    }

    public Recruit createRecruit(Recruit recruit) {
        verifyRecruit(recruit);
        recruit.setCreatedAt(LocalDateTime.now());
        recruit.setModifiedAt(LocalDateTime.now());
        recruit.setMember(memberRepository.findById(recruit.getMember().getMemberId()).orElseThrow());
        for (RecruitTag recruitTag : recruit.getRecruitTags()) {
            Tag tag = tagRepository.findById(recruitTag.getTag().getTagId()).orElseThrow();
            tag.setRecruitCount(tag.getRecruitCount() + 1);
        }
        return saveRecruit(recruit);
    }

    public Recruit findRecruit(long recruitId) {
        Recruit findRecruit = findVerifiedRecruit(recruitId);
        int views = findRecruit.getViews();
        findRecruit.setViews(views + 1);
        return saveRecruit(findRecruit);
    }

    private Recruit findVerifiedRecruit(long recruitId) {
        Optional<Recruit> optionalRecruit = recruitRepository.findById(recruitId);
        return optionalRecruit.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.RECRUIT_NOT_FOUND));
    }

    private Recruit saveRecruit(Recruit recruit) {
        return recruitRepository.save(recruit);
    }

    private void verifyRecruit(Recruit recruit) {
        memberService.findMember(recruit.getMember().getMemberId());
    }

    public Recruit createComment(long recruitId, RecruitComment recruitComment) {
        Recruit findRecruit = findVerifiedRecruit(recruitId);
        recruitComment.setCreatedAt(LocalDateTime.now());
        recruitComment.setRecruit(findRecruit);
        return saveRecruit(findRecruit);
//        return recruitComment;
    }

    //Todo : 긁어오기, 필터링 한번 효율적으로 개선 ㄱㄱ
    //Todo : 최상위부터 걸러지므로, Keyword -> 별도의 처리 필요 x, tagName, Status 기준 필터링 필요
    // Todo : findAll -> 많은 데이터를 가져온다 -> 긁어올 때도 시간 up / memory?
    // findAll 메서드 -> DB 와 통신이 이루어질 것 -> 이 과정(tcp or udp), 쓰레드의 상태 등 자원 효율 / 낭비 / cpu ...
    // 찾아보고 개선 가능한 방향이 보인다면 적용
    public Page<Recruit> findRecruits(int page, int size, RecruitDto.Get recruitGetDto) {
        List<Recruit> recruits;
        //findAll // 키워드 태그 상태 분리 enum, state 패턴 ..
        // --- if else 줄이는 패턴 + 경우의 수를 별도의 메서드 등으로 분리
        // jpql 쿼리로 실행해보는 방법
        // 쿼리에서 condition 지정해서 가져오는 방법 - 필요에 따라 추가 filtering, index, random access, ...
        // 쿼리 베이스가 더 좋을 가능성이 매우 높음
        // 조회 전용으로 db를 분리하기도 함 cqrs -- 이 경우 noSQL 사용하기도 함
        // 성능 -- 10만건 이상의 데이터를 가정 - 성능을 확인해볼 것 (tps 측정) 바꾸고 확인 .. 반복
        if (recruitGetDto.getKeyword() != null) {
            recruits = recruitRepository.findAllByTitleContainingIgnoreCase(recruitGetDto.getKeyword(), Sort.by("modifiedAt").descending())
                    .stream()
                    .peek(recruit -> recruit.setDistance(recruitGetDto.getLat(), recruitGetDto.getLon()))
                    .filter(recruit -> recruit.getDistance() < recruitGetDto.getDistanceLimit())
                    .collect(Collectors.toList());

            if (recruitGetDto.getTagName() != null) {
                recruits = recruits.stream()
                        .filter(recruit -> recruit.getRecruitTags()
                                .stream()
                                .map(RecruitTag::getTag)
                                .map(Tag::getTagName)
                                .anyMatch(tagName -> tagName.equals(recruitGetDto.getTagName())))
                        .collect(Collectors.toList());
            }
            if(recruitGetDto.getStatus()!=null){
                if (recruitGetDto.getStatus().equals("모집중")) {
                    recruits = recruits.stream()
                            .filter(recruit -> recruit.getRecruitStatus().getStepDescription().equals(recruitGetDto.getStatus()))
                            .sorted(Comparator.comparing(Recruit::getDistance))
                            .collect(Collectors.toList());
                }else {
                    recruits = recruits.stream()
                            .filter(recruit -> recruit.getRecruitStatus().getStepDescription().equals(recruitGetDto.getStatus()))
                            .collect(Collectors.toList());
                }
            }
        } else if (recruitGetDto.getTagName() != null) {
            recruits = recruitRepository.findAll(Sort.by("modifiedAt").descending())
                    .stream()
                    .filter(recruit -> recruit.getRecruitTags()
                            .stream()
                            .map(RecruitTag::getTag)
                            .map(Tag::getTagName)
                            .anyMatch(tagName -> tagName.equals(recruitGetDto.getTagName())))
                    .peek(recruit -> recruit.setDistance(recruitGetDto.getLat(), recruitGetDto.getLon()))
                    .filter(recruit -> recruit.getDistance() < recruitGetDto.getDistanceLimit())
                    .collect(Collectors.toList());

            if(recruitGetDto.getStatus()!=null){
                if (recruitGetDto.getStatus().equals("모집중")) {
                    recruits = recruits.stream()
                            .filter(recruit -> recruit.getRecruitStatus().getStepDescription().equals(recruitGetDto.getStatus()))
                            .sorted(Comparator.comparing(Recruit::getDistance))
                            .collect(Collectors.toList());
                }else {
                    recruits = recruits.stream()
                            .filter(recruit -> recruit.getRecruitStatus().getStepDescription().equals(recruitGetDto.getStatus()))
                            .collect(Collectors.toList());
                }
            }
        } else if (recruitGetDto.getStatus() != null) {
            if (recruitGetDto.getStatus().equals("모집중")) {
                recruits = recruitRepository.findAllByRecruitStatus(Recruit.RecruitStatus.RECRUITING)
                        .stream()
                        .filter(recruit -> recruit.getRecruitStatus().getStepDescription().equals(recruitGetDto.getStatus()))
                        .peek(recruit -> recruit.setDistance(recruitGetDto.getLat(), recruitGetDto.getLon()))
                        .filter(recruit -> recruit.getDistance() < recruitGetDto.getDistanceLimit())
                        .sorted(Comparator.comparing(Recruit::getDistance))
                        .collect(Collectors.toList());
            } else {
                Recruit.RecruitStatus recruitStatus = Recruit.RecruitStatus.statusStringToStatus(recruitGetDto.getStatus());
                recruits = recruitRepository.findAllByRecruitStatus(recruitStatus, Sort.by("modifiedAt").descending())
                        .stream()
                        .filter(recruit -> recruit.getRecruitStatus().getStepDescription().equals(recruitGetDto.getStatus()))
                        .peek(recruit -> recruit.setDistance(recruitGetDto.getLat(), recruitGetDto.getLon()))
                        .filter(recruit -> recruit.getDistance() < recruitGetDto.getDistanceLimit())
                        .collect(Collectors.toList());
            }
        } else {
            recruits = recruitRepository.findAll()
                    .stream()
                    .peek(recruit -> recruit.setDistance(recruitGetDto.getLat(), recruitGetDto.getLon()))
                    .filter(recruit -> recruit.getDistance() < recruitGetDto.getDistanceLimit())
                    .collect(Collectors.toList());
        }

        PageRequest pageRequest = PageRequest.of(page, size);
        int start = (int) pageRequest.getOffset();
        int end = Math.min((start + pageRequest.getPageSize()), recruits.size());

        return new PageImpl<>(recruits.subList(start, end), pageRequest, recruits.size());
    }

    public Recruit updateRecruit(long recruitId, Recruit recruit) {
        Recruit findRecruit = findVerifiedRecruit(recruitId);
        if (!Objects.equals(findRecruit.getMember().getMemberId(), recruit.getMember().getMemberId()))
            throw new BusinessLogicException(ExceptionCode.RECRUIT_MODIFY_DENIED);
        if (recruit.getBody() != null) findRecruit.setBody(recruit.getBody());
        if (recruit.getTitle() != null) findRecruit.setTitle(recruit.getTitle());
        if (recruit.getRequire() != 0) findRecruit.setRequire(recruit.getRequire());
        if (recruit.getMinRequire() != 0) findRecruit.setMinRequire(recruit.getMinRequire());
        if (recruit.getHeartLimit() != 0) findRecruit.setHeartLimit(recruit.getHeartLimit());
        if (recruit.getSex() != null) findRecruit.setSex(recruit.getSex());
        if (recruit.getDate() != null) findRecruit.setDate(recruit.getDate());
        if (recruit.getLocation() != null) findRecruit.setLocation(recruit.getLocation());
        if (recruit.getLat() != 0) findRecruit.setLat(recruit.getLat());
        if (recruit.getLon() != 0) findRecruit.setLon(recruit.getLon());
        if (recruit.getAgeGroupString() != null) findRecruit.setAgeGroupString(recruit.getAgeGroupString());
        if ((recruit.getRecruitTags() != null)) findRecruit.setRecruitTags(recruit.getRecruitTags());
        return saveRecruit(findRecruit);
    }

    public void deleteRecruit(long recruitId, RecruitDto.Delete requestBody) {
        Recruit findRecruit = findVerifiedRecruit(recruitId);
        if (findRecruit.getMember().getMemberId() != requestBody.getMemberId())
            throw new BusinessLogicException(ExceptionCode.RECRUIT_MODIFY_DENIED);
        if (findRecruit.getApplies().size() != 0) throw new BusinessLogicException(ExceptionCode.RECRUIT_DELETE_DENIED);
        for (RecruitTag recruitTag : findRecruit.getRecruitTags()) {
            Tag tag = tagRepository.findById(recruitTag.getTag().getTagId()).orElseThrow();
            tag.setRecruitCount(tag.getRecruitCount() - 1);
        }
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
        if (!members.contains(findMember)) throw new BusinessLogicException(ExceptionCode.RECRUIT_MODIFY_DENIED);
        findRecruit.setRecruitStatus(Recruit.RecruitStatus.RECRUIT_END);
        return saveRecruit(findRecruit);
    }

    public Recruit updateLike(long recruitId, RecruitLike recruitLike) {
        Recruit findRecruit = findVerifiedRecruit(recruitId);
        long recruitLikeMemberId = recruitLike.getMember().getMemberId();
        long count = findRecruit.getRecruitLikes().stream()
                .filter(rc -> Objects.equals(rc.getMember().getMemberId(), recruitLikeMemberId))
                .count();
        if (count == 0) recruitLike.setRecruit(findRecruit);
        else {
            findRecruit.getRecruitLikes().removeIf(rl -> Objects.equals(rl.getMember().getMemberId(), recruitLike.getMember().getMemberId()));
            recruitLikeRepository.deleteRecruitLikeByMember_MemberIdAndRecruit_RecruitId(recruitLikeMemberId, recruitId);
        }
        return saveRecruit(findRecruit);
    }

    public Recruit updateComment(long recruitId, long commentId, RecruitComment recruitComment) {
        Recruit findRecruit = findVerifiedRecruit(recruitId);
        RecruitComment targetComment = recruitCommentRepository.findById(commentId).orElseThrow();
        if (!Objects.equals(targetComment.getMember().getMemberId(), recruitComment.getMember().getMemberId()))
            throw new BusinessLogicException(ExceptionCode.COMMENT_MODIFY_DENIED);
        targetComment.setModifiedAt(recruitComment.getModifiedAt());
        targetComment.setBody(recruitComment.getBody());

        return saveRecruit(findRecruit);

//        return targetComment;
    }

    public Recruit deleteComment(long recruitId, long commentId, long memberId) {
        Recruit findRecruit = findVerifiedRecruit(recruitId);
        RecruitComment targetComment = recruitCommentRepository.findById(commentId).orElseThrow();
        if (targetComment.getMember().getMemberId() != memberId)
            throw new BusinessLogicException(ExceptionCode.COMMENT_DELETE_DENIED);
        recruitCommentRepository.deleteById(commentId);

        return saveRecruit(findRecruit);
    }

    public Recruit bringUpRecruit(long recruitId) {
        Recruit findRecruit = findVerifiedRecruit(recruitId);
        findRecruit.setModifiedAt(LocalDateTime.now());
        return saveRecruit(findRecruit);
    }

    public Recruit updateAppliment(long recruitId, Apply apply) {
        Recruit findRecruit = findVerifiedRecruit(recruitId);
        if (findRecruit.getRecruitStatus() == Recruit.RecruitStatus.RECRUIT_COMPLETE)
            throw new BusinessLogicException(ExceptionCode.APPLY_MODIFY_DENIED);
        long applyMemberId = apply.getMember().getMemberId();
        long count = findRecruit.getApplies().stream()
                .filter(a -> Objects.equals(a.getMember().getMemberId(), applyMemberId))
                .count();
        if (count == 0) {
            apply.setRecruit(findRecruit);
            if (findRecruit.getApplies().size() >= findRecruit.getMinRequire())
                findRecruit.setRecruitStatus(Recruit.RecruitStatus.RECRUIT_MEET_MINIMUM);
            if (findRecruit.getApplies().size() == findRecruit.getRequire())
                findRecruit.setRecruitStatus(Recruit.RecruitStatus.RECRUIT_COMPLETE);
        } else {
            findRecruit.getApplies().removeIf(a -> Objects.equals(a.getMember().getMemberId(), apply.getMember().getMemberId()));
            applyRepository.deleteApplyByMember_MemberIdAndRecruit_RecruitId(applyMemberId, recruitId);
        }
        return saveRecruit(findRecruit);
    }

    public Recruit createReview(long recruitId, Review review) {
        Recruit findRecruit = findVerifiedRecruit(recruitId);
        Member findMember = memberService.findMember(review.getMember().getMemberId());
        List<Member> members = new ArrayList<>();
        members.add(findRecruit.getMember());
        members.addAll(findRecruit.getApplies().stream()
                .map(Apply::getMember)
                .collect(Collectors.toList()));
        if (!members.contains(findMember)) throw new BusinessLogicException(ExceptionCode.NOT_MEMBER);
        long count = findRecruit.getReviews().stream()
                .filter(r -> Objects.equals(r.getMember().getMemberId(), review.getMember().getMemberId()))
                .count();
        if (count == 0) review.setRecruit(findRecruit);
        else throw new BusinessLogicException(ExceptionCode.ONLY_ONE_REVIEW);

        findRecruit.setStar(findRecruit.getReviews()
                .stream()
                .mapToDouble(review1 -> review1.getStar())
                .average().orElse(0));

        return saveRecruit(findRecruit);
//        return findRecruit.getReviews();
    }
}
