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
      console.error("Error while fetching tasks:", error);
    }
  };

  //Add a task
  const addTask = async (taskName) => {
    try {
      const response = await fetch(`${url}/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskName, status: false, version: 1 }),
      });

      if (!response.ok) {
        throw new Error(`Failed to add tasks: ${response.statusText}`);
      }

      const json = await response.json();
      setTasks(task.concat(json));
    } catch (error) {
      console.error("Error while adding tasks:", error);
    }
  };

  //Update a task
  const editTask = async (taskId, taskName) => {
    try {
      const response = await fetch(`${url}/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskName }),
      });

      if (!response.ok) {
        throw new Error(`Failed to edit tasks: ${response.statusText}`);
      }

      const json = await response.json();

      for (let i = 0; i < task.length(); i++) {
        const element = task[i];
        if (element.taskId === taskId) {
          element.taskName = taskName;
        }
      }
    } catch (error) {
      console.error("Error while editing tasks:", error);
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

  //Mark task as complete
  const completeTask = async (taskId, status) => {
    try {
      const response = await fetch(`${url}/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status : true }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to update the status of the task, ${response.statusText}`
        );
      }

      const json = await response.json();

      for (let i = 0; i < task.length(); i++) {
        const element = task[i];
        if (element.taskId === taskId) element.status = status;
      }
    } catch (error) {
      console.error("Error while updating the status of the task:- ", error);
    }
  };

  return (
    <noteContext.Provider
      value={{ task, addTask, editTask, deleteTask, fetchTask, completeTask }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default TaskState;
