package com.example.feedcalc.dto;

import com.example.feedcalc.entity.LogsEntity;
import com.example.feedcalc.entity.MaterialsEntity;
import lombok.Data;

import java.util.List;

@Data
public class ProductionRequestDto {
    //ข้อมูล material และ logs ที่จะอัพเดทหลังจาก กดปุ่มผลิต
    private List<MaterialsEntity> stocks;
    private List<LogsEntity> logs;
}
