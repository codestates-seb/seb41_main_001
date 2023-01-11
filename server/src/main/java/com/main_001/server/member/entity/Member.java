package com.main_001.server.member.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.GenerationType.IDENTITY;
@EntityListeners(AuditingEntityListener.class)
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

    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private Timestamp createdAt;

    private int heart;

    // member의 권한 정보 테이블과 매핑
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

}
