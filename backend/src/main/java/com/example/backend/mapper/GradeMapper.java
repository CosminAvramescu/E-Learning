package com.example.backend.mapper;

import com.example.backend.dto.GradeDto;
import com.example.backend.dto.QuizDto;
import com.example.backend.model.Grade;
import com.example.backend.model.Quiz;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface GradeMapper {
    @Mapping(target = "grade", source = "grade")
    @Mapping(target = "quizId", source = "quiz.id")
    @Mapping(target = "courseName", source = "quiz.course.courseName")
    GradeDto toGradeDto(Grade quiz);

    List<GradeDto> toListGradeDto(List<Grade> quizList);
}
