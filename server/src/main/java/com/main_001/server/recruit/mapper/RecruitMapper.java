package com.main_001.server.recruit.mapper;

import com.main_001.server.member.entity.Member;
import com.main_001.server.recruit.dto.*;
import com.main_001.server.recruit.entity.*;
import com.main_001.server.tag.entity.Tag;
import org.mapstruct.Mapper;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface RecruitMapper {
    default Recruit recruitPostDtoToRecruit(RecruitDto.Post requestBody) {
        Recruit recruit = new Recruit();
        Member member = new Member();
        member.setMemberId(requestBody.getMemberId());
        List<RecruitTag> recruitTags = requestBody.getRecruitTagDtos().stream()
                .map(recruitTagDto -> {
                    RecruitTag recruitTag = new RecruitTag();
                    Tag tag = new Tag();
                    tag.setTagId((int) recruitTagDto.getTagId());
                    tag.setTagName(recruitTagDto.getTagName());
                    recruitTag.setRecruit(recruit);
                    recruitTag.setTag(tag);
                    return recruitTag;
                }).collect(Collectors.toList());
        recruit.setMember(member);
        recruit.setRecruitTags(recruitTags);
        recruit.setHeart(requestBody.getHeart());
        recruit.setTitle(requestBody.getTitle());
        recruit.setBody(requestBody.getBody());
        recruit.setRequire(requestBody.getRequire());
        recruit.setMinRequire(requestBody.getMinRequire());
        recruit.setSex(requestBody.getSex());
        recruit.setDate(requestBody.getDate());
        recruit.setLocation(requestBody.getLocation());
        recruit.setAgeGroupString(requestBody.getAges().toString());
        return recruit;
    }

    default RecruitDto.Response recruitToRecruitResponseDto(Recruit recruit) {
        List<Apply> applies = recruit.getApplies();
        List<RecruitComment> recruitComments = recruit.getRecruitComments();
        List<RecruitLike> recruitLikes = recruit.getRecruitLikes();
        List<RecruitTag> recruitTags = recruit.getRecruitTags();
        List<Review> reviews = recruit.getReviews();

        String newString = recruit.getAgeGroupString().replaceAll("[\\[\\]\\s]", "");
        StringTokenizer st = new StringTokenizer(newString, ",");
        List<String> ageGroup = new ArrayList<>();
        while (st.hasMoreTokens()) {
            ageGroup.add(st.nextToken());
        }

        return RecruitDto.Response.builder()
                .recruitId(recruit.getRecruitId())
                .title(recruit.getTitle())
                .body(recruit.getBody())
                .createdAt(recruit.getCreatedAt())
                .modifiedAt(recruit.getModifiedAt())
                .require(recruit.getRequire())
                .minRequire(recruit.getMinRequire())
                .recruitStatus(recruit.getRecruitStatus().getStepDescription())
                .star(recruit.getStar())
                .views(recruit.getViews())
                .heart(recruit.getHeart())
                .ageGroup(ageGroup)
                .memberId(recruit.getMember().getMemberId())
                .nickname(recruit.getMember().getNickname())
                .sex(recruit.getSex())
                .date(recruit.getDate())
                .location(recruit.getLocation())
                .applies(appliesToApplyResponseDtos(applies))
                .recruitComments(recruitCommentsToRecruitCommentResponseDtos(recruitComments))
                .recruitLikes(recruitLikesToRecruitLikeResponseDtos(recruitLikes))
                .Likes(recruitLikes.size())
                .recruitTags(recruitTagsToRecruitTagResponseDtos(recruitTags))
                .reviews(reviewsToReviewResponseDtos(reviews))
                .build();
    }

    default List<ResponseDto.Apply> appliesToApplyResponseDtos(List<Apply> applies) {
        return applies
                .stream()
                .map(apply -> ResponseDto.Apply
                        .builder()
                        .memberId(apply.getMember().getMemberId())
                        .nickname(apply.getMember().getNickname())
                        .heart(apply.getMember().getHeart())
                        .build())
                .collect(Collectors.toList());
    }

    default List<ResponseDto.RecruitComment> recruitCommentsToRecruitCommentResponseDtos(List<RecruitComment> recruitComments) {
        return recruitComments
                .stream()
                .map(recruitComment -> ResponseDto.RecruitComment
                        .builder()
                        .memberId(recruitComment.getMember().getMemberId())
                        .nickname(recruitComment.getMember().getNickname())
                        .heart(recruitComment.getMember().getHeart())
                        .body(recruitComment.getBody())
                        .createdAt(recruitComment.getCreatedAt())
                        .modifiedAt(recruitComment.getModifiedAt())
                        .build())
                .collect(Collectors.toList());
    }

    default List<ResponseDto.RecruitLike> recruitLikesToRecruitLikeResponseDtos(List<RecruitLike> recruitLikes) {
        return recruitLikes
                .stream()
                .map(recruitLike -> ResponseDto.RecruitLike
                        .builder()
                        .memberId(recruitLike.getMember().getMemberId())
                        .build())
                .collect(Collectors.toList());
    }

    default List<ResponseDto.RecruitTag> recruitTagsToRecruitTagResponseDtos(List<RecruitTag> recruitTags) {
        return recruitTags
                .stream()
                .map(recruitTag -> ResponseDto.RecruitTag
                        .builder()
                        .tagId(recruitTag.getTag().getTagId())
                        .tagName(recruitTag.getTag().getTagName())
                        .build())
                .collect(Collectors.toList());
    }

    default List<ResponseDto.Review> reviewsToReviewResponseDtos(List<Review> reviews) {
        return reviews
                .stream()
                .map(review -> ResponseDto.Review
                        .builder()
                        .memberId(review.getMember().getMemberId())
                        .nickname(review.getMember().getNickname())
                        .heart(review.getMember().getHeart())
                        .body(review.getBody())
                        .star(review.getStar())
                        .build())
                .collect(Collectors.toList());
    }

    default RecruitComment recruitCommentDtoToRecruitComment(RecruitCommentDto.Default requestBody) {
        Member member = new Member();
        member.setMemberId(requestBody.getMemberId());
        return RecruitComment.builder()
                .body(requestBody.getBody())
                .modifiedAt(LocalDateTime.now())
                .member(member)
                .build();
    }

    default RecruitLike recruitLikeDtoToRecruitLike(RecruitLikeDto requestBody) {
        Member member = new Member();
        member.setMemberId(requestBody.getMemberId());
        return RecruitLike.builder()
                .member(member)
                .build();
    }

    List<RecruitDto.Response> recruitsToRecruitResponseDtos(List<Recruit> recruits);

    default Recruit recruitPatchDtoToRecruit(RecruitDto.Patch requestBody) {
        if (requestBody == null) {
            return null;
        }
        Recruit recruit = new Recruit();
        Member member = new Member();
        member.setMemberId(requestBody.getMemberId());
        recruit.setMember(member);
        recruit.setTitle(requestBody.getTitle());
        recruit.setBody(requestBody.getBody());
        return recruit;
    }


    default Apply applyDtoToApply(ApplyDto requestBody) {
        Member member = new Member();
        member.setMemberId(requestBody.getMemberId());
        return Apply.builder()
                .member(member)
                .build();
    }

    default Review reviewDtoToReview(ReviewDto requestBody) {
        Member member = new Member();
        member.setMemberId(requestBody.getMemberId());
        return Review.builder()
                .body(requestBody.getBody())
                .star(requestBody.getStar())
                .worstMemberNickname(requestBody.getWorstMemberNickname())
                .member(member)
                .build();
    }

    default ResponseDto.RecruitComment recruitCommentToRecruitCommentResponseDto(RecruitComment recruitComment) {
        if (recruitComment == null) {
            return null;
        }
        return ResponseDto.RecruitComment.builder()
                .memberId(recruitComment.getMember().getMemberId())
                .nickname(recruitComment.getMember().getNickname())
                .heart(recruitComment.getMember().getHeart())
                .body(recruitComment.getBody())
                .createdAt(recruitComment.getCreatedAt())
                .modifiedAt(recruitComment.getModifiedAt())
                .build();
    }
}
