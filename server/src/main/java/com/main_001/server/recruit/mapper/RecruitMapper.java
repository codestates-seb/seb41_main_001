package com.main_001.server.recruit.mapper;

import com.main_001.server.member.entity.Member;
import com.main_001.server.recruit.dto.RecruitDto;
import com.main_001.server.recruit.dto.ResponseDto;
import com.main_001.server.recruit.entity.*;
import com.main_001.server.tag.entity.Tag;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface RecruitMapper {
    default Recruit recruitPostDtoToRecruit(RecruitDto.Post requestBody){
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
        recruit.setTitle( requestBody.getTitle() );
        recruit.setBody( requestBody.getBody() );
        recruit.setRequire( requestBody.getRequire() );
        recruit.setMinRequire( requestBody.getMinRequire() );
        recruit.setAgeGroupString(requestBody.getAges().toString());
        return recruit;
    }

    default RecruitDto.Response recruitToRecruitResponseDto(Recruit recruit){
        List<Apply> applies = recruit.getApplies();
        List<RecruitComment> recruitComments = recruit.getRecruitComments();
        List<RecruitLike> recruitLikes = recruit.getRecruitLikes();
        List<RecruitTag> recruitTags = recruit.getRecruitTags();
        List<Review> reviews = recruit.getReviews();

        String newString = recruit.getAgeGroupString().replaceAll("[\\[\\]\\s]", "");
        StringTokenizer st = new StringTokenizer(newString,",");
        List<String> ageGroup = new ArrayList<>();
        while(st.hasMoreTokens()){
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
                .recruitStatus(recruit.getRecruitStatus())
                .star(recruit.getStar())
                .views(recruit.getViews())
                .heart(recruit.getHeart())
                .ageGroup(ageGroup)
                .memberId(recruit.getMember().getMemberId())
                .nickname(recruit.getMember().getNickname())
                .applies(appliesToApplyResponseDtos(applies))
                .recruitComments(recruitCommentsToRecruitCommentResponseDtos(recruitComments))
                .recruitLikes(recruitLikesToRecruitLikeResponseDtos(recruitLikes))
                .recruitTags(recruitTagsToRecruitTagResponseDtos(recruitTags))
                .reviews(reviewsToReviewResponseDtos(reviews))
                .build();
    }

    default List<ResponseDto.Apply> appliesToApplyResponseDtos(List<Apply> applies){
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
    List<ResponseDto.RecruitComment> recruitCommentsToRecruitCommentResponseDtos(List<RecruitComment> recruitComments);

    List<ResponseDto.RecruitLike> recruitLikesToRecruitLikeResponseDtos(List<RecruitLike> recruitLikes);

    default List<ResponseDto.RecruitTag> recruitTagsToRecruitTagResponseDtos(List<RecruitTag> recruitTags){
        return recruitTags
                .stream()
                .map(recruitTag -> ResponseDto.RecruitTag
                        .builder()
                        .tagId(recruitTag.getTag().getTagId())
                        .tagName(recruitTag.getTag().getTagName())
                        .build())
                .collect(Collectors.toList());
    }

    List<ResponseDto.Review> reviewsToReviewResponseDtos(List<Review> reviews);
}
