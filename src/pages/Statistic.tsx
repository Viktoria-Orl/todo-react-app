import React from "react";
import { ListProvider } from "../context/ListContext.tsx";
import WeekProgressWidget from "../components/WeekProgressWidget.tsx";
import StrikeWidget from "../components/StrikeWidget.tsx";
import TargetWidget from "../components/TargetWidget.tsx";
import "./Statistic.css";

function Statistic() {
  return (
    <ListProvider>
      <div className="statisticPageContainer">
        <WeekProgressWidget />
        <div className="secondContainer">
          <StrikeWidget />
          <TargetWidget />
        </div>
      </div>
    </ListProvider>
  );
}

export default Statistic;
