package com.main_001.server.member.entity;

import com.main_001.server.tag.entity.Tag;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class MemberTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MEMBER_TAG_ID", nullable = false)
    private Long memberTagId;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "TAG_ID")
    private Tag tag;

    public void addMember(Member member) {
        this.member = member;
        if (!this.member.getMemberTags().contains(this)) {
            this.member.getMemberTags().add(this);
        }
    }

    public void addTag(Tag tag) {
        this.tag = tag;
    }
}
