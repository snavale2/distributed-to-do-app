import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import noteContext from "./taskContext.js";

const TaskState = (props) => {
  const url = "http://localhost:8080";
  const socket = io(url);
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
      // console.log(taskId);
      const response = await fetch(`${url}/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskName, status : false, version: 1 }),
      });

      if (!response.ok) {
        throw new Error(`Failed to edit tasks: ${response.statusText}`);
      }

      const json = await response.json();
      console.log("Edited Task", task);
      let editTasks = JSON.parse(JSON.stringify(task));

      for (let i = 0; i < editTasks.length; i++) {
        const element = editTasks[i];
        if (element.id === taskId) {
          editTasks[i].taskName = taskName;
          break;
        }
      }
      setTasks(editTasks);

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
  const completeTask = async (taskId, taskName, version) => {
    try {
      const response = await fetch(`${url}/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status : true, taskName : taskName, version : version }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to update the status of the task, ${response.statusText}`
        );
      }

      const json = await response.json();
      
      let completedTask = JSON.parse(JSON.stringify(task));

      for (let i = 0; i < completedTask.length; i++) {
        const element = completedTask[i];
        if (element.id === taskId) 
        {
          completedTask[i].status = true;
          break;
        }
      }
      console.log(completedTask);
      setTasks(completedTask);

    } catch (error) {
      console.error("Error while updating the status of the task:- ", error);
    }
  };

  // WebSocket setup
  useEffect(() => {
    fetchTask();

    // Listen for task updates
    socket.on("task-updated", (data) => {
      switch (data.type) {
        case "ADD":
          setTasks((prevTasks) => [...prevTasks, data.task]);
          break;
        case "UPDATE":
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task._id === data.task._id ? data.task : task
            )
          );
          break;
        case "DELETE":
          setTasks((prevTasks) =>
            prevTasks.filter((task) => task._id !== data.id)
          );
          break;
        default:
          console.warn("Unhandled event type:", data.type);
      }
    });

    // Cleanup WebSocket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <noteContext.Provider
      value={{ task, addTask, editTask, deleteTask, fetchTask, completeTask }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default TaskState;
