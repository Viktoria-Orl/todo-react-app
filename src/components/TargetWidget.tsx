import React from "react";
import { useList } from "../context/ListContext.tsx";
import "./TargetWidget.css";

export default function TargetWidget() {
  const today = new Date();
  const { list } = useList();
  const activeTaskArray = list.filter((listItem) => !listItem.isDeleted); // массив активных (неудаленных) задач

  return (
    <div className="targetWidgetContainer">
      {activeTaskArray.map((listItem) => {
        //для каждой задачи надо посчитать completeDaysCount
        let completeDaysCount = 0;
        // цикл на проверку 7 последних дней
        for (let i = 0; i <= 6; i++) {
          const day = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
          const [date] = day.toISOString().split("T");
          if (listItem.completedDates.includes(date)) {
            completeDaysCount += 1;
          }
        }
        const achievedTarger = completeDaysCount === 7; // achievedTarger - если все 7 дней задача выполнена то true

        return (
          <div key={listItem.id} className="targetWidgetTaskContainer">
            <div
              className={
                achievedTarger
                  ? "targetWidgetPercent__achieved"
                  : "targetWidgetPercent"
              }
            >
              {Math.ceil((completeDaysCount / 7) * 100)}%
            </div>
            <div className="targetWidgetTaskInfo">
              <h3 className="targetWidgetTaskName">{listItem.taskName}</h3>
              <p className="targetWidgetTaskText">
                {completeDaysCount} from 7 days target
              </p>
            </div>
            <div
              className={
                achievedTarger
                  ? "targetWidgetAchievedStatus"
                  : "targetWidgetUnachievedStatus"
              }
            >
              {achievedTarger ? "Achieved" : "Unachieved"}
            </div>
          </div>
        );
      })}
    </div>
  );
}
