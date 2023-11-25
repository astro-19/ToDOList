import React from "react";
import { toast } from "react-toastify";
const AddTodo = () => {
  let localTasks = JSON.parse(localStorage.getItem("task"));
  console.log(localTasks.length);
  const [task, setTask] = React.useState("");
  const [duedate, setDuedate] = React.useState("");
  const [taskValues, setTaskValues] = React.useState([]);

  const Message = (type, message) => {
    if (type === "success") {
      toast.success(message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (type === "error") {
      toast.error(message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (localTasks.length > 0) {
      for (let i in localTasks) {
        console.log(i);
      }
    } else if (task !== "" && duedate !== "") {
      setTaskValues([
        ...taskValues,
        { task: task, duedate: duedate, status: false },
      ]);
      localStorage.setItem("task", JSON.stringify(taskValues));
      Message("success", "Added successfully");
    } else {
      Message("error", "Required fields");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="htmlForm-label">
              Task
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              name="task"
              aria-describedby="emailHelp"
              onChange={(e) => {
                setTask(e.target.value);
              }}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="htmlForm-label">
              Due Date
            </label>
            <input
              type="date"
              name="due_date"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => {
                setDuedate(e.target.value);
              }}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTodo;
