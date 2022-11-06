package com.example.backend.model;

import com.sun.istack.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    private String courseName;

    @NotNull
    private String courseDescription;

    // !!aici se leaga doar de profesorul care a creat cursul, in rest studentii se leaga de userCourses (tabela adiac)
    @OneToOne
    User user;

//    @OneToMany
//    List<UploadedFile> fileNames;

    @OneToMany
    List<Quiz> quizList;

    @OneToMany
    Set<UserCourse> userCourses;

    @ManyToOne
    Category category;

}
