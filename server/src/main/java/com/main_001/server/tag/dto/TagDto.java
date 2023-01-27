package com.main_001.server.tag.dto;

import lombok.Builder;
import lombok.Getter;

public class TagDto {
    @Getter
    public static class Post{
        private String tagName;
    }

    @Getter
    @Builder
    public static class Response{
        private long tagId;
        private boolean categoryExercise;
        private String tagName;
        private String emoji;
        private int recruitCount;
        private int freeCount;
    }
}
