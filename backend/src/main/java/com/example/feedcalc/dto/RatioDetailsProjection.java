package com.example.feedcalc.dto;

import java.math.BigDecimal;
public interface RatioDetailsProjection {
    Long getMaterialId();
    Long getRecipeId();
    Long getRatioId();
    BigDecimal getMaterialStock();
    BigDecimal getMaterialUse();
    String getMaterialName();
}
