package com.main_001.server.tag.dto;

import javax.validation.constraints.NotNull;

public class TagDto {
    public static class Post{
        private String tagName;
    }

    public static class Response{
        private int tagId;
        private boolean categoryExercise;
        private String tagName;
        private String emoji;
        private int count;
    }
}
