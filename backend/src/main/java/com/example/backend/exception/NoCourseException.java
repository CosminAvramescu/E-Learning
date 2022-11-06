package com.example.backend.exception;

public class NoCourseException extends Exception{
    public NoCourseException(){
        super("THe course you are looking for doesnt exist");
    }
}
