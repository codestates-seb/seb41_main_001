package com.main_001.server.tag.dto;

import javax.validation.constraints.NotNull;

public class TagDto {
    public static class Post{
        private String tagName;
    }

    public static class Responce{
        private int tagId;
        private boolean categoryExcercise;
        private String tagName;
        private int count;
    }
}
