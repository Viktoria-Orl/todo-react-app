import React from "react";
import { useList } from "../context/ListContext.tsx";
import "./ProgressRingWidget.css";

const radius: number = 57;
const circumference: number = 2 * Math.PI * radius; // Окружность круга

export default function ProgressRingWidget() {
  const { list, todayDate } = useList();
  const actualTaskList = [...list].filter((listItem) => !listItem.isDeleted);

  let countTasks = actualTaskList.length;
  let countCompletedTasks = actualTaskList.reduce((acc, listItem) => {
    const isCompletedToday = listItem.completedDates.includes(todayDate); // проверка выполнения сегодня
    if (isCompletedToday) {
      // если выполнено то увеличивается
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);

  const taskWidgetHeader: string = `${countCompletedTasks} of ${countTasks} ${
    countTasks === 1 ? "task" : "tasks"
  }`;
  const progress: number =
    countTasks > 0 ? countCompletedTasks / countTasks : 0;
  const offset: number = circumference * (1 - progress); // Смещение для текущего процента

  return (
    <div className="taskWidget">
      <div className="taskWidgetProgressRing">
        <svg className="taskWidgetProgressRing__svg" width="130" height="130">
          <circle
            className="taskWidgetProgressRing__background"
            cx="65"
            cy="65"
            r={String(radius)}
            strokeWidth="16"
          />
          <circle
            className="taskWidgetProgressRing__circle"
            cx="65"
            cy="65"
            r={String(radius)}
            strokeWidth="16"
            strokeDasharray={String(circumference)}
            strokeDashoffset={String(offset)}
          />
        </svg>
        <div className="taskWidgetProgressRing__text">
          {Math.round(progress * 100) || 0}%
        </div>
      </div>
      <div className="taskWidgetText">
        <h3 className="taskWidgetHeader">{taskWidgetHeader}</h3>
        <p>completed today</p>
      </div>
    </div>
  );
}
