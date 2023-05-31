package com.main_001.server.tag.entity;

import lombok.*;

import javax.persistence.*;

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
@Builder
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tag_id")
    private long tagId;

    @Column
    private boolean categoryExercise;

    @Column
    private String tagName;

    @Column
    private String emoji;

    @Column
    private int recruitCount;

    @Column
    private int freeCount;
}
