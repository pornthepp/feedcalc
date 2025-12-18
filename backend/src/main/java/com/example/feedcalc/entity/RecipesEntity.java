package com.example.feedcalc.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="RECIPES")
public class RecipesEntity {
    @Id
    @Column(name = "RECIPE_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int recipeId;
    
    @Column(name = "RECIPE_NAME")
    private String recipeName;
    @Column(name = "RECIPE_DESCRIPTION")
    private double recipeDescription;
    @Column(name = "RECIPE_PROTEIN")
    private double recipeProtein;
    @Column(name = "RECIPE_KCAL")
    private double recipeKcal;

    //Constructor
    public RecipesEntity() {}
}
