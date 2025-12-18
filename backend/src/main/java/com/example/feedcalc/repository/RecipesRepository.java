package com.example.feedcalc.repository;

import com.example.feedcalc.entity.RecipesEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipesRepository extends JpaRepository<RecipesEntity,Long> {

}
