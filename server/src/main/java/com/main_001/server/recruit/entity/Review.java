package com.main_001.server.recruit.entity;

import com.main_001.server.member.entity.Member;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column
    private String body;

    @Column
    private int star;

    @Column
    private String worstMemberNickname;

    @ManyToOne
    @JoinColumn(name = "RECRUIT_ID")
    private Recruit recruit;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    public void setRecruit(Recruit recruit) {
        this.recruit = recruit;
        if (!this.recruit.getReviews().contains(this)) {
            this.recruit.getReviews().add(this);
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
