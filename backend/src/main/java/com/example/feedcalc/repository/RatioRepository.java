package com.example.feedcalc.repository;

import com.example.feedcalc.dto.RatioDetailsProjection;
import com.example.feedcalc.entity.RatioEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatioRepository extends JpaRepository<RatioEntity, Long> {
    //filter Ratio with RecipeId
    List<RatioEntity> findByRecipeId(Long recipeId);

    @Query(value = "SELECT r.ratio_id AS ratioId," +
            "r.recipe_id AS recipeId,"+
            "r.material_id AS materialId,"+
            "r.amount AS amount, " +
            "m.material_name AS materialName " +
            "FROM ratio r "+
            "JOIN MATERIALS m ON r.material_id = m.material_id "+
            "WHERE r.recipe_id = :recipeId",
            nativeQuery = true)
    List<RatioDetailsProjection> findByRecipeIdWithMaterialName(Long recipeId);
}