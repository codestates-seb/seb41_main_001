package com.main_001.server.tag.mapper;

import com.main_001.server.tag.dto.TagDto;
import com.main_001.server.tag.entity.Tag;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TagMapper {
    Tag tagPostDtoToTag(TagDto.Post tagDto);
    TagDto.Response tagToTagResponseDto(Tag tag);
    List<TagDto.Response> tagsToTagResponseDtos(List<Tag> tag);
}
