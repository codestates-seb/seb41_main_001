package com.main_001.server.recruit.entity;

import com.main_001.server.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Apply {
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
        if (!this.recruit.getApplies().contains(this)) {
            this.recruit.getApplies().add(this);
        }
    }

    public void setMember(Member member) {
        this.member = member;
//        if (!this.member.getApplies().contains(this)){
//            this.member.getApplies().add(this);
//        }
    }
}
