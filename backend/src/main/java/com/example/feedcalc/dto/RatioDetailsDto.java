package com.example.feedcalc.dto;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class RatioDetailsDto {
    Long ratioId;
    Long recipeId;
    Long materialId;
    String materialName;
    BigDecimal materialUse;
    BigDecimal materialStock;
    BigDecimal materialPrice;
    String status;
}
