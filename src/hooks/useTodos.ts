import { useEffect, useState } from "react";
import { API_URL, Todo } from "../App";

export default function useTodos(){
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${API_URL}/todos`);
      const json = await res.json();
      setTodos(json);
    }
    fetchData();
  }, []);

  useEffect(() => {
    let timeout: number | undefined;
    if (error) {
      timeout = setTimeout(() => {
        setError(null)
      }, 2000)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [error])

  async function postTodo(text: string) {
    if (text === "") {
      return;
    }
    const res = await fetch(`${API_URL}/todos`, {
      method: "POST",
      body: JSON.stringify({ text }),
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      const error = await res.json();
      setError(error.messages.text[0])
      return;
    }

    const todo = await res.json();
    setTodos([...todos, todo]);
    setError(null);
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

  return {
    todos,
    postTodo,
    updateStatus,
    deleteTodo,
    error
  }
}