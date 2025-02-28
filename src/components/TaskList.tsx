import React from "react";
import classnames from "classnames";
import { ReactComponent as DeleteIcon } from "../icons/deleteButton.svg";
import { TList } from "../types/list.types";
import "./TaskList.css";

interface TaskListProps {
  list: TList[];
  todayDate: string;
  deleteItem: (id: number) => void;
  checkItem: (id: number) => void;
}

function TaskList({ list, todayDate, deleteItem, checkItem }: TaskListProps) {
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
                  onChange={() => {checkItem(listItem.id)}}
                />
                {listItem.taskName}
              </label>
              <button
                className="buttonDeleteTask"
                onClick={() => deleteItem(listItem.id)}
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
