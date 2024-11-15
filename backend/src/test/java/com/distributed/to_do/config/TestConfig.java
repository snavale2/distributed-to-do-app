package com.distributed.to_do.config;

import com.distributed.to_do.model.Task;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.kafka.core.KafkaTemplate;
import static org.mockito.Mockito.mock;

@Configuration
@Profile("test")
public class TestConfig {
    @Bean
    public KafkaTemplate<String, Task> kafkaTemplate() {
        return mock(KafkaTemplate.class);
    }
}