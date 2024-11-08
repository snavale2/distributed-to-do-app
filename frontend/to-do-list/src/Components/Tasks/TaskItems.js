import React from "react";

const TaskItems = (props) => {
  const { task } = props;
  return (
    <div className="col-md-2">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-item-center">
            <h6 className="card-text">{task.taskName}</h6>
            <i className="fa-regular fa-pen-to-square mx-2"></i>
            <i className="fa-solid fa-trash mx-2"></i>
          </div>
          <p className="card-text">{task.status}</p>
        </div>
      </div>
    </div>
  );
};

export default TaskItems;
