package com.example.feedcalc.services;

import com.example.feedcalc.entity.LogsEntity;
import com.example.feedcalc.repository.LogsRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LogsService {
    private LogsRepository repo;
    //ทุกครั้งที่มีการสร้าง object LogsService ให้ฉีด Repo เข้าไปใช้งานด้วย
    public LogsService (LogsRepository repo){
        this.repo=repo;
    }
    public List<LogsEntity> getAllLogs(){
        return repo.findAllByOrderByLogIdDesc();
    }
    @Transactional
    //เราจะรับกลุ่มข้อมูลมาจากหน้าบ้าน แล้วมา save ลงแบบ saveAll
    public List<LogsEntity> saveLogs (List<LogsEntity> logs){
        return repo.saveAll(logs);
    }
}
