package com.main_001.server.dto;

import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
public class MultiResponseDto<T>{
    private List<T> data;
    private PageInfo pageInfo;

    public MultiResponseDto(List<T> data, Page page) {
        this.data = data;
        this.pageInfo = new PageInfo(page.getNumber()+1,
                page.getSize(),page.getTotalElements(),page.getTotalPages());
    }

    public MultiResponseDto(List<T> data) {
        this.data = data;
    }

    /*
        pagination으로 나가는건 data: [tag1, tag2, tag3]
    */
}