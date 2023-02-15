package com.main_001.server.free.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor
public class FreeImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "FREE_IMAGE_ID")
    private Long freeImageId;

    private String originalFileName; // 기존 파일명

    private String storedFileName; // 저장용 파일명

    private String filePath;

    private Long fileSize;

    @ManyToOne
    @JoinColumn(name = "FREE_ID")
    private Free free;

    @Builder
    public FreeImage(Long freeImageId,
                       String originalFileName,
                       String storedFileName,
                       String filePath,
                       Long fileSize) {
        this.freeImageId = freeImageId;
        this.originalFileName = originalFileName;
        this.storedFileName = storedFileName;
        this.filePath = filePath;
        this.fileSize = fileSize;
    }

    public void setFree(Free free) {
        this.free = free;
    }
}
