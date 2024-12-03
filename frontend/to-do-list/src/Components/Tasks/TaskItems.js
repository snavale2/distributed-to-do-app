import React, { useContext } from "react";
import taskContext from "../../Context/Tasks/taskContext.js";

const TaskItems = (props) => {
  const context = useContext(taskContext);
  const { deleteTask, completeTask } = context;
  const { task, update } = props;

  return (
    <div className="col-md-2">
      {task.status === false ? (
        <div className="card my-3">
          <div className="card-body">
            <div className="d-flex align-item-center">
              <span
                className="card-text"
                style={{ fontSize: "12px", fontWeight: "bold" }}
              >
                {task.taskName}
              </span>
              <i className="fa-regular fa-pen-to-square mx-2" onClick={() => {update(task)}}></i>
              <i className="fa-solid fa-check" onClick={() => {
                completeTask(task._id, task.taskName, task.version);
              }}></i>
              <i
                className="fa-solid fa-trash mx-2"
                onClick={() => {
                  deleteTask(task._id);
                }}
              ></i>
            </div>
          </div>
        </div>
      ) : (
        <div className="card my-3">
          <div className="card-body">
            <div className="d-flex align-item-center">
              <span
                className="card-text"
                style={{ fontSize: "12px", fontWeight: "bold" }}
              >
                {task.taskName}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItems;
