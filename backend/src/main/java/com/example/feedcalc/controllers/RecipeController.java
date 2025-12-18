package com.example.feedcalc.controllers;

import com.example.feedcalc.entity.RecipesEntity;
import com.example.feedcalc.services.RecipeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RecipeController {
    private RecipeService service;
    //Contructor
    public RecipeController(RecipeService service){
        this.service=service;
    }

    @GetMapping("/recipes")
    public ResponseEntity<List<RecipesEntity>> getAll(){
        return ResponseEntity.ok(service.getAll());
    }
    @GetMapping("/recipes/{id}")
    public ResponseEntity<RecipesEntity> getById(@PathVariable Long id){
        return ResponseEntity.ok(service.getById(id));
    }

}
