package com.main_001.server.file;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UploadFile {
    private String originalFileName; // 기존 파일명

    private String storedFileName; // 저장용 파일명

    private String filePath;

    private Long fileSize;
}
