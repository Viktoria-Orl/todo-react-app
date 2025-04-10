import React from "react";
import { useList } from "../context/ListContext.tsx";
import { TList } from "../types/list.types.ts";
import "./WeekProgressWidget.css";

function WeekProgressWidget() {
  const today = new Date();
  const { list } = useList();

  function getFormatedDate(days: number): string {
    const date: Date = new Date(today.getTime() - days * (24 * 60 * 60 * 1000));
    const formatedDate: string = date.toLocaleDateString(undefined, {
      month: "numeric",
      day: "numeric",
    });
    return formatedDate;
  }

  function isCompletedCell(listItem: TList, days: number): string {
    const [date] = new Date(today.getTime() - days * (24 * 60 * 60 * 1000))
      .toISOString()
      .split("T");
    return listItem.completedDates.includes(date) ? "✅" : "❌";
  }

  return (
    <div className="weekProgressWidget">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>{getFormatedDate(6)}</th>
            <th>{getFormatedDate(5)}</th>
            <th>{getFormatedDate(4)}</th>
            <th>{getFormatedDate(3)}</th>
            <th>{getFormatedDate(2)}</th>
            <th>{getFormatedDate(1)}</th>
            <th>{getFormatedDate(0)}</th>
          </tr>
        </thead>
        <tbody>
          {list
            .filter((listItem) => !listItem.isDeleted)
            .map((listItem) => {
              return (
                <tr key={listItem.id}>
                  <td>{listItem.taskName}</td>
                  <td>{isCompletedCell(listItem, 6)}</td>
                  <td>{isCompletedCell(listItem, 5)}</td>
                  <td>{isCompletedCell(listItem, 4)}</td>
                  <td>{isCompletedCell(listItem, 3)}</td>
                  <td>{isCompletedCell(listItem, 2)}</td>
                  <td>{isCompletedCell(listItem, 1)}</td>
                  <td>{isCompletedCell(listItem, 0)}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default WeekProgressWidget;