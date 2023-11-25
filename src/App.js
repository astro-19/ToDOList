import AddTodo from "./Components/AddTodo";
import ListOfTasks from "./Components/ListOfTasks";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const showListOfTasks = () => {
    if (window.location.pathname === "/list-of-tasks") {
      return <ListOfTasks />;
    }
  };
  const AddTodoPath = () => {
    if (window.location.pathname === "/") {
      return <AddTodo />;
    }
  };
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
      {/* <AddTodo /> */}
      {AddTodoPath()}
      {showListOfTasks()}
      <ToastContainer />
    </div>
  );
}

export default App;
