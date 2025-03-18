import { FormEvent, useEffect, useState } from "react";
import "tailwindcss";
import Todo from "./Todo";
import Submit from "./Submit";

export interface Todo {
  text: string;
  color: string;
  done: boolean;
}

export default function App() {
  const [text, setText] = useState("");
  const [todos, setTodo] = useState<Todo[]>(loadTodo());

  async function fetchData() {
    const res = await fetch("http://localhost:3000/todos");
    const data = await res.json();
    console.log(data);
  }

  fetchData();

  useEffect(() => {
    saveTodo();
  }, [todos]);

  function updateList(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (text == "") return;
    setTodo([...todos, { text, color: "black", done: false }]);
    setText("");
  }

  function updateStatus(index: number) {
    setTodo(
      todos.map((currTodo, j) => {
        if (j == index) {
          if (currTodo.color == "black") {
            currTodo.color = "#A277C3";
            currTodo.done = true;
          } else {
            currTodo.color = "black";
            currTodo.done = false;
          }
        }
        return currTodo;
      })
    );
  }

  function deleteTodo(index: number) {
    setTodo(
      todos.filter((_, j) => {
        if (j == index) {
          return false;
        }
        return true;
      })
    );
  }

  function saveTodo() {
    localStorage.setItem("key", JSON.stringify(todos));
  }

  function loadTodo() {
    return JSON.parse(localStorage.getItem("key") ?? "[]");
  }

  return (
    <>
      <header className=" bg-primary h-1/10">
        <h2 className="text-2xl text-white font-bold absolute top-8 left-5">
          My To-Do List!
        </h2>
      </header>
      <div className="h-9/10 max-h-screen overflow-hidden" style={{ maxWidth: "600px", margin: "20px" }}>
        <div className="h-fit max-h-8/10 overflow-y-auto overscroll-auto ">
          <ul>
            {todos.map((todo, index) => (
              <Todo
                todo={todo}
                index={index}
                updateStatus={updateStatus}
                deleteTodo={deleteTodo}
              />
            ))}
          </ul>
        </div>
        <form className="mt-3 flex" onSubmit={updateList}>
          <Submit text={text} setText={setText} />
        </form>
      </div>
    </>
  );
}
