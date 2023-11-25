import React from "react";

const Edit = (props) => {
  alert(props);
  //   let localTasks = localStorage.getItem("task");
  const [task, setTask] = React.useState("");
  const [duedate, setDuedate] = React.useState("");

  const [taskValues, setTaskValues] = React.useState([]);
  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setTaskValues({ ...taskValues, [name]: value });
  //   };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTaskValues([
      ...taskValues,
      { task: task, duedate: duedate, status: false },
    ]);
    localStorage.setItem("task", JSON.stringify(taskValues));
  };

  return (
    <form>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="htmlForm-label">
          Task
        </label>
        <input
          type="text"
          className="htmlForm-control"
          id="exampleInputEmail1"
          name="task"
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
          className="htmlForm-control"
          id="exampleInputPassword1"
          onChange={(e) => {
            setDuedate(e.target.value);
          }}
        />
      </div>
      <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
};

export default Edit;
