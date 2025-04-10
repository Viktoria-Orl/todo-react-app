import { TList } from "../types/list.types";

//Возвраи списка из локального сервера

export function getListFromServer(): Promise<TList[]> {
  return fetch('http://localhost:8888/list')
    .then(response => response.ok ? response.json() : [])
    .catch(error => {
      console.log("Error fetching data from json-server:", error.message);
      return [];
    })
};

//Загрузка новой задачи в локальный сервер

export function addTastToServer(task: TList): Promise<Response> {
  return fetch('http://localhost:8888/list', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  })
};

//Изменение задачи на сервере

export function updateTaskOnServer(id: number, updatedTask: TList): Promise<Response> {
  return fetch(`http://localhost:8888/list/${id}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedTask),
  })
}