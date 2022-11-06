package com.example.backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GradeDto {
    String courseName;
    Integer grade;
    Integer quizId;
}
