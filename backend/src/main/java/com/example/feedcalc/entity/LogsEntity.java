package com.example.feedcalc.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.autoconfigure.web.format.DateTimeFormatters;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
@Getter
@Setter
@Table(name = "LOGS")
public class LogsEntity {
    @Id
    @Column(name = "LOG_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int logId;
    @Column(name= "BATCH_ID")
    private String batchId;
    @Column(name= "BATCH_AMOUNT")
    private BigDecimal batchAmount;
    @Column(name="MATERIAL_NAME")
    private String materialName;
    @Column(name="USED_AMOUNT")
    private BigDecimal usedAmount;
    @Column(name="DATE")
    private String date;
    @PrePersist
    protected void setSysDate(){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        this.date = LocalDateTime.now().format(formatter);
    }
}
