package com.example.feedcalc.controllers;

import com.example.feedcalc.dto.RatioDetailsDto;
import com.example.feedcalc.entity.RatioEntity;
import com.example.feedcalc.services.RatioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class RatioController {
    private RatioService service;
    public RatioController(RatioService service){
        this.service=service;
    }

    @GetMapping("/ratios")
    public ResponseEntity<List<RatioEntity>>getAll(){
        return ResponseEntity.ok(service.getAll());
    }
    @GetMapping("/ratios/byRecipeId/{recipeId}")
    public ResponseEntity <List<RatioDetailsDto>> getByRecipeId(@PathVariable Long recipeId) {
        return ResponseEntity.ok(service.getRatioByRecipeId(recipeId));
    }
}
