package com.main_001.server.tag.mapper;

import com.main_001.server.tag.dto.TagDto;
import com.main_001.server.tag.entity.Tag;
import org.mapstruct.Mapper;
import org.springframework.data.domain.Page;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TagMapper {
    Tag tagPostDtoToTag(TagDto.Post tagDto);
    TagDto.Response TagToTagResponseDto(Tag tag);
//    Page<TagDto.Response> TagsToTagResponseDtos(List<Tag> tag);
}
