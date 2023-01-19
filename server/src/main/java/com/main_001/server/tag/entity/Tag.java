package com.main_001.server.tag.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

//TODO:
// tag_id	int
//        "member_tag or
//        recruit_tag or
//        free_tag"	int
//        tag_name	varchar(10)
//        count	int
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tag_id")
    private long tagId;
    private boolean categoryExercise;
    @NotNull
    private String tagName;
    private String emoji;

    @NotNull
    private int count;

}
