package com.main_001.server.free.service;

import com.main_001.server.free.entity.Free;
import com.main_001.server.free.entity.FreeComment;
import com.main_001.server.free.repositpry.FreeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class FreeService{
    private FreeRepository freeRepository;
    public Free createFreeboaed(Free free) {
        return null;
    }

    public Free updateFreeboard(Free free) {
        return null;
    }

    public void deleteFreeboard(long freeId, long memberId) {

    }

    public void updateLike(long freeId, long memberId) {

    }

    public FreeComment createFreeComment(FreeComment freeComment) {
        return null;
    }

    public FreeComment updateFreeComment(FreeComment freeComment) {
        return null;
    }

    public void deleteFreeComment(FreeComment freeComment) {

    }

    public Free findFreeboard(long freeId) {
        return null;
    }

    public Page<Free> findFreeboards(int page, int size) {
        return null;
    }

    public Page<Free> searchFreeboards(int page, int size, String string) {
        return null;
    }
}
