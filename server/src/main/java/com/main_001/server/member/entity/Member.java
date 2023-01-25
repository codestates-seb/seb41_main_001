package com.main_001.server.member.entity;

import com.main_001.server.free.entity.Free;
import com.main_001.server.free.entity.FreeComment;
import com.main_001.server.free.entity.FreeLike;
import com.main_001.server.recruit.entity.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.GenerationType.IDENTITY;
@EntityListeners(AuditingEntityListener.class) // 생성 날짜 자동화
@Setter
@Getter
@Entity
@SQLDelete(sql = "UPDATE member SET deleted = true WHERE member_id=?") // SQL의 delete 재정의
@Where(clause = "deleted = false") // where 조건에 해당하는 데이터만 불러오기
public class Member {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "MEMBER_ID", nullable = false)
    private Long memberId;

    private String name;

    private String nickname;

    private String birth;

    private String password;

    private String email;

    private String phone;

    private String sex;

    private boolean deleted = Boolean.FALSE; // soft delete 구현을 위한 초기 값 세팅

    // 이미지 어떻게 받아오지?

    private String locationGroupString;

    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    private int heart;

    // member의 권한 정보 테이블과 매핑
    // TODO 개발 완료 후 봉인 해제
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @OneToOne(mappedBy = "member", cascade = CascadeType.ALL)
    private MemberImage memberImage;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<MemberTag> memberTags = new ArrayList<>();

    // Recruit 게시판 관련 내용
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Apply> applies = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Recruit> recruits = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<RecruitComment> recruitComments = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<RecruitLike> recruitLikes = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Review> reviews = new ArrayList<>();

    // free 게시판 관련 내용
//    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
//    private List<Free> frees = new ArrayList<>();
//
//    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
//    private List<FreeLike> freeLikes = new ArrayList<>();
//
//    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
//    private List<FreeComment> freeComments = new ArrayList<>();

    public void addMemberImage(MemberImage memberImage) {
        if (memberImage.getMember() != this) {
            memberImage.setMember(this);
        }
        this.memberImage = memberImage;
    }
}
