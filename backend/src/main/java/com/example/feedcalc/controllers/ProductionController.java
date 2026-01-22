package com.example.feedcalc.controllers;

import com.example.feedcalc.dto.ProductionRequestDto;
import com.example.feedcalc.entity.LogsEntity;
import com.example.feedcalc.entity.MaterialsEntity;
import com.example.feedcalc.services.ProductionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProductionController {
    private ProductionService productionService;
    //constructor
    public ProductionController (ProductionService productionService){
        this.productionService=productionService;
    }
    //เรียกใช้ method ที่รวม 2 method ไว้ด้วยกัน (saveLog , updateMaterial)
    @PostMapping("/produce")
    // รับ body เข้ามาและใส่ลงใน ProductionRequestDto
    public ResponseEntity<String> produce (@RequestBody ProductionRequestDto request){
        //ดึง material จาก dto
        List<MaterialsEntity> materials = request.getStocks();
        //ดึง logs จาก dto
        List<LogsEntity> logs = request.getLogs();

        //เรียกใช้งาน medthod เพื่อบันทึกและอัพเดทข้อมูล
        productionService.executeManufacture(materials,logs);
        return ResponseEntity.ok("Success");
    }
}
