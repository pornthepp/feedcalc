package com.example.feedcalc.services;

import com.example.feedcalc.dto.RatioDetailsDto;
import com.example.feedcalc.dto.RatioDetailsProjection;
import com.example.feedcalc.entity.RatioEntity;
import com.example.feedcalc.repository.RatioRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.stream.Collectors;

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
    public List<RatioDetailsDto>getRatioByRecipeId(Long recipeId, BigDecimal amount){
        List<RatioDetailsProjection>projections = repo.findByRecipeIdWithMaterialName(recipeId);
        //Loop เอาของจาก RatioDetailsProjection(p) ใส่ใน dto และคืนทั้งหมดเป็น list
        return projections.stream().map(p->{
            RatioDetailsDto dto = new RatioDetailsDto();
            //set ค่าที่ได้จาก projection
            dto.setMaterialName(p.getMaterialName());
            dto.setRatioId(p.getRatioId());
            dto.setRecipeId(p.getRecipeId());
            //ถ้าส่ง amount เข้ามา //test by 0.30
            if(amount.compareTo(BigDecimal.ONE)!=0){
                BigDecimal calAmount = p.getAmount()
                        .divide(BigDecimal.valueOf(100))
                        .multiply(amount)
                        .setScale(2, RoundingMode.HALF_UP);
                dto.setAmount(calAmount);
            }else {
                dto.setAmount(p.getAmount());
            }
            return dto;
        }).collect(Collectors.toList());
    }
}
