package com.example.feedcalc.services;

import com.example.feedcalc.entity.RecipesEntity;
import com.example.feedcalc.repository.RecipesRepository;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class RecipeService {
    private RecipesRepository repo;
    //Constructor ทุกครั้งที่สร้าง service object ให้ใช้ repo เสมอ
    public RecipeService(RecipesRepository repo){
        this.repo=repo;
    }
    public List<RecipesEntity> getAll(){
        return repo.findAll();
    }
    public RecipesEntity getById(Long id){
        return repo.findById(id).orElse(null);
    }


}
