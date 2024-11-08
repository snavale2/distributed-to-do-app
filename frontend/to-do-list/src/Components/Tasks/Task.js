import React, { useContext } from "react";
import taskContext from "../../Context/Tasks/taskContext.js";
import TaskItems from "../Tasks/TaskItems.js";

const Task = () => {
  const context = useContext(taskContext);
  const { task, setTasks } = context;
  return (
    <>
      <h4>Your Tasks</h4>
      <div className="row">
        {task.map((val) => {
          return <TaskItems key={val.taskId} task={val} />;
        })}
      </div>
    </>
  );
};

export default Task;
