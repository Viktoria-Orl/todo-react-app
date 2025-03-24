import React, { createContext, useContext, useState, useEffect } from "react";
import { TList } from "../types/list.types.ts";
import {
  getListFromLocalStorage,
  setListToLocalStorage,
} from "../utils/list.utils.ts";

type TListContext = {
  list: TList[];
  todayDate: string;
  addTask: (taskName: string) => void;
  deleteTask: (id: number) => void;
  checkTask: (id: number) => void;
};

// Создание контекста
const ListContext = createContext<TListContext>({
  list: [],
  todayDate: "",
  addTask: () => {},
  deleteTask: () => {},
  checkTask: () => {},
});

// Создаем хук для использования контекста в компонентах
export function useList() {
  return useContext(ListContext); // <- Consumer, т.е. потребитель контекста
}

// const { list } = useList();
// return <div className={list}></div>
// т.е. используется как переменная в каждом компоненте, где она требуется

export function ListProvider({ children }) {
  const today = new Date();
  const [todayDate] = today.toISOString().split("T");
  const [list, setList] = useState<TList[]>([]);

  useEffect(() => {
    getListFromLocalStorage().then((list) => setList(list));
  }, []);

  function addTask(taskName: string) {
    const newTaskName = taskName.trim();

    if (!newTaskName) {
      return alert("Empty task!");
    }

    const existTaskIndex: number = list.findIndex(
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
            console.log(
              "LocalStorage updated after returning the deleted task!"
            )
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

  function deleteTask(id: number) {
    setList((prevList) => {
      const updatedList = prevList.map((task) => {
        if (task.id === id) {
          return { ...task, isDeleted: true };
        } else {
          return task;
        }
      });

      setListToLocalStorage(updatedList).then(() =>
        console.log("LocalStorage updated after task deletion!")
      );

      return updatedList;
    });
  }

  function checkTask(id: number) {
    setList((prevList) => {
      const updatedList = prevList.map((task) => {
        if (task.id === id) {
          if (task.completedDates.includes(todayDate)) {
            return {
              ...task,
              completedDates: task.completedDates.filter(
                (date) => date !== todayDate
              ),
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
        console.log("LocalStorage updated after changing task completion state")
      );

      return updatedList;
    });
  }

  return (
    <ListContext.Provider
      value={{ list, todayDate, addTask, deleteTask, checkTask }}
    >
      {children}
    </ListContext.Provider>
  );
}
