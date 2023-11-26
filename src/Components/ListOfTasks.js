/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons"
import {Link} from "react-router-dom"
const ListOfTasks = (props) => {
  let localTasks = JSON?.parse(localStorage.getItem("task"));
  const deleteTask = (e, task) => {
    e.preventDefault();
    props.setTaskValues(props.taskValues.filter((todo) => {
      return task !== todo
    }))
    localStorage.setItem("task", JSON.stringify(props.taskValues))
  }

  return (
    <div className="container">
      <div className="row">
        <table className="table">
          {localTasks?.length === 0 || localTasks?.length ===  undefined? "No Task Found" : <><thead>
            <tr>
              <th scope="col">Task Name</th>
              <th scope="col">Due date</th>
              <th scope="col">Status</th>
              <th scope="col">Mark as done</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          {Object?.keys(localTasks)?.map((task) => {
            return (
              <tbody key={task}>
                <tr>
                  <td>{localTasks[task]?.task}</td>
                  <td>{localTasks[task]?.duedate}</td>
                  <td>{localTasks[task]?.status ? "Completed" : "Pending"}</td>
                  <td style={{width: "130px"}}>
                    <input
                      type="checkbox"
                      value="Mark Done"
                      onChange={(e) => {
                        localTasks[task].status = e.target.checked;
                      }}
                    />
                  </td>
                  <td>
                    <Link
                      to={"/edit-tasks/edit"}
                      state={{data: localTasks[task]}}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </Link>
                  </td>
                  <td>
                    <a onClick={(e) => {deleteTask(e, localTasks[task])}}>
                      <FontAwesomeIcon icon={faTrash} />
                    </a>
                  </td>
                </tr>
              </tbody>
            );
          })}</>
        }
        </table>
      </div>
    </div>
  );
};

export default ListOfTasks;
