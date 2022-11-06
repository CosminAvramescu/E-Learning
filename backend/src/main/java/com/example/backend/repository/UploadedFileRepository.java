package com.example.backend.repository;

import com.example.backend.model.UploadedFile;
import org.apache.arrow.flatbuf.Int;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UploadedFileRepository extends JpaRepository<UploadedFile, Integer> {
    List<UploadedFile> getAllByCourse_Id(Integer id);

    List<UploadedFile> getAllByCourse_IdAndFileNameNotContaining(Integer id, String name);
    List<UploadedFile> getAllByCourse_IdAndFileNameContaining(Integer id, String name);
}
