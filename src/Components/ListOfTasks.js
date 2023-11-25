import React from "react";
import Edit from "./Edit";

const ListOfTasks = () => {
  let localTasks = JSON?.parse(localStorage.getItem("task"));

  console.log(localTasks);
  const editTask = (props) => {
    if (window.location.pathname === "/edit-tasks") {
      return <Edit props={props} />;
    }
  };

  return (
    <div className="container">
      <div className="row">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Task Name</th>
              <th scope="col">Due date</th>
              <th scope="col">Status</th>
              <th scope="col">Mark as done</th>
            </tr>
          </thead>
          {Object?.keys(localTasks)?.map((task) => {
            return (
              <tbody key={task}>
                <tr>
                  <td>{localTasks[task]?.task}</td>
                  <td>{localTasks[task]?.duedate}</td>
                  <td>{localTasks[task]?.status ? "Completed" : "Pending"}</td>
                  <td>
                    <input
                      type="checkbox"
                      value="Mark Done"
                      onChange={(e) => {
                        localTasks[task].status = e.target.checked;
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="submit"
                      value="Edit"
                      onClick={() => {
                        window.location.replace("/edit-task");
                        editTask(localTasks[task]);
                      }}
                    />
                  </td>
                  <td>
                    <input type="submit" value="Delete" />
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default ListOfTasks;
