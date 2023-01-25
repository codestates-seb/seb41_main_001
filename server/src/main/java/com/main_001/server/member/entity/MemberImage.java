package com.main_001.server.member.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MEMBER_IMAGE_ID")
    private Long memberImageId;

    private String originalFileName; // 기존 파일명

    private String storedFileName; // 저장용 파일명

    private String filePath;

    private Long fileSize;

    @OneToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @Builder
    public MemberImage(Long memberImageId,
                       String originalFileName,
                       String storedFileName,
                       String filePath,
                       Long fileSize) {
        this.memberImageId = memberImageId;
        this.originalFileName = originalFileName;
        this.storedFileName = storedFileName;
        this.filePath = filePath;
        this.fileSize = fileSize;
    }

    public void setMember(Member member) {
        this.member = member;
    }
}
