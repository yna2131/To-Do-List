import { useState } from "react";
import "tailwindcss";
import Todo from "./Todo";
import Submit from "./Submit";
import useTodos from "./hooks/useTodos";

export interface Todo {
  id: number;
  text: string;
  color: string;
  done: boolean;
}

export const API_URL = "http://localhost:3000";
export default function App() {
  const [text, setText] = useState("");
  const {todos, updateStatus, error, postTodo, deleteTodo} = useTodos();

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
        <div className="flex flex-row gap-x-2 items-center justify-start">
        <form
          className="mt-3 flex"
          onSubmit={(e) => {
            e.preventDefault();
            postTodo(text);
            setText("");
          }}
        >
          <Submit text={text} setText={setText} />
        </form>
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
      </div>
    </>
  );
}
