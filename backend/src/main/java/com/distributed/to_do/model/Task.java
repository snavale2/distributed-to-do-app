package com.distributed.to_do.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document(collection = "tasks")
public class Task {
    @Id
    private String id;
    private String taskName;
    private Boolean status;
    private Date lastModified;
    private Integer version;

}
