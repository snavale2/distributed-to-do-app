import { useState } from "react";
import noteContext from "./taskContext.js";

const TaskState = (props) => {
  const todoTask = [
    {
      taskId: "123",
      taskName: "Buy groceries",
      status: "pending",
      lastModified: "2024-10-16T14:00:00Z",
      version: 3,
      userId: "user123",
    },
    {
      taskId: "456",
      taskName: "Buy Medicines",
      status: "Completed",
      lastModified: "2024-11-16T14:00:00Z",
      version: 4,
      userId: "user456",
    },
    {
      taskId: "4",
      taskName: "Buy Medicines",
      status: "Completed",
      lastModified: "2024-11-16T14:00:00Z",
      version: 4,
      userId: "user456",
    },
    {
      taskId: "46",
      taskName: "Buy Medicines",
      status: "Completed",
      lastModified: "2024-11-16T14:00:00Z",
      version: 4,
      userId: "user456",
    },
    {
      taskId: "56",
      taskName: "Buy Medicines",
      status: "Completed",
      lastModified: "2024-11-16T14:00:00Z",
      version: 4,
      userId: "user456",
    },
    {
        taskId: "6",
        taskName: "Buy Medicines",
        status: "Completed",
        lastModified: "2024-11-16T14:00:00Z",
        version: 4,
        userId: "user456",
      }
  ];

  const [task, setTasks] = useState(todoTask);
  return (
    <noteContext.Provider value={{ task, setTasks }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default TaskState;
