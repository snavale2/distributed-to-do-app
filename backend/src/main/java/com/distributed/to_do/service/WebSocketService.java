package com.distributed.to_do.service;

import com.distributed.to_do.model.Task;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class WebSocketService {

    private final SimpMessagingTemplate template;

    public WebSocketService(SimpMessagingTemplate template){
        this.template = template;
    }

    public void sendTaskUpdate(Task task){
        template.convertAndSend("/topic/tasks", task);
    }
}
