package com.example.feedcalc.services;
import com.example.feedcalc.entity.MaterialsEntity;
import com.example.feedcalc.repository.MaterialsRepository;
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
