import React from "react";
import classnames from "classnames";
import { ReactComponent as DeleteIcon } from "../icons/deleteButton.svg";
import { useList } from "../context/ListContext.tsx";
import "./TaskList.css";

function TaskList() {
  const { list, todayDate, deleteTask, checkTask } = useList();

  return (
    <ul>
      {list
        .filter((listItem) => !listItem.isDeleted)
        .map((listItem) => {
          const isCompletedToday = listItem.completedDates.includes(todayDate);

          return (
            <li key={listItem.id} className="taskItem">
              <label
                className={classnames(
                  "taskName",
                  isCompletedToday ? "completed" : ""
                )}
              >
                <input
                  type="checkbox"
                  checked={isCompletedToday}
                  className={classnames(
                    "checkboxInput",
                    isCompletedToday ? "checked" : ""
                  )}
                  onChange={() => {checkTask(listItem.id)}}
                />
                {listItem.taskName}
              </label>
              <button
                className="buttonDeleteTask"
                onClick={() => deleteTask(listItem.id)}
              >
                <DeleteIcon />
              </button>
            </li>
          );
        })}
    </ul>
  );
}

export default TaskList;
