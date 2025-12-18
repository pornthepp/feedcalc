package com.example.feedcalc.repository;

import com.example.feedcalc.entity.MaterialsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MaterialsRepository extends JpaRepository<MaterialsEntity, Long>{
}
