package com.example.feedcalc.repository;

import com.example.feedcalc.entity.LogsEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LogsRepository  extends JpaRepository<LogsEntity ,Long> {
    List<LogsEntity> findAllByOrderByLogIdDesc();
}
