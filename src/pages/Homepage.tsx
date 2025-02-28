import React, { useState, useEffect } from "react";
import { monthName } from "../constants/date.constants.ts";
import {
  getListFromLocalStorage,
  setListToLocalStorage,
} from "../utils/list.utils.ts";
import { TList } from "../types/list.types.ts";
import TaskList from "../components/TaskList.tsx";
import TaskAdding from "../components/TaskAdding.tsx";
import ProgressRingWidget from "../components/ProgressRingWidget.tsx";
import "./Homepage.css";

function Homepage() {
  const today: Date = new Date();
  const [ todayDate ] = today.toISOString().split("T");

  const [list, setList] = useState<TList[]>([]);

  useEffect(() => {
    getListFromLocalStorage().then((list) => setList(list));
  }, []);

  // useEffect(() => {
  //   setListToLocalStorage(updatedList);
  // }, [list]);

  //localStorage.setItem('list', '[{"id":1,"taskName":"Зарядка","completedDates":["2025-02-11","2025-02-12"]},{"id":2,"taskName":"Занятия","completedDates":["2025-02-10","2025-02-11","2025-02-21"]},{"id":3,"taskName":"Английский","completedDates":["2025-02-11","2025-02-12","2025-02-13"]},{"id":4,"taskName":"Спорт","completedDates":["2025-02-11","2025-02-12","2025-02-13"],"isDeleted":true}]')

  function deleteItem(id: number) {
    setList((prevList) => {
      const updatedList = prevList.map((task) => {
        if (task.id === id) {
          return { ...task, isDeleted: true };
        } else {
          return task;
        }
      });

      setListToLocalStorage(updatedList).then(() =>
        console.log("LocalStorage updated!")
      );

      return updatedList;
    });
  }

  function taskAdding(value: string) {
    const newTaskName = value.trim();

    if (!newTaskName) {
      return alert("Empty task!");
    }

    const existTaskIndex = list.findIndex(
      (task) => task.taskName.toLowerCase() === newTaskName.toLowerCase()
    );

    if (existTaskIndex !== -1) {
      const existTask = list[existTaskIndex];

      if (existTask.isDeleted) {
        setList((prevList) => {
          const updatedList = prevList.map((task, index) => {
            if (index === existTaskIndex) {
              const { isDeleted, ...rest } = task;
              return rest;
            }
            return task;
          });

          setListToLocalStorage(updatedList).then(() =>
            console.log("LocalStorage updated after returning the deleted task!")
          );

          return updatedList; 
        });
      } else {
        return alert("This task already exists! Enter a new one.");
      }
    } else {
      setList((prevList) => {
        const newId = list.length ? list[list.length - 1].id + 1 : 1;
        const updatedList = prevList.concat({
          id: newId,
          taskName: newTaskName,
          completedDates: [],
        });

        setListToLocalStorage(updatedList).then(() =>
          console.log("LocalStorage updated after adding new task!")
        );

        return updatedList;
      });
    }
  }

  function checkItem(id: number) {

    setList((prevList) => {
      const updatedList = prevList.map((task) => {
        if (task.id === id) {
          if (task.completedDates.includes(todayDate)) {
            return {
              ...task,
              completedDates: task.completedDates.filter(date => date !== todayDate),
            };
          } else {
            return {
              ...task,
              completedDates: [...task.completedDates, todayDate],
            };
          }
        }
        return task;
      });

      setListToLocalStorage(updatedList).then(() =>
        console.log("LocalStorage updated after returning the deleted task!")
      );

      return updatedList; 
    });

  }

  return (
    <>
      <h1 className="dateHeading">
        Plan for {today.getDate()} {monthName[today.getMonth()]}
      </h1>
      <div className="container">
        <div className="tasksContainer">
          <TaskList list={list} todayDate={todayDate} deleteItem={deleteItem} checkItem={checkItem}/>
        </div>
        <div className="rightContainer">
          <TaskAdding taskAdding={taskAdding} />
          <ProgressRingWidget list={list} todayDate={todayDate} />
        </div>
      </div>
    </>
  );
}

export default Homepage;
