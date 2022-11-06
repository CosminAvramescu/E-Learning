package com.example.backend.mapper;

import com.example.backend.dto.CourseDto;
import com.example.backend.model.Course;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CourseMapper {
    CourseDto toCourseDto(Course course);
}
