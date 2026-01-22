package com.example.feedcalc.controllers;

import com.example.feedcalc.entity.MaterialsEntity;
import com.example.feedcalc.services.MaterialService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
@RestController
public class MaterialController {
    //รับ service เข้ามา
    private MaterialService service;

    //Constructor
    public MaterialController(MaterialService service){
        this.service=service;
    }

    //getAll
    @GetMapping("/materials")
    public ResponseEntity<List<MaterialsEntity>>getAll(){
        return ResponseEntity.ok(service.getAll());
    }
    //getById
    @GetMapping("/materials/{id}")
    public ResponseEntity <MaterialsEntity> getById(@PathVariable Long id){
        return ResponseEntity.ok(service.getById(id));
    }
    //set Material Stock
    @PatchMapping("/materials/updateStock/{id}")
    public ResponseEntity <MaterialsEntity> updateStock(
            @PathVariable Long id,
            //รับ json body  {"key":"value"}
            @RequestBody Map<String,BigDecimal> materialStock){
        //-------------------------------->Key from json
        BigDecimal stock = materialStock.get("materialStock");
        return ResponseEntity.ok(service.updateMaterialStock(id,stock));
    }
    //setMultiple Material Stock (List)
    @PatchMapping("/materials/updateStocks")
    public ResponseEntity <List<MaterialsEntity>> updateStocks(
            @RequestBody List<MaterialsEntity> materialStocks){
        return ResponseEntity.ok(service.updateMaterialStocks(materialStocks));
    }

    //set Material Price
    @PatchMapping("/materials/updatePrice/{id}")
    public ResponseEntity <MaterialsEntity> updatePrice(
            @PathVariable Long id,
            //รับ json body  {"key":"value"}
            @RequestBody Map<String,BigDecimal> materialPrice){
        //-------------------------------->Key from json
        BigDecimal price = materialPrice.get("materialPrice");
        return ResponseEntity.ok(service.updateMaterialPrice(id,price));
    }
}
