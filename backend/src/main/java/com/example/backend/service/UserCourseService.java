package com.example.backend.service;

import com.example.backend.model.Course;
import com.example.backend.model.User;
import com.example.backend.model.UserCourse;
import com.example.backend.repository.UserCourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserCourseService
{
    private final UserCourseRepository userCourseRepository;

    public void addLink(User user, Course course) {
        UserCourse userCourse = new UserCourse(user.getId(), course.getId());
        userCourseRepository.save(userCourse);
    }

    public void saveMyCourse(UserCourse userCourse) {

        userCourseRepository.save(userCourse);
    }
}
