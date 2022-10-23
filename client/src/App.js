import { useEffect, useState } from "react";
import axios from "axios";


import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function submit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:3001/add", {
        name: newTask,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function remove(todos) {
    setData(data.filter((a) => a.name !== todos.name));
    axios
      .delete(`http://localhost:3001/delete/${todos.name}`, {
        data: todos.name,
      })
      .then((res) => {
        console.log(res);
      });
  }

  return (
    <div className="app">
      <div className="app__container">
        <h1 className="app__header">To-Do List</h1>
        <form className="app__form" onSubmit={(e) => submit(e)}>
          <input
            className="app__form-input"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            type="text"
            placeholder="Add Your Todo Here"
          />
          <button className="btn" onClick={() => setData([...data, { name: newTask }])}>
            ADD</button>
        </form>

        <ul className="app__list">
          {data.map((todos) => {
            return (
              <>
                <li className="app__list-item">{todos.name}
                <button 
                  className="btn"
                  onClick={() => {
                    remove(todos);
                  }}
                >
                  DEL
                </button>
                </li>
              </>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
