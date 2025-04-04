import { useEffect, useState } from "react";
import "tailwindcss";
import Todo from "./Todo";
import Submit from "./Submit";

export interface Todo {
  id: number;
  text: string;
  color: string;
  done: boolean;
}

const API_URL = "http://localhost:3000";
export default function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${API_URL}/todos`);
      const json = await res.json();
      setTodos(json);
    }
    fetchData();
  }, []);

  async function postTodo() {
    if (text === "") {
      return;
    }
    const res = await fetch(`${API_URL}/todos`, {
      method: "POST",
      body: JSON.stringify({ text }),
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) return;

    const todo = await res.json();
    setTodos([...todos, todo]);
    setText("");
  }

  async function deleteTodo(id: number) {
    const res = await fetch(`${API_URL}/todos/${id}`, { method: "DELETE" });
    if (!res.ok) return;
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  async function updateStatus(id: number, done: boolean) {
    const res = await fetch(`${API_URL}/todos/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ done }),
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) return;
    const updatedTodo = await res.json();
    setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
  }

  return (
    <>
      <header className="rleative bg-primary h-1/10">
        <h2 className="text-2xl text-white font-bold absolute top-8 left-5">
          My To-Do List!
        </h2>
      </header>
      <div className="h-full" style={{ maxWidth: "600px", margin: "20px" }}>
        <div className="h-full max-h-8/10 overflow-y-auto overscroll-none ">
          <ul>
            {todos.map((todo) => (
              <Todo
                key={todo.id}
                todo={todo}
                updateStatus={updateStatus}
                deleteTodo={deleteTodo}
              />
            ))}
          </ul>
        </div>
        <form
          className="mt-3 flex"
          onSubmit={(e) => {
            e.preventDefault();
            postTodo();
          }}
        >
          <Submit text={text} setText={setText} />
        </form>
      </div>
    </>
  );
}
