package com.main_001.server.free.entity;

import com.main_001.server.member.entity.Member;
import com.main_001.server.recruit.entity.RecruitLike;
import com.main_001.server.recruit.entity.RecruitTag;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

//TODO
//        좋아요	like	int
//        조회수	views	int
//        작성자 id	member_id	int
//        말머리	category	varchar
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Free {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "FREE_ID")
    private Long freeId;

    @NotNull
    @Column(name = "FREE_TITLE")
    private String freeTitle;

    @NotNull
    @Column(name = "FREE_BODY")
    private String freeBody;

    @OneToMany(mappedBy = "free", cascade = CascadeType.ALL)
    private List<FreeComment> freeComments = new ArrayList<>();

    @CreatedDate
    @Column(name = "CREATED_AT", updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "LAST_MODIFIED_AT")
    private LocalDateTime modifiedAt;

    @OneToMany(mappedBy = "free",cascade = CascadeType.ALL)
    private List<FreeLike> freeLikes = new ArrayList<>();

    @OneToMany(mappedBy = "free",cascade = CascadeType.ALL)
    private List<FreeTag> freeTags = new ArrayList<>();

    @Column
    private int views;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @NotNull
    private String category;
}
