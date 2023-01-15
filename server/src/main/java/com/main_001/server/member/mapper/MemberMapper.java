package com.main_001.server.member.mapper;

import com.main_001.server.free.dto.FreeDto;
import com.main_001.server.free.entity.Free;
import com.main_001.server.free.entity.FreeComment;
import com.main_001.server.free.entity.FreeLike;
import com.main_001.server.member.dto.MemberDto;
import com.main_001.server.member.dto.MemberTagResponseDto;
import com.main_001.server.member.entity.Member;
import com.main_001.server.member.entity.MemberTag;
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
public interface MemberMapper {
    default Member memberPostToMember(MemberDto.MemberPostDto memberPost) {
        Member member = new Member();
        member.setEmail(memberPost.getEmail());
        member.setPassword(memberPost.getPassword());
        member.setName(memberPost.getName());
        member.setBirth(memberPost.getBirth());
        member.setNickname(memberPost.getNickname());
        member.setPhone(memberPost.getPhone());
        member.setSex(memberPost.getSex());
        member.setHeart(50); // controller에서 mapper로 값을 빼주었음
        member.setLocationGroupString(memberPost.getLocations().toString());
        List<MemberTag> memberTags = memberPost.getMemberTags().stream()
                .map(memberTagDto -> {
                    MemberTag memberTag = new MemberTag();
                    Tag tag = new Tag();
                    tag.setTagId((int) memberTagDto.getTagId());
                    tag.setTagName(memberTagDto.getTagName());
                    memberTag.addMember(member);
                    memberTag.addTag(tag);
                    return memberTag;
                }).collect(Collectors.toList());
        member.setMemberTags(memberTags);

        return member;
    }

    default Member memberPatchToMember(MemberDto.MemberPatchDto memberPatch) {
        if (memberPatch == null) {
            return null;
        }
        Member member = new Member();
        member.setMemberId(memberPatch.getMemberId());
        member.setNickname(memberPatch.getNickname());
        member.setPassword(memberPatch.getNewPassword());
        member.setPhone(memberPatch.getPhone());
        member.setLocationGroupString(memberPatch.getLocations().toString());
        List<MemberTag> memberTags = memberPatch.getMemberTags().stream()
                .map(memberTagDto -> {
                    MemberTag memberTag = new MemberTag();
                    Tag tag = new Tag();
                    tag.setTagId((int) memberTagDto.getTagId());
                    tag.setTagName(memberTagDto.getTagName());
                    memberTag.addMember(member);
                    memberTag.addTag(tag);
                    return memberTag;
                }).collect(Collectors.toList());
        member.setMemberTags(memberTags);

        return member;
    }

    default MemberDto.MyResponse memberToMemberMyResponse(Member member) {
        // Tag
        List<MemberTag> memberTags = member.getMemberTags();

        // member가 Recruit에서 작성한 데이터들
        List<Apply> applies = member.getApplies();
        List<Recruit> recruits = member.getRecruits();
        List<RecruitComment> recruitComments = member.getRecruitComments();
        List<RecruitLike> recruitLikes = member.getRecruitLikes();
        List<Review> reviews = member.getReviews();

        // member가 FreeBoard에서 작성한 데이터들
//        List<Free> frees = member.getFrees();
//        List<FreeLike> freeLikes = member.getFreeLikes();
//        List<FreeComment> freeComments = member.getFreeComments();

        // location 가공
        String locationStr = member.getLocationGroupString().replaceAll("[\\[\\]\\s]", "");
        StringTokenizer st = new StringTokenizer(locationStr, ",");
        List<String> locationGroup = new ArrayList<>();
        while (st.hasMoreTokens()) {
            locationGroup.add(st.nextToken());
        }

        return MemberDto.MyResponse.builder()
                .memberId(member.getMemberId())
                .name(member.getName())
                .birth(member.getBirth())
                .nickname(member.getNickname())
                .email(member.getEmail())
                .phone(member.getPhone())
                .sex(member.getSex())
                .createdAt(member.getCreatedAt())
                .heart(member.getHeart())
                .locations(locationGroup)

                .memberTags(memberTagsToMemberTagResponseDtos(memberTags))

                .applies(appliesToApplyResponseDtos(applies))
                .recruits(recruitsToRecruitResponseDtos(recruits))
                .recruitComments(recruitCommentsToRecruitCommentResponseDtos(recruitComments))
                .recruitLikes(recruitLikesToRecruitLikeResponseDtos(recruitLikes))
                .reviews(reviewsToReviewResponseDtos(reviews))
                .build();
    }

    // member가 가지고 있는 tag 정보
    default List<MemberTagResponseDto> memberTagsToMemberTagResponseDtos(List<MemberTag> memberTags) {
        return memberTags
                .stream()
                .map(memberTag -> MemberTagResponseDto
                        .builder()
                        .tagId(memberTag.getTag().getTagId())
                        .tagName(memberTag.getTag().getTagName())
                        .build())
                .collect(Collectors.toList());
    }

    // member의 지원 정보
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

    // member가 작성한 모집글
    List<RecruitDto.Response> recruitsToRecruitResponseDtos(List<Recruit> recruits);

    // member가 작성한 모집글에 대한 댓글
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

    // member가 누른 좋아요
    default List<ResponseDto.RecruitLike> recruitLikesToRecruitLikeResponseDtos(List<RecruitLike> recruitLikes) {
        return recruitLikes
                .stream()
                .map(recruitLike -> ResponseDto.RecruitLike
                        .builder()
                        .memberId(recruitLike.getMember().getMemberId())
                        .build())
                .collect(Collectors.toList());
    }

    // member가 작성한 review
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

    // free 작성되면 입력

    default MemberDto.OtherResponse memberToMemberOtherResponse(Member member) {
        // Tag
        List<MemberTag> memberTags = member.getMemberTags();

        return MemberDto.OtherResponse.builder()
                .memberId(member.getMemberId())
                .nickname(member.getNickname())
                .sex(member.getSex())
                .heart(member.getHeart())
                .memberTags(memberTagsToMemberTagResponseDtos(memberTags))
                .build();
    }
}
