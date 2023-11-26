import React from "react";
import { toast } from "react-toastify";
import {useParams, useLocation} from "react-router-dom"
const AddTodo = () => {
  const location = useLocation()
  let data = location?.state?.data;
  let localTasks = JSON.parse(localStorage.getItem("task"));
  const [task, setTask] = React.useState("");
  const [duedate, setDuedate] = React.useState("");
  const [taskValues, setTaskValues] = React.useState([]);
  const {action} = useParams();

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
    if (action === "edit") {
      if(localTasks?.length > 0){
        for (let i in localTasks) {
          console.log(i);
        }
      }
    } else if (task !== "" && duedate !== "" && action !== "edit") {
      setTaskValues(() => [
        ...taskValues,
        { task: task, duedate: duedate, status: false }
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
              defaultValue={action === "edit" ? data.task : ""}
              aria-describedby="emailHelp"
              onChange={(e) => {
                setTask(e.target.value);
              }}
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
              defaultValue={action === "edit" ? data.duedate : ""}
              id="exampleInputPassword1"
              onChange={(e) => {
                setDuedate(e.target.value);
              }}
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
