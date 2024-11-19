import "./App.css";
import "./Components/Navbar/Navbar.js";
import Navbar from "./Components/Navbar/Navbar.js";
import ToDoList from "./Components/ToDoList/ToDoList.js";
import TaskState from "./Context/Tasks/TaskState.js";

function App() {
  return (
    <>
      <TaskState>
        <Navbar />
        <ToDoList />
      </TaskState>
    </>
  );
}

export default App;
