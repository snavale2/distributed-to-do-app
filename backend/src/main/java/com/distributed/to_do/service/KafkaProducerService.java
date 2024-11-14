package com.distributed.to_do.service;

import com.distributed.to_do.model.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaProducerService {

    @Autowired
    private KafkaTemplate<String, Task> kafkaTemplate;

    public void sendMessage(Task task) {
        kafkaTemplate.send("task-updates", task);
    }
}

