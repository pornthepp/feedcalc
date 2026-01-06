package com.example.feedcalc.services;

import com.example.feedcalc.dto.RatioDetailsDto;
import com.example.feedcalc.entity.RatioEntity;
import com.example.feedcalc.repository.RatioRepository;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class RatioService {
    private RatioRepository repo;
    //Constructor ทุกครั้งที่สร้าง service object ให้ใช้ repo เสมอ
    public RatioService(RatioRepository repo){
        this.repo = repo;
    }
    public List<RatioEntity> getAll(){
        return repo.findAll();
    }
    public List<RatioDetailsDto>getRatioByRecipeId(Long recipeId){
        return repo.findByRecipeIdWithMaterialName(recipeId);
    }
}
