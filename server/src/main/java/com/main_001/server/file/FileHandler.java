package com.main_001.server.file;

import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component
public class FileHandler {
    public List<UploadFile> parseFileInfo(List<MultipartFile> multipartFiles) throws Exception {
        // 반환을 할 파일 리스트
        List<UploadFile> files = new ArrayList<>();

        // 파일이 빈 것이 들어오면 빈 것을 반환
        if (multipartFiles.isEmpty()) {
            return files;
        }

        // 전달된 파일이 존재하는 경우
        if(!CollectionUtils.isEmpty(multipartFiles)) {
            // 파일명을 업로드 한 날짜에 저장
            LocalDateTime now = LocalDateTime.now();
            DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyyMMdd");
            String current_date = now.format(dateTimeFormatter);

            // 프로젝트 디렉터리 내의 저장을 위한 절대 경로
            // 경로 구분자 File.separator 사용
            String absolutePath = new File("").getAbsolutePath() + File.separator + File.separator;

            // 파일 저장 세부 경로
            String path = "images"; //+ File.pathSeparator + current_date;
            File file = new File(path);

            // 디렉터리가 존재하지 않을 경우
            if(!file.exists()) {
                file.mkdir();
            }

            // 다중 파일 처리
            for(MultipartFile multipartFile : multipartFiles) {
                // 파일의 확장자 추출
                String originalFileExtension;
                String contentType = multipartFile.getContentType();

                // 확장자명이 존재하지 않을 경우 처러 X
                if(ObjectUtils.isEmpty(contentType)) {
                    break;
                }

                // 확장자가 jpeg, png, gif 인 파일들만 받아서 처리
                else {
                    if(contentType.contains("image/jpeg"))
                        originalFileExtension = ".jpg";
                    else if(contentType.contains("image/png"))
                        originalFileExtension = ".png";
                    else if(contentType.contains("image/gif"))
                        originalFileExtension = ".gif";
                    else
                        break;
                }

                // 파일명 중복을 피하고자 나노초까지 얻어와 지정
                // String new_file_name = System.nanoTime() + originalFileExtension;

                UUID uuid = UUID.randomUUID();
                String newFileName = uuid + originalFileExtension;

                // 파일 DTO 생성
                UploadFile uploadFile = UploadFile.builder()
                        .originalFileName(multipartFile.getOriginalFilename())
                        .storedFileName(newFileName)
                        .filePath(path + File.separator + newFileName)
                        .fileSize(multipartFile.getSize())
                        .build();

                // 생성 후 리스트에 추가
                files.add(uploadFile);

                // 업로드 한 파일 데이터를 지정한 파일에 저장
                file = new File(absolutePath + path + File.separator + newFileName);
                multipartFile.transferTo(file);

                // 파일 권한 설정(쓰기, 읽기)
                file.setWritable(true);
                file.setReadable(true);
            }
        }

        return files;
    }
}
