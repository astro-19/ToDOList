
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import "./App.css"
import { Bounce, ToastContainer, toast } from "react-toastify";

function App() {
  const [todos, setTodos] = React.useState([])
  const [todo, setTodo] = React.useState("")
  const [todoEditing, setTodoEditing] = React.useState(null)
  const [editingText, setEditingText] = React.useState("")
  const [completedTodosCount, setCompletedTodosCount] = React.useState(0)

  React.useEffect(() => {
    const retrieveTodo = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(retrieveTodo);
    if (loadedTodos) {
      setTodos(loadedTodos)
    }
  }, [])

  React.useEffect(() => {
    const saveTodo = JSON.stringify(todos);
    localStorage.setItem('todos', saveTodo)

    const completeTodo = [...todos].filter((todo) => {
      if (todo.complete === true) {
        document.getElementById(todo.id).style.textDecoration = "line-through";
      }
      return todo.complete === true;
    })

    setCompletedTodosCount(completeTodo?.length)
  }, [todos])

  const toastifyMessage = (type, message) => {
    if (type === "success") {
      toast.success(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
    else if (type === "error") {
      toast.error(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });

    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo === "") {
      toastifyMessage("error", "Please enter a task")
    }
    else {
      const newTodo = {
        id: todos?.length + 1, //new Date().getTime(),
        task: todo,
        complete: false
      }

      setTodos([...todos].concat(newTodo))
      setTodo("")
      toastifyMessage("success", "Task added successfully.")
    }

  }

  const deleteTodo = (id) => {
    const updatedTodo = [...todos].filter((todo) => {
      return todo.id !== id;
    })
    setTodos(updatedTodo)
    toastifyMessage("success", "Task deleted successfully.")
  }

  const editTodo = (id) => {
    if (editingText === "") {
      toastifyMessage("error", "Please enter a task")
    }
    else {
      const updatedTodo = [...todos].map((todo) => {
        if (todo.id === id) {
          todo.task = editingText
        }
        return todo;
      })
      setTodos(updatedTodo);
      setEditingText("")
      setTodoEditing(null)
      toastifyMessage("success", `Todo edited successfully.`)
    }
  }

  const todoComplete = (id) => {
    const updatedTodo = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.complete = !todo.complete;
        toastifyMessage("success", `Task ${todo.complete ? "marked completed" : "marked incompleted"}.`)
      }
      return todo
    })
    setTodos(updatedTodo)
  }

  return (
    <div className="container p-4">
      <h2>Add Todo</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input type="text" className="form-control" onChange={(e) => setTodo(e.target.value)} value={todo} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <div className="mt-4">
        <h2>Todo List</h2>
        <div className="d-flex mt-2 mb-2">
          <h6>Task Completed: {completedTodosCount}</h6>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Mark it</th>
              <th>Task</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => {
              return <tr key={todo.id}>
                <td className="col-2" >{todo.complete ? "Completed" : "Incomplete"}</td>
                <td className="col-2"><input type="checkbox" className="form-check-input" onChange={() => todoComplete(todo.id)} checked={todo.complete} disabled={todoEditing === todo.id || todo.complete} /></td>
                <td className="col-5" id={todo.id}>{todoEditing === todo.id ? (<input type="text" className="form-control" onChange={(e) => setEditingText(e.target.value)} value={editingText} />) : (todo.task)} </td>
                <td className="col-3">{todo.complete ? "" : (todoEditing === todo.id ? <button className="btn btn-primary btn-sm" onClick={() => editTodo(todo.id)}>Submit</button> : <button className="btn btn-primary btn-sm" onClick={() => setTodoEditing(todo.id)}>Edit</button>)} <button className="btn btn-danger btn-sm" onClick={() => deleteTodo(todo.id)}>Delete</button></td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
