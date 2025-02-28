import React, { useState } from "react";
import "./TaskAdding.css";

interface TaskAddingProps {
  taskAdding: (value: string) => void;
}

function TaskAdding({ taskAdding }: TaskAddingProps) {
  const [value, setValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleClick = () => {
    taskAdding(value);
    setValue("");
  };
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleClick();
    };
  };

  return (
    <div className={"taskAdding"}>
      <input
        type="text"
        value={value}
        className="inputAddTask"
        placeholder="Add new task"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button className="buttonAddTask" onClick={handleClick}>
        Add new task
      </button>
    </div>
  );
}

/* function TaskAddingUncontrolled({ taskAdding }: TaskAddingProps) {    
  const ref = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    const value = ref.current?.value; // читаем текущее значение input

    if (value) {
      taskAdding(value);
      ref.current.value = ""; // ???
    }
  };

  return (
    <div className={"taskAdding"}>
      <input
        ref={ref}
        type="text"
        className="inputAddTask"
        placeholder="Add new task"
      />
      <button className="buttonAddTask" onClick={handleClick}>
        Add new task
      </button>
    </div>
  );
} */

export default TaskAdding;