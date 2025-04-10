import React, { createContext, useContext, useState, useEffect } from "react";
import { TList } from "../types/list.types.ts";
import {
  getListFromServer,
  addTastToServer,
  updateTaskOnServer,
} from "../utils/list.utils.ts";

type TListContext = {
  list: TList[];
  todayDate: string;
  addTask: (taskName: string) => void;
  deleteTask: (id: number) => void;
  checkTask: (id: number) => void;
};

const ListContext = createContext<TListContext>({
  list: [],
  todayDate: "",
  addTask: () => {},
  deleteTask: () => {},
  checkTask: () => {},
});

export function useList() {
  return useContext(ListContext);
}

export function ListProvider({
  children,
}: React.PropsWithChildren): React.ReactNode {
  const today = new Date();
  const [todayDate] = today.toISOString().split("T");
  const [list, setList] = useState<TList[]>([]);

  useEffect(() => {
    getListFromServer().then((list) => setList(list));
  }, []);

  function addTask(taskName: string) {
    // добавление задачи
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
        // если новая задача уже существует, но была удалена, то возвращаем её
        setList((prevList) => {
          const updatedList = prevList.map((task, index) => {
            if (index === existTaskIndex) {
              const { isDeleted, ...rest } = task;

              updateTaskOnServer(existTask.id, rest) // отправляется на сервер без пометки "isDeleted: true"
                .then(() =>
                  console.log(
                    `Todo list updated on server after returning the deleted task "${existTask.taskName}".`
                  )
                )
                .catch((error) =>
                  console.log(
                    `Error updating deleted task"${existTask.taskName}":`,
                    error.message
                  )
                );

              return rest;
            }
            return task;
          });

          return updatedList;
        });
      } else {
        return alert("This task already exists! Enter a new one.");
      }
    } else {
      // если задача новая, то добавляется в список
      setList((prevList) => {
        const newId: number = prevList.length
          ? prevList[prevList.length - 1].id + 1
          : 1;
        const newTask: TList = {
          id: newId,
          taskName: newTaskName,
          completedDates: [],
        };

        addTastToServer(newTask) // отправка на сервис
          .then(() =>
            console.log(`New task "${newTaskName}" is loaded to server`)
          )
          .catch((error) => console.log("Error adding task:", error.message));

        return [...prevList, newTask];
      });
    }
  }

  function deleteTask(id: number) {
    //удаление задачи
    const taskToDelete = list.find((task) => task.id === id) as TList;
    if (!taskToDelete) return; // проверка на ошибку передачи id

    const deletedTask = { ...taskToDelete, isDeleted: true };

    updateTaskOnServer(id, deletedTask) // отправляется на сервер с пометкой "isDeleted: true"
      .then(() =>
        console.log(
          `Todo list updated on server after deletind task "${deletedTask.taskName}".`
        )
      )
      .catch((error) =>
        console.log(`Error deleting task"${deletedTask.taskName}":`, error.message)
      );

    setList((prevList) =>
      prevList.map((task) => (task.id === id ? deletedTask : task))
    ); //внесение изменений в состояние list
  }

  function checkTask(id: number) {
    const task = list.find((task) => task.id === id) as TList;
    if (!task) return; // проверка на ошибку передачи id

    const isCompleted: boolean = task.completedDates.includes(todayDate);
    const updateTask: TList = { // 
      ...task,
      completedDates: isCompleted // если задача сегодня выполнена
        ? task.completedDates.filter((date) => date !== todayDate) // то убираем дату 
        : [...task.completedDates, todayDate],
    };

    updateTaskOnServer(id, updateTask) // отправляется на сервер с пометкой "isDeleted: true"
      .then(() =>
        console.log(
          `Todo list updated after changing task "${task.taskName}" completion state.`
        )
      )
      .catch((error) =>
        console.log(
          `Error changing task "${task.taskName}" completion state:`,
          error.message
        )
      );

    setList((prevList) =>
      prevList.map((task) => (task.id === id ? updateTask : task))
    ); //внесение изменений в состояние list
  }

  return (
    <ListContext.Provider
      value={{ list, todayDate, addTask, deleteTask, checkTask }}
    >
      {children}
    </ListContext.Provider>
  );
}
