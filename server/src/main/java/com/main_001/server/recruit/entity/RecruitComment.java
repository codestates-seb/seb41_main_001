package com.main_001.server.recruit.entity;

import com.main_001.server.member.entity.Member;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecruitComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column
    private String body;

    @Column
    private LocalDateTime createdAt;

    @Column
    private LocalDateTime modifiedAt;

    @ManyToOne
    @JoinColumn(name = "RECRUIT_ID")
    private Recruit recruit;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    public void setRecruit(Recruit recruit) {
        this.recruit = recruit;
        if (!this.recruit.getRecruitComments().contains(this)) {
            this.recruit.getRecruitComments().add(this);
        }
    }
}
