import "./App.css";
import Alert from "./Components/Alert/Alert.js";
import "./Components/Navbar/Navbar.js";
import Navbar from "./Components/Navbar/Navbar.js";
import ToDoList from "./Components/ToDoList/ToDoList.js";
import TaskState from "./Context/Tasks/TaskState.js";

function App() {
  return (
    <>
      <TaskState>
        <Navbar />
        <Alert message= "This is an alert message" />
        <ToDoList />
      </TaskState>
    </>
  );
}

export default App;
