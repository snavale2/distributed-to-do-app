import React, { useContext, useEffect, useRef, useState } from "react";
import { Modal } from "bootstrap";
import taskContext from "../../Context/Tasks/taskContext.js";
import TaskItems from "../Tasks/TaskItems.js";

const Task = () => {
  const context = useContext(taskContext);
  const { task, fetchTask, editTask } = context;

  useEffect(() => {
    fetchTask();
    //eslint-disable-next-line
  }, []);

  const [eTask, setTask] = useState({id: "", etaskName: "" });

  const ref = useRef(null);

  const refClose = useRef(null);

  const updateTask = (currentTask) => {
    ref.current = new Modal(document.getElementById("exampleModal"));
    ref.current.show();
    setTask({id: currentTask.id, etaskName: currentTask.taskName});
  };

  const handleClick = (e) => {
    console.log(eTask);
    refClose.current = new Modal(document.getElementById("exampleModal"));
    editTask(eTask.id, eTask.etaskName);
    ref.current.hide();
  };

  const onChange = (e) => {
    setTask({ ...eTask, [e.target.name]: e.target.value });
  };

  return (
    <>
      <button
        type="button"
        ref={ref}
        className="btn btn-primary"
        style={{ display: "none" }}
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
            </div>
            <div className="modal-body">
              <form className="row g-3 my-2">
                <div className="col-auto">
                  <label htmlFor="taskName">Task Name</label>
                </div>
                <div className="col-auto">
                  <input
                    type="text"
                    className="form-control"
                    id="etaskName"
                    name="etaskName"
                    placeholder="Enter Task Name"
                    value={eTask.etaskName}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => ref.current.hide()}
              >
                Close
              </button>
              <button ref={refClose} type="button" className="btn btn-primary" onClick={handleClick}>
                Update Task
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
