import axios from "axios";

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true
})

export const todoListsApi = {
  getTodoList() {
    return instance.get<todoListType[]>('todo-lists')
  },
  createTodoList(title: string) {
    return instance.post<ResponseType<{item: todoListType}>>('todo-lists', {title})
  },
  deleteTodoList(todoListId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todoListId}`)
  },
  updateTodoList(todoListId: string, title: string) {
    return instance.put<ResponseType>(`/todo-lists/${todoListId}`, {title})
  }
}

type todoListType = {
  "id": string,
  "title": string,
  "addedDate": Date,
  "order": number
}

type ResponseType <T={}>= {
  "data": {
    "item": T
  },
  "messages": string[],
  "fieldsErrors": [],
  "resultCode": number
}