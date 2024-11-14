import { useState } from "react";
import noteContext from "./taskContext.js";

const TaskState = (props) => {
  // const url = "http://localhost:3000/";
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
    },
  ];

  const [task, setTasks] = useState(todoTask);

  //Fetch all the tasks
  const fetchTask = async () => {
    // const response = fetch(`${url}/api/task/fetchTask`, {
    //   method:"GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   }
    // });

    // const json = await response.json();
    // setTasks(json);

  }

  //Add a task
  const addTask = async (taskName) => {
    // const response = await fetch(`${url}/api/task/addTask`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ taskName }),
    // });

    // const json = response.json();

    const newTask = {
      taskId: "61",
      taskName: taskName,
      status: "Completed",
      lastModified: "2024-12-16T14:00:00Z",
      version: 4,
      userId: "user4569",
    };

    setTasks(task.concat(newTask));
  };

  //Update a task
  const editTask = async (taskId, taskName) => {
    // const response = await fetch(`${url}/api/task/editTask/${taskId}`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ taskName }),
    // });

    // const json = response.json();

    for(let i = 0; i < task.length(); i++)
    {
      const element = task[i];
      if(element.taskId === taskId)
      {
        element.taskName = taskName;
      }
    }
  };

  //Delete a task
  const deleteTask = (taskId) => {
    const deleteTask = task.filter((val) => {
      return val.taskId !== taskId;
    });
    setTasks(deleteTask);
  };

  return (
    <noteContext.Provider value={{ task, addTask, deleteTask, fetchTask }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default TaskState;
