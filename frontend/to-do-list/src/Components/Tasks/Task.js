import React, { useContext, useEffect, useRef } from "react";
import taskContext from "../../Context/Tasks/taskContext.js";
import TaskItems from "../Tasks/TaskItems.js";

const Task = () => {
  const context = useContext(taskContext);
  const { task, fetchTask } = context;

  useEffect(() => {
    fetchTask();
  }, []);

  const ref = useRef(null);

  const updateTask = (task) => {
    ref.current.click();
  };

  return (
    <>
      <button
        type="button"
        ref={ref}
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Launch modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update Task
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <h4>Pending Tasks</h4>
      <div className="row">
        {task.filter((val) => val.status === false).length === 0 ? (
          <p>No pending tasks</p>
        ) : (
          task
            .filter((val) => val.status === false)
            .map((val) => (
              <TaskItems key={val.id} task={val} update={updateTask} />
            ))
        )}
      </div>

      <h4>Completed Tasks</h4>
      <div className="row">
        {task.filter((val) => val.status === true).length === 0 ? (
          <p>No completed tasks</p>
        ) : (
          task
            .filter((val) => val.status === true)
            .map((val) => (
              <TaskItems key={val.id} task={val} update={updateTask} />
            ))
        )}
      </div>
    </>
  );
};

export default Task;
