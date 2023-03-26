import styles from "../styles/todo-list.module.css";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { debounce } from "lodash";
import ToDo from "./todo";

export default function ToDoList() {
  const [todos, setTodos] = useState(null);
  const [mainInput, setMainInput] = useState("");
  const [filter, setFilter] = useState();
  const didFetchRef = useRef(false);

  useEffect(() => {
    if (didFetchRef.current === false) {
      didFetchRef.current = true;
      fetchTodos();
    }
  }, []);

  async function fetchTodos(completed) {
    let path = "/todos";
    if (completed !== undefined) {
      path = `/todos?completed=${completed}`;
    }
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + path);
    const json = await res.json();
    console.log(json);
    setTodos(json);
  }

  const debouncedUpdateTodo = useMemo(() => debounce(updateTodo, 500), []); 

  function handleToDoChange(e, _id) {
    // console.log(e);
    // console.log(_id);
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const copy = [...todos];
    const idx = todos.findIndex((todo) => todo._id === _id);
    const changedToDo = {
      ...todos[idx],
      [name]: value,
    };
    copy[idx] = changedToDo;
    debouncedUpdateTodo(changedToDo);
    setTodos(copy);
  }

  async function updateTodo(todo) {
    const data = {
      name: todo.name,
      completed: todo.completed,
    };
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_URL + `/todos/${todo._id}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    console.log(res.statusText);
  }

  async function addToDo(name) {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/todos/`, {
      method: "POST",
      body: JSON.stringify({
        name: name,
        completed: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const json = await res.json();
      const copy = [...todos, json];
      setTodos(copy);
    }
  }

  async function handleDeleteToDo(_id) {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/todos/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const idx = todos.findIndex((todo) => todo._id === _id);
      const copy = [...todos];
      copy.splice(idx, 1);
      setTodos(copy);
    }
  }

  function handleMainInputChange(e) {
    setMainInput(e.target.value);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      if (mainInput.length > 0) {
        addToDo(mainInput);
        setMainInput("");
      }
    }
  }

  function handleFilterChange(value) {
    setFilter(value);
    fetchTodos(value);
  }

  return (
    <div className={styles.container}>
      <div className={styles.mainInputContainer}>
        <input
          className={styles.mainInput}
          placeholder="What needs to be done?"
          value={mainInput}
          onChange={(e) => handleMainInputChange(e)}
          onKeyDown={handleKeyDown}
        >
        </input>
      </div>
      {!todos && <div>Loading...</div>}
      {todos && (
        <div>
          {todos.map((todo) => {
            return (
              <ToDo
                key={window.crypto.randomUUID()}
                todo={todo}
                onDelete={handleDeleteToDo}
                onChange={handleToDoChange}
              />
            );
          })}
        </div>
      )}
      <div className={styles.filters}>
        <button
          className={`${styles.filterBtn} ${
            filter === undefined && styles.filterActive
          }`}
          onClick={() => handleFilterChange()}
        >
          All
        </button>
        <button
          className={`${styles.filterBtn} ${
            filter === false && styles.filterActive
          }`}
          onClick={() => handleFilterChange(false)}
        >
          Active
        </button>
        <button
          className={`${styles.filterBtn} ${
            filter === true && styles.filterActive
          }`}
          onClick={() => handleFilterChange(true)}
        >
          Completed
        </button>
      </div>
    </div>
  );
}