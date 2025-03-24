import React from "react";
import { ListProvider } from "../context/ListContext.tsx";
import { monthName } from "../constants/date.constants.ts";
import TaskList from "../components/TaskList.tsx";
import TaskAdding from "../components/TaskAdding.tsx";
import ProgressRingWidget from "../components/ProgressRingWidget.tsx";
import "./Homepage.css";



function HomepageContent() {
  const today = new Date();

  return (
    <>
      <h1 className="dateHeading">
        Plan for {today.getDate()} {monthName[today.getMonth()]}
      </h1>
      <div className="container">
        <div className="tasksContainer">
          <TaskList />
        </div>
        <div className="rightContainer">
          <TaskAdding />
          <ProgressRingWidget  />
        </div>
      </div>
    </>
  );
}

export default function Homepage() {
  return (
    <ListProvider>
      <HomepageContent />
    </ListProvider>
  )
};
