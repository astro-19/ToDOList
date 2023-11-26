import React, { useEffect } from "react";
import { toast } from "react-toastify";
import {useParams} from "react-router-dom"
const AddTodo = (props) => {
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
      if(props.initialTask.length > 0) {
        for (let i in props.initialTask) {
          if(props.initialTask[i].id === props.taskValues[i].id){
            props.taskValues[i].task = props.task;
            props.taskValues[i].duedate = props.duedate;
            Message("success", "Updated successfully");
            // setTaskValues(() => [
            //   ...taskValues,
            //   {id: initialTask[i].id, task: task, duedate: duedate, status: false }
            // ]);
          }
        }
        // Message("success", "Updated successfully");
      }
    } else if (props.task !== "" && props.duedate !== "" && action !== "edit") {
      console.log("hello")
      let id;
      if(props.taskValues.length === 0){
        id=0
      }else {
        id = props.taskValues[props.taskValues.length-1].id+ 1
      }
      props.setTaskValues(() => [
        ...props.taskValues,
        {id: id, task: props.task, duedate: props.duedate, status: false }
      ]);
      props.setTask("");
      props.setDuedate("");
      Message("success", "Added successfully");
    } else {
      Message("error", "Required fields");
    }
  };

useEffect(()=>{
  localStorage.setItem("task", JSON.stringify(props.taskValues));
}, [props.taskValues])

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
              defaultValue={props.task}            
              onChange={(e) => {
                props.setTask(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="htmlForm-label">
              Due Date
            </label>
            <input
              type="date"
              name="due_date"
              className="form-control"
              defaultValue={props.duedate}
              onChange={(e) => {
                props.setDuedate(e.target.value);
              }}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            {action === "edit" ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTodo;
