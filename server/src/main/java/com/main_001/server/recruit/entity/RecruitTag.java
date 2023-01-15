package com.main_001.server.recruit.entity;

import com.main_001.server.tag.entity.Tag;
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

    @ManyToOne
    @JoinColumn(name = "TAG_ID")
    private Tag tag;

    public void setRecruit(Recruit recruit) {
        this.recruit = recruit;
        if (!this.recruit.getRecruitTags().contains(this)) {
            this.recruit.getRecruitTags().add(this);
        }
    }

    public void setTag(Tag tag) {
        this.tag = tag;
//        if(!this.tag.getRecruitTags().contains(this)){
//            this.tag.addQuestionTag(this);
//        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
