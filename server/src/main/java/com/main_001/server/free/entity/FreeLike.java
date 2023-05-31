package com.main_001.server.free.entity;

import com.main_001.server.member.entity.Member;
import com.main_001.server.recruit.entity.Recruit;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FreeLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "FREE_ID")
    private Free free;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    public void setFree(Free free) {
        this.free = free;
        if (!this.free.getFreeLikes().contains(this)) {
            this.free.getFreeLikes().add(this);
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
