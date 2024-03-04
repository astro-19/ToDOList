
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import "./App.css"

function App() {
  const [todos, setTodos] = React.useState([])
  const [todo, setTodo] = React.useState("")
  const [todoEditing, setTodoEditing] = React.useState(null)

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      id: new Date().getTime(),
      task: todo,
      complete: false
    }

    setTodos([...todos].concat(newTodo))
    setTodo("")
  }

  const deleteTodo = (id) => {
    const updatedTodo = [...todos].filter((todo) => {
      return todo.id !== id;
    })
    setTodos(updatedTodo)
  }

  const editTodo = () => {

  }

  const todoComplete = (id) => {
    const updatedTodo = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.complete = !todo.complete;
      }
      return todo
    })
    setTodos(updatedTodo)
  }

  return (
    <div className="container p-4">
      <h2>Todo List</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input type="text" className="form-control" onChange={(e) => setTodo(e.target.value)} value={todo} />
        </div>
        <button type="submit" className="btn btn-primary">Add</button>
      </form>
      <div className="mt-4">
        <table className="table">
          <thead>
            <tr>
              <th>Status</th>
              <th></th>
              <th scope="col">Todo Label</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => {
              return <tr key={todo.id}>
                <td className="col-2">{todo.complete ? "Completed" : "Incomplete"}</td>
                <td className="col-1"><input type="checkbox" className="form-check-input" onChange={() => todoComplete(todo.id)} checked={todo.complete} /></td>
                <td className="col-5">{todo.task}</td>
                <td className="col-2"><button className="btn btn-primary btn-sm" onClick={editTodo}>Edit</button></td>
                <td className="col-2"><button className="btn btn-danger btn-sm" onClick={() => deleteTodo(todo.id)}>Delete</button></td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
