package com.example.backend.mapper;

import com.example.backend.dto.UploadedFileDto;
import com.example.backend.model.UploadedFile;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UploadedFileMapper {
//    @Mapping(target = "fileName", source = "")
    UploadedFileDto toUploadedFileDto(UploadedFile uploadedFile);

    List<UploadedFileDto> toListUploadedFileDto(List<UploadedFile> uploadedFileList);
}
