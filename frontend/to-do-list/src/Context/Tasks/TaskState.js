import { useState, useEffect } from "react";
import io from 'socket.io-client';
import noteContext from "./taskContext.js";

const TaskState = (props) => {
  const url = "http://localhost:8080";
  const [task, setTasks] = useState([]);
  const [socket, setSocket] = useState(null);

  // Establish WebSocket connection
  useEffect(() => {
    // Create socket connection
    const newSocket = io(url);
    setSocket(newSocket);

    // Listen for task updates via WebSocket
    newSocket.on('task-updated', (data) => {
      switch (data.type) {
        case 'ADD':
          setTasks(prevTasks => {
            // Prevent duplicate tasks
            const isDuplicate = prevTasks.some(t => t._id === data.task._id);
            return isDuplicate ? prevTasks : [...prevTasks, data.task];
          });
          break;
        case 'UPDATE':
          setTasks(prevTasks => 
            prevTasks.map(t => 
              t._id === data.task._id ? data.task : t
            )
          );
          break;
        case 'DELETE':
          setTasks(prevTasks => 
            prevTasks.filter(t => t._id !== data.id)
          );
          break;
      }
    });

    // Cleanup socket connection on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

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
        body: JSON.stringify({ 
          taskName, 
          status: false, 
          version: 1 
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to add tasks: ${response.statusText}`);
      }

      const json = await response.json();
      // We don't need to manually update state here 
      // as the WebSocket listener will handle it
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
        body: JSON.stringify({ 
          taskName, 
          status: false, 
          version: 1 
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to edit tasks: ${response.statusText}`);
      }

      // We don't need to manually update state 
      // as the WebSocket listener will handle it
    } catch (error) {
      console.error("Error while editing tasks:", error);
    }
  };

  //Delete a task
  const deleteTask = async (taskId) => {
    try {
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

      // We don't need to manually update state 
      // as the WebSocket listener will handle it
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
        body: JSON.stringify({ 
          status: true, 
          taskName: taskName, 
          version: version + 1 
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to update the status of the task, ${response.statusText}`
        );
      }

      // We don't need to manually update state 
      // as the WebSocket listener will handle it
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