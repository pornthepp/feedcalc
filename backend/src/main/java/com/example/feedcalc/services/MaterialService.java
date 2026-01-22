package com.example.feedcalc.services;
import com.example.feedcalc.entity.MaterialsEntity;
import com.example.feedcalc.repository.MaterialsRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
@Service
public class MaterialService {
    private MaterialsRepository repo;
    //Constructor
    public MaterialService(MaterialsRepository repo){
        this.repo = repo;
    }

    public List<MaterialsEntity> getAll(){
        return repo.findAll();
    }

    //repo <MaterialsEntity , Long>
    public MaterialsEntity getById(Long id){
        return repo.findById(id).orElse(null);
    }
    //Update Data------------------------------------// Type of data
    public MaterialsEntity updateMaterialStock(Long id, BigDecimal stock ){
            //get existing data from database to "existingdata"
            MaterialsEntity existingdata = repo.findById(id).orElse(null);
            if(existingdata != null){
                //update data set new stock
                existingdata.setMaterialStock(stock);
                return repo.save(existingdata);
            }else {
                return null;
            }
    }
    //update หลาย material พร้อมกัน --------------------ลิสของรูปแบบถาดรับข้อมูล : materialEntity ให้ชื่อว่า update
    @Transactional  //rowback when error
    public List<MaterialsEntity> updateMaterialStocks(List<MaterialsEntity> updates) {
        //สร้าง medthod เอาข้อมูลมาแจกแจงออกมา
        List<MaterialsEntity> CollectiontoUpdate = updates.stream().map(collection -> {
            //update ด้วย id (ข้อมูลรับเข้า)  --- ถ้าไม่เจอ id ใน database ให้ error
            MaterialsEntity exiting = repo.findById(collection.getMaterialId())
                            .orElseThrow(() -> new RuntimeException("no materialId found" + collection.getMaterialId()));
            //set ค่า exiting (Entity)
            exiting.setMaterialStock(collection.getMaterialStock());
            //return exiting
            return exiting;
        }).toList();  //เก็บข้อมูล exiting แต่ละรอบไว้ใน List CollectiontoUpdate และ saveAll
        return repo.saveAll(CollectiontoUpdate);
    }

    public MaterialsEntity updateMaterialPrice(Long id,BigDecimal price){
        //get existing data from database to "existingdata"
        MaterialsEntity existingdata = repo.findById(id).orElse(null);
        if(existingdata != null){
            //update data set new price
            existingdata.setMaterialPrice(price);
            return repo.save(existingdata);
        }else{
            return null;

        }
    }
}
