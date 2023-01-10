package com.main_001.server.recruit.entity;

import com.main_001.server.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Recruit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "RECRUIT_ID", nullable = false)
    private Long recruitId;

    @Column
    private String title;

    @Column
    private String body;

    @Column
    private LocalDateTime createdAt;

    @Column
    private LocalDateTime modifiedAt;
//    시간 설정 시 참고
//    Timestamp timestamp = new Timestamp(System.currentTimeMillis());
//    LocalDateTime localDateTime = timestamp.toLocalDateTime();
    @Column
    private int require=0;

    @Column
    private int minRequire=0;

    @Enumerated(EnumType.STRING)
    private RecruitStatus recruitStatus = RecruitStatus.RECRUITING;

    @Column
    private double star=0;

    @Column
    private int views=0;

    @Column
    private int heart=0;

    @Column
    private String ageGroupString;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @OneToMany(mappedBy = "recruit",cascade = CascadeType.ALL)
    private List<Apply> applies = new ArrayList<>();

    @OneToMany(mappedBy = "recruit",cascade = CascadeType.ALL)
    private List<RecruitComment> recruitComments = new ArrayList<>();

    @OneToMany(mappedBy = "recruit",cascade = CascadeType.ALL)
    private List<RecruitLike> recruitLikes = new ArrayList<>();

    @OneToMany(mappedBy = "recruit",cascade = CascadeType.ALL)
    private List<RecruitTag> recruitTags = new ArrayList<>();

    @OneToMany(mappedBy = "recruit",cascade = CascadeType.ALL)
    private List<Review> reviews  = new ArrayList<>();

    public enum RecruitStatus{
        RECRUITING(1,"모집 중"),
        RECRUIT_MEET_MINIMUM(2, "최소 인원 충족"),
        RECRUIT_COMPLETE(3, "모집 완료"),
        RECRUIT_END(4, "활동 종료");

        @Getter
        private int stepNumber;

        @Getter
        private String stepDescription;

        RecruitStatus(int stepNumber, String stepDescription) {
            this.stepNumber = stepNumber;
            this.stepDescription = stepDescription;
        }
    }
}
