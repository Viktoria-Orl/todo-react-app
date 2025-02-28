import React from "react";
import { TList } from "../types/list.types";
import "./StrikeWidget.css"

interface StrikeWidgetProps {
  list: TList[];
  todayDate: string;
}

export default function StrikeWidget({ list, todayDate }: StrikeWidgetProps) {
  const activeTaskArray = list.filter((listItem) => !listItem.isDeleted); // массив активных (неудаленных) задач

  // массив уникальных отсортированных дат (через reduce и sort?)
  const uniqueCompletedDates: string[] = [...activeTaskArray]
    .flatMap((task) => task.completedDates)
    .reduce((acc: string[], inc: string) => {
      if (acc.includes(inc)) {
        return acc;
      } else {
        acc.push(inc);
        return acc;
      }
    }, [])
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  // пройтись по масиву uniqueCompletedDates
  // strikeDateArray - массив дат страйков
  // пройтись по массиву активных задачи и добавлять в массив если все задачи содержат  дату страйка

  const strikeDateArray: string[] = [];
  let currentStrike = 0; // текущий страйк - сколько дней подряд (включая сегодняшний) выполнены все задачи
  let longestStrike = 0; // самый длинный страйк - сколько дней подряд максимально были выполнены все задачи

  uniqueCompletedDates.forEach((date, index) => {
    if (
      activeTaskArray.every((listItem) =>
        listItem.completedDates.includes(date)
      )
    ) {
      strikeDateArray.push(date);
    }

    if (strikeDateArray.length === 1) {
      currentStrike = 1;
      longestStrike = 1;
    } else if (strikeDateArray.length > 1) {
      const prevDate = new Date(uniqueCompletedDates[index - 1]);
      const currDate = new Date(date);

      if (
        (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24) ===
        1
      ) {
        currentStrike++;
        longestStrike = Math.max(longestStrike, currentStrike);
      } else {
        currentStrike = 1;
      }
    }
  });

  if (!strikeDateArray.includes(todayDate)) {
    currentStrike = 0;
  }

  return (
    <div className="strikeWidget">
      <h2 className="currentStrikeHeader">
        {currentStrike} {currentStrike === 1 ? "Day" : "Days"}
      </h2>
      <p className="currentStrikeText">Your current strike</p>
      <h3 className="longestStrikeHeader">{longestStrike} {longestStrike === 1 ? "Day" : "Days"}</h3>
      <p className="longestStrikeText">Your longest strike</p>
    </div>
  );
}
