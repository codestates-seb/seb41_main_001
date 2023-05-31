package com.main_001.server.recruit.entity;

import com.main_001.server.free.entity.Free;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor
public class RecruitImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "RECRUIT_IMAGE_ID")
    private Long id;

    private String originalFileName; // 기존 파일명

    private String storedFileName; // 저장용 파일명

    private String filePath;

    private Long fileSize;

    @ManyToOne
    @JoinColumn(name = "RECRUIT_ID")
    private Recruit recruit;

    @Builder
    public RecruitImage(Long id,
                     String originalFileName,
                     String storedFileName,
                     String filePath,
                     Long fileSize) {
        this.id = id;
        this.originalFileName = originalFileName;
        this.storedFileName = storedFileName;
        this.filePath = filePath;
        this.fileSize = fileSize;
    }

    public void setRecruit(Recruit recruit) {
        this.recruit = recruit;
    }
}
