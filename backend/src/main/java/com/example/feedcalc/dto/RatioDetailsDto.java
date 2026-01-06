package com.example.feedcalc.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.math.BigDecimal;

public interface RatioDetailsDto {
    Long getRatioId();
    Long getRecipeId();
    Long getMaterialId();
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    BigDecimal getAmount();
    String getMaterialName();
}
