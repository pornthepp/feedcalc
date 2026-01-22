package com.example.feedcalc.controllers;

import com.example.feedcalc.entity.LogsEntity;
import com.example.feedcalc.repository.LogsRepository;
import com.example.feedcalc.services.LogsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class LogsController {
    private LogsService service;

    public LogsController(LogsService service){
        this.service=service;
    }
    
    @GetMapping("/logs")
    public ResponseEntity<List<LogsEntity>> getLogs (){
        return ResponseEntity.ok(service.getAllLogs());
    }

    @PostMapping("/logs")
    public ResponseEntity<List<LogsEntity>> saveLogs(
            @RequestBody List<LogsEntity> logs){
        service.saveLogs(logs);
        return  ResponseEntity.status(HttpStatus.CREATED).body(logs);
    }
}
