import React, { useState, useEffect } from "react";
import WeekProgressWidget from "../components/WeekProgressWidget.tsx";
import StrikeWidget from "../components/StrikeWidget.tsx";
import TargetWidget from "../components/TargetWidget.tsx";
import { TList } from "../types/list.types";
import { getListFromLocalStorage } from "../utils/list.utils.ts";
import "./Statistic.css";

function Statistic() {
  const today: Date = new Date();
  const [todayDate] = today.toISOString().split("T");
  const [list, setList] = useState<TList[]>([]);

  useEffect(() => {
    getListFromLocalStorage().then((list) => setList(list));
  }, []);

  return (
    <div className="statisticPageContainer">
      <WeekProgressWidget list={list} today={today} />
      <div className="secondContainer">
        <StrikeWidget list={list} todayDate={todayDate} />
        <TargetWidget list={list} today={today}/>
      </div>
    </div>
  );
}

export default Statistic;
