import { TList } from "../types/list.types";

//Возвращает список из локального хранилища

export const getListFromLocalStorage = (): Promise<TList[]> => {
  return new Promise((resolve, reject) => {
    const localStorageList = localStorage.getItem("list");

    try {
      resolve(localStorageList ? JSON.parse(localStorageList) : []);
    } catch (error) {
      console.log("Error parsing data from localStorage:", error.message);
      reject([]);
    }
  });
};

//Загружает список в локальное хранилище

export const setListToLocalStorage = (list: TList[]): Promise<void> => {
    return new Promise((resolve, reject) => {
      try {
        localStorage.setItem("list", JSON.stringify(list));
        resolve();
      } catch (error) {
        console.log("Error stringifing list:", error.message);
        reject();
      }
    });
  };

