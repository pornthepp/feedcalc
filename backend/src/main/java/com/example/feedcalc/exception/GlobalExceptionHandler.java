package com.example.feedcalc.exception;

import com.example.feedcalc.entity.RecipesEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleAllException (HttpMessageNotReadableException readError){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Read Error: " +readError.getMessage());
    }
}
