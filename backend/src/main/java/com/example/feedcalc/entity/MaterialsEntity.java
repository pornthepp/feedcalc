package com.example.feedcalc.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

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
    private BigDecimal materialStock;
    @Column(name = "MATERIAL_PRICE")
    private BigDecimal materialPrice;

    //Constructor
    public MaterialsEntity() {}
}
