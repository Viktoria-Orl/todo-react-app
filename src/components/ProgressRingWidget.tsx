import React, { useCallback, useMemo } from "react";
import { TList } from "../types/list.types";
import "./ProgressRingWidget.css";

type TProgressRingWidgetProps = {
  list: TList[];
  todayDate: string;
};

const radius: number = 57;
const circumference: number = 2 * Math.PI * radius; // Окружность круга

export default function ProgressRingWidget({
  list,
  todayDate,
}: TProgressRingWidgetProps) {
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
  const progress: number = countCompletedTasks / countTasks;
  const offset: number = circumference * (1 - progress); // Смещение для текущего процента

  // -----------
  // useMemo - используется, чтобы закэшировать какое-то значение расчета

  const someHardCalculatedValue = useMemo(() => {
    return list.map((item) => item.taskName);
  }, [list]);

  // useCallback - используется, чтобы закэшировать какое-то значение функции

  const handleCheckBoxChange = useCallback(() => {
    return list.map((item) => item.taskName);
  }, [list]);

  someHardCalculatedValue.map((item) => item);
  handleCheckBoxChange().map((item) => item);

  // -----------

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
