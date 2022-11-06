package com.example.backend.repository;

import com.example.backend.model.Category;
import com.example.backend.model.Course;
import com.example.backend.model.User;
import com.example.backend.model.UserCourse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Set;

public interface CourseRepository extends JpaRepository<Course, Integer> {

//    List<Course> findAllByUser(User user);
//    List<Course> findAllByUserCourses()
//    List<Course> findAllByCategoryList_Name (String categoryName);

    // this works only for teacher!
    List<Course> findAllByUser(User user);

    Course getCourseById(Integer id);

}
