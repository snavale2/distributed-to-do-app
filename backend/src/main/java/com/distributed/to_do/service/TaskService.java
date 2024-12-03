package com.distributed.to_do.service;

import com.distributed.to_do.model.Task;
import com.distributed.to_do.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private KafkaProducerService kafkaProducerService;

    @Autowired
    private WebSocketService webSocketService;


    public Task createTask(Task task){
        task.setLastModified(new Date());
        Task savedTask = taskRepository.save(task);
        try {
            kafkaProducerService.sendMessage(savedTask);
        } catch (Exception e) {
            System.err.println("Failed to send Kafka message: " + e.getMessage());
        }
        
        try {
            webSocketService.sendTaskUpdate(savedTask);
        } catch (Exception e) {
            System.err.println("Failed to send WebSocket update: " + e.getMessage());
        }
        return savedTask;
    }

//    public Task updateTask(String id, Task task){
//        Task existingTask = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
//
//        task.setId(existingTask.getId());
//        task.setLastModified(new Date());
//        Task updatedTask = taskRepository.save(task);
//        kafkaProducerService.sendMessage(updatedTask);
//        webSocketService.sendTaskUpdate(updatedTask);
//        return updatedTask;
//    }

    public Task updateTask(String id, Task task) {
        Task existingTask = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setId(existingTask.getId());
        task.setLastModified(new Date());
        Task updatedTask = taskRepository.save(task);

        try {
            kafkaProducerService.sendMessage(updatedTask);
        } catch (Exception e) {
            System.out.println(" @@@@@@@@@@@@@@@@@@@@@ Failed to send Kafka message: " + e.getMessage());
        }

        try {
            webSocketService.sendTaskUpdate(updatedTask);
        } catch (Exception e) {
            System.out.println("@@@@@@@@@@@@@@@@@@@@ Failed to send WebSocket update: " + e.getMessage());
        }
        return updatedTask;
    }


    public void deleteTask(String id) {
        Task taskToDelete = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
        taskRepository.delete(taskToDelete);
        webSocketService.sendTaskUpdate(taskToDelete);
    }

    public List<Task> getAllTasks(){
        return taskRepository.findAll();
    }
}
