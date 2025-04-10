import React from "react";
import WeekProgressWidget from "../components/WeekProgressWidget.tsx";
import StrikeWidget from "../components/StrikeWidget.tsx";
import TargetWidget from "../components/TargetWidget.tsx";
import "./Statistic.css";

function Statistic() {
  return (

      <div className="statisticPageContainer">
        <WeekProgressWidget />
        <div className="secondContainer">
          <StrikeWidget />
          <TargetWidget />
        </div>
      </div>

  );
}

export default Statistic;
