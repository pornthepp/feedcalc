package com.example.feedcalc.controllers;

import com.example.feedcalc.dto.RatioDetailsDto;
import com.example.feedcalc.dto.RatioDetailsProjection;
import com.example.feedcalc.entity.RatioEntity;
import com.example.feedcalc.services.RatioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
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
    public ResponseEntity <List<RatioDetailsDto>> getByRecipeId(@PathVariable Long recipeId,
                                                                @RequestParam(defaultValue = "1") BigDecimal amount) {
        return ResponseEntity.ok(service.getRatioByRecipeId(recipeId,amount));
    }
}
