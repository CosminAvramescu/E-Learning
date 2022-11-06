package com.example.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@IdClass(UserCourseId.class)
public class UserCourse {
    @Id
    Integer userId;
    @Id
    Integer courseId;

}
