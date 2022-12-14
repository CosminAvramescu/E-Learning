package com.example.backend.model;

import com.sun.istack.NotNull;
import lombok.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
@CrossOrigin("*")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;


    private String question;


    private Integer score;

    private Integer noOfChoices;

    @OneToMany
    List<Choice> choiceList = new ArrayList<>();

    @ManyToOne
    Quiz quiz;

    public void incrementNoOfChoices(){
        this.noOfChoices = this.noOfChoices + 1;
    }

    public void decrementNoOfChoices(){
        this.noOfChoices = this.noOfChoices - 1;
    }
}
