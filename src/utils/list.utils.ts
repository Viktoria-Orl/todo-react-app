import { TList } from "../types/list.types";

/**
 * Возвращает список из локального хранилища
 */
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

// [{"id":1,"taskName":"Зарядка","completed":false,"completedDates":["11.02.2025","12.02.2025"]},{"id":2,"taskName":"Занятия","completed":false,"completedDates":["10.02.2025","11.02.2025"]},{"id":3,"taskName":"Английский","completed":true,"completedDates":["11.02.2025","12.02.2025","13.02.2025"]},{"id":4,"taskName":"Спорт","completed":true,"completedDates":["11.02.2025","12.02.2025","13.02.2025"],"isDeleted":true}]
