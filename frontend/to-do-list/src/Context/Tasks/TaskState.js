import { useState } from "react";
import noteContext from "./taskContext.js";

const TaskState = (props) => {
  const url = "http://localhost:8080";

  const [task, setTasks] = useState([]);

  //Fetch all the tasks
  const fetchTask = async () => {
    try {
      const response = await fetch(`${url}/api/tasks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch tasks: ${response.statusText}`);
      }

      const json = await response.json();
      console.log(json);
      setTasks(json);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  //Add a task
  const addTask = async (taskName) => {
    const response = await fetch(`${url}/api/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ taskName, status: false, version: 1 }),
    });

    const json = await response.json();

    setTasks(task.concat(json));
  };

  //Update a task
  const editTask = async (taskId, taskName) => {
    const response = await fetch(`${url}/api/tasks/${taskId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ taskName }),
    });

    const json = await response.json();

    for (let i = 0; i < task.length(); i++) {
      const element = task[i];
      if (element.taskId === taskId) {
        element.taskName = taskName;
      }
    }
  };

  //Delete a task
  const deleteTask = async (taskId) => {
    try {
      //API Call
      const response = await fetch(`${url}/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if the response is successful (204 No Content for delete)
      if (!response.ok) {
        throw new Error(`Failed to delete task: ${response.statusText}`);
      }

      const deleteTask = task.filter((val) => {
        return val.id !== taskId;
      });
      setTasks(deleteTask);
    } catch (error) {
      console.error("Error while deleting the task: - ", error);
    }
  };

  return (
    <noteContext.Provider
      value={{ task, addTask, editTask, deleteTask, fetchTask }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default TaskState;
