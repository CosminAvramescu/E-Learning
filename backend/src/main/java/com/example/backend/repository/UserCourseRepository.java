package com.example.backend.repository;

import com.example.backend.model.UserCourse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface UserCourseRepository extends JpaRepository<UserCourse, Integer> {

    Set<UserCourse> findAllByUserId(Integer userId);

}
