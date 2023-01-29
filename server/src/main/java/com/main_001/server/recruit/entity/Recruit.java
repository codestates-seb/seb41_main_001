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
    @Column(name = "MAX_REQUIRE")
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
    private int heartLimit=0;

    @Column
    private String ageGroupString;

    @Column
    private String sex;

    @Column
    private LocalDateTime date;

    @Column
    private String location;

    @Column
    private double lat;

    @Column
    private double lon;

    @Column
    private double distance;

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

    //Todo : 거리계산 하기
    public void setDistance(double mLat, double mLon) {
        double p = 0.017453292519943295;
        var a = 0.5 - Math.cos((mLat - this.lat) * p)/2 +
                Math.cos(mLat * p) * Math.cos(this.lat * p) *
                        (1 - Math.cos((mLon - this.lon) * p))/2;

        this.distance = 12742 * Math.asin(Math.sqrt(a));
    }

    public enum RecruitStatus{
        RECRUITING(1,"모집중"),
        RECRUIT_MEET_MINIMUM(2, "최소인원충족"),
        RECRUIT_COMPLETE(3, "모집완료"),
        RECRUIT_END(4, "활동종료");

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
