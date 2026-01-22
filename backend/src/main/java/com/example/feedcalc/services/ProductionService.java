package com.example.feedcalc.services;

import com.example.feedcalc.entity.LogsEntity;
import com.example.feedcalc.entity.MaterialsEntity;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductionService {
    private final MaterialService materialService;
    private final LogsService logsService;

    //constructor
    public ProductionService(MaterialService materialService,LogsService logsService ){
        this.materialService=materialService;
        this.logsService=logsService;
    }
    @Transactional
    public void executeManufacture (List<MaterialsEntity> stocks, List<LogsEntity> logs){
        materialService.updateMaterialStocks(stocks);
        logsService.saveLogs(logs);
    }

}
