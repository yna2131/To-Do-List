import { MousePointerClick } from "lucide-react";

interface SubmitProps {
  text: string;
  setText: (value: string) => void;
}

export default function Submit({ text, setText }: SubmitProps) {
  return (
    <>
      <input
        className="p-2 border-2 border-primary rounded-md focus:outline-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="ml-2.5 bg-primary rounded-md p-3 pl-5 pr-5 hover:cursor-pointer flex"
        style={{
          color: "white",
        }}
      >
        <MousePointerClick />
        <span className="ml-2">Click Me!</span>
      </button>
    </>
  );
}
