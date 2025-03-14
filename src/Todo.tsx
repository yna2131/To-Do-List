import type { Todo } from "./App";

interface TodoProps {
  updateStatus: (index: number) => void;
  index: number;
  todo: Todo;
  deleteTodo: (index: number) => void;
}

export default function Todo({
  updateStatus,
  index,
  todo,
  deleteTodo,
}: TodoProps) {
  return (
    <li
      className=" border-primary border-1 rounded-md mt-2 pl-4 w-full flex justify-between items-center font-mono"
      style={{ alignItems: "center" }}
      onClick={() => updateStatus(index)}
    >
      <div className="flex grow-1 items-center max-w-full overflow-hidden">
        <input
          type="checkbox"
          checked={todo.done}
          className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded-sm focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 accent-primary"
        ></input>
        <span
          key={index}
          style={{ color: todo.color }}
          className="ml-2 mr-auto hover:cursor-default truncate "
        >
          {todo.text}
        </span>
      </div>
      <button
        className=" bg-secondary text-primary rounded-md p-2 pl-4 pr-4 m-2 hover:cursor-pointer w-fit"
        onClick={(e) => {
          e.stopPropagation();
          deleteTodo(index);
        }}
      >
        Delete
      </button>
    </li>
  );
}
