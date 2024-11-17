import React, { useState } from "react";
import Task from "../Tasks/Task.js";
import { useContext } from "react";
import taskContext from "../../Context/Tasks/taskContext.js";

const ToDoList = () => {
  const context = useContext(taskContext);
  const { addTask } = context;
  const [task, setTask] = useState({ taskName: "" });

  const handleClick = (e) => {
    e.preventDefault();
    addTask(task.taskName);
    document.getElementById("taskName").value = "";
  };

  const onChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="mb-3 mt-4 ms-4">
        <h4>Add a Task</h4>
        <form className="row g-3 my-2">
          <div className="col-auto">
            <label htmlFor="taskName">Task Name</label>
          </div>
          <div className="col-auto">
            <input
              type="text"
              className="form-control"
              id="taskName"
              name="taskName"
              placeholder="Enter Task Name"
              onChange={onChange}
            />
          </div>
          <div className="col-auto">
            <button
              type="submit"
              className="btn btn-primary mb-3"
              onClick={handleClick}
            >
              Add Task
            </button>
          </div>
        </form>
        <Task />
      </div>
    </div>
  );
};

export default ToDoList;
