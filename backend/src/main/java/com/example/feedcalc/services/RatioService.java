package com.example.feedcalc.services;

import com.example.feedcalc.dto.RatioDetailsDto;
import com.example.feedcalc.dto.RatioDetailsProjection;
import com.example.feedcalc.entity.MaterialsEntity;
import com.example.feedcalc.entity.RatioEntity;
import com.example.feedcalc.repository.MaterialsRepository;
import com.example.feedcalc.repository.RatioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class RatioService {
    private RatioRepository repo;
    @Autowired
    private MaterialsRepository materialsRepository;

    //Constructor ทุกครั้งที่สร้าง service object ให้ใช้ repo เสมอ
    public RatioService(RatioRepository repo){
        this.repo = repo;
    }
    public List<RatioEntity> getAll(){
        return repo.findAll();
    }

    public List<RatioDetailsDto>getRatioByRecipeId(Long recipeId, BigDecimal inputAmount){
        List<RatioDetailsProjection>projections = repo.findByRecipeIdWithMaterialName(recipeId);
        List<MaterialsEntity>materials=materialsRepository.findAll();
        //Map materials to Map with Key:MaterialName
        Map<String ,MaterialsEntity> materialEntityMap = materials.stream()
                .collect(Collectors.toMap
                        (MaterialsEntity::getMaterialName,allMaterial->allMaterial));

        //if inputAmount == null , totalAmount = 100 , if not totalAmount = inputAmount
        BigDecimal totalAmount = inputAmount==null? new BigDecimal("100"):inputAmount;

        //Loop เอาของจาก RatioDetailsProjection(p) ใส่ใน dto และคืนทั้งหมดเป็น list
        return projections.stream().map(p->{
            MaterialsEntity material = materialEntityMap.get(p.getMaterialName());
            RatioDetailsDto dto = new RatioDetailsDto();
            //set ค่าที่ได้จาก projection
            dto.setMaterialName(p.getMaterialName());
            dto.setMaterialId(p.getMaterialId());
            dto.setRatioId(p.getRatioId());
            dto.setRecipeId(p.getRecipeId());
            dto.setMaterialStock(material.getMaterialStock());
            dto.setMaterialPrice(material.getMaterialPrice());

            BigDecimal calAmount = p.getMaterialUse()
                        .divide(new BigDecimal("100"))
                        .multiply(totalAmount)
                        .setScale(4, RoundingMode.HALF_UP);
            dto.setMaterialUse(calAmount);
            if (dto.getMaterialUse().compareTo(dto.getMaterialStock()) <= 0){
                dto.setStatus("พร้อม");
            }else {
                dto.setStatus("ไม่พร้อม");
            }
            return dto;

        }).collect(Collectors.toList());
    }
    public BigDecimal getMaxManufacture(Long recipeId){
        BigDecimal hundressKg = new BigDecimal(100);
        List<RatioDetailsDto> getRatio = getRatioByRecipeId(recipeId,hundressKg);
        //min stock
        RatioDetailsDto lessStock = getRatio.stream()
                .min(Comparator.comparing(RatioDetailsDto::getMaterialStock)).orElse(null);
        BigDecimal realMaterialUse = lessStock.getMaterialUse().divide(hundressKg);
        BigDecimal minMaterialinStock = lessStock.getMaterialStock();
        //System.out.println("material in stock: "+lessStock.getMaterialStock());
        //System.out.println("materialUse(100kg): "+lessStock.getMaterialUse());
        //System.out.println("materialUse(1kg): "+lessStock.getMaterialUse().divide(hundressKg));
        //System.out.println("min material can use (kg): "+minMaterialinStock.divide(realMaterialUse,4,RoundingMode.HALF_UP));
        BigDecimal getCalMaxManufac = minMaterialinStock.divide(realMaterialUse,4,RoundingMode.HALF_UP);
        return getCalMaxManufac;
    }

   public BigDecimal getMaxManufacture2 (Long recipeId){
        List<RatioDetailsProjection>ratio = repo.findByRecipeIdWithMaterialName(recipeId);
        //record เปล่า
        record Stock (BigDecimal amount,BigDecimal stock){
        }
        //สร้างตู้ไว้เก็บข้อมูลเพื่อเอาไปคำนวณต่อไป (materialId,materialStock)
        Map<Long,Stock> ratioMap = ratio.stream()
                .collect(Collectors.toMap
                (RatioDetailsProjection::getMaterialId,
                        item->new Stock(item.getMaterialUse(),item.getMaterialStock())));
        BigDecimal minStock =ratioMap.values().stream().map(item->item.stock()
                        .divide(item.stock,2)).min(BigDecimal::compareTo)
                .orElse(BigDecimal.ZERO);
        return minStock;
    }
    public BigDecimal getTotalCost(Long recipeId,BigDecimal inputAmount ){
        BigDecimal rawTotal = repo.findTotalMaterialPrice(recipeId);
        BigDecimal total = rawTotal.divide(new BigDecimal(100)).multiply(inputAmount);
        return total;
    }
}
