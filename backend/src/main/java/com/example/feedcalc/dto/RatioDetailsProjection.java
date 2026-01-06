package com.example.feedcalc.dto;

import java.math.BigDecimal;
public interface RatioDetailsProjection {
    Long getRecipeId();
    Long getRatioId();
    BigDecimal getAmount();
    String getMaterialName();
}
