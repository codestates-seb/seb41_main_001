package com.main_001.server.recruit.entity;

import com.main_001.server.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class RecruitLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "RECRUIT_ID")
    private Recruit recruit;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    public void setRecruit(Recruit recruit) {
        this.recruit = recruit;
        if (!this.recruit.getRecruitLikes().contains(this)) {
            this.recruit.getRecruitLikes().add(this);
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}