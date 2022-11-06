package com.example.backend.model;

import com.sun.istack.NotNull;
import lombok.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.persistence.*;
import java.util.List;
@CrossOrigin("*")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Choice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String answer;

    private Boolean isCorrect;

    @ManyToOne
    Question question;

    @ManyToMany
    List<User> user;
}
