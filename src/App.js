import AddTodo from "./Components/AddTodo";
import ListOfTasks from "./Components/ListOfTasks";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, useLocation } from "react-router-dom";
import React from "react";

function App() {  const location = useLocation()
  let data = location?.state?.data;
  
  let initialTask;
  if(localStorage.getItem("task") === null){
    initialTask = []
  } else {
    initialTask = JSON.parse(localStorage.getItem("task"));
  }
  const [task, setTask] = React.useState(data?.task);
  const [duedate, setDuedate] = React.useState(data?.duedate);
  const [taskValues, setTaskValues] = React.useState(initialTask);
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary mb-4">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Todo List
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Add a task
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/list-of-tasks"
                >
                  List of task
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<AddTodo initialTask={initialTask} task={task} setTask={setTask} duedate={duedate} setDuedate={setDuedate} taskValues={taskValues} setTaskValues={setTaskValues}/>}>
        </Route>
        <Route path="/list-of-tasks" element={<ListOfTasks taskValues={taskValues} setTaskValues={setTaskValues}/>}>
        </Route>
        <Route path="/edit-tasks/:action" element={<AddTodo initialTask={initialTask} task={task} setTask={setTask} duedate={duedate} setDuedate={setDuedate} taskValues={taskValues} setTaskValues={setTaskValues}/>}>
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
