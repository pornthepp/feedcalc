package com.example.feedcalc.dto;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class RatioDetailsDto {
    Long ratioId;
    Long RecipeId;
    BigDecimal amount;
    String materialName;
}
