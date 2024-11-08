import React from "react";
import Task from "../Tasks/Task.js";

const ToDoList = () => {
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
              placeholder="Enter Task Name"
            />
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary mb-3">
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
