package com.example.feedcalc.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Entity
public class RatioEntity {
    @Id
    @Column(name="RATIO_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ratioId;
    @Column(name="RECIPE_ID")
    private int recipeId;
    @Column(name="MATERIAL_ID")
    private int materialId;
    @Column(name="AMOUNT")
    private double amount;
    @Column(name="PRICE")
    private double price;

    //Constructor
    public RatioEntity() {}


}
