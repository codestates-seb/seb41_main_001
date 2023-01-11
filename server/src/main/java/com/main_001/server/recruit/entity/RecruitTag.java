package com.main_001.server.recruit.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class RecruitTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "RECRUIT_ID")
    private Recruit recruit;

//    @ManyToOne
//    @JoinColumn(name = "TAG_ID")
//    private Tag tag;

    public void setRecruit(Recruit recruit) {
        this.recruit = recruit;
        if (!this.recruit.getRecruitTags().contains(this)) {
            this.recruit.getRecruitTags().add(this);
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
