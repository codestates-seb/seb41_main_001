package com.main_001.server.member.mapper;

import com.main_001.server.member.dto.MemberDto;
import com.main_001.server.member.entity.Member;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    Member memberPostToMember(MemberDto.MemberPostDto requestBody);

    Member memberPatchToMember(MemberDto.MemberPatchDto requestBody);

    MemberDto.MyResponse memberToMemberMyResponse(Member member);

    MemberDto.OtherResponse memberToMemberOtherResponse(Member member);
}
