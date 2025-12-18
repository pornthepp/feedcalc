package com.example.feedcalc.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "MATERIALS")
public class MaterialsEntity {
    @Id
    @Column(name = "MATERIAL_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int materialId;
    @Column(name = "MATERIAL_NAME")
    private String materialName;
    @Column(name = "MATERIAL_STOCK")
    private double materialStock;
    @Column(name = "MATERIAL_PRICE")
    private double materialPrice;

    //Constructor
    public MaterialsEntity() {}
}
