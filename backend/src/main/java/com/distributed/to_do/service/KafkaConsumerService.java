package com.distributed.to_do.service;

import com.distributed.to_do.model.Task;
import com.distributed.to_do.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumerService {

    @Autowired
    private TaskRepository taskRepository;

    @KafkaListener(topics = "task-updates", groupId = "todo-consumer-group")
    public void consume(Task task) {
        taskRepository.save(task);
    }
}

