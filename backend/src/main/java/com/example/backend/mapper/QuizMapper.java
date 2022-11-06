package com.example.backend.mapper;

import com.example.backend.dto.QuizDto;
import com.example.backend.dto.UploadedFileDto;
import com.example.backend.model.Quiz;
import com.example.backend.model.UploadedFile;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface QuizMapper {
    @Mapping(target = "id", source = "id")
    QuizDto toQuizDto(Quiz quiz);

        List<QuizDto> toListQuizDto(List<Quiz> quizList);
}
