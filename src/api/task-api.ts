import axios from "axios";

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true
})
export const taskApi = {
  getTask(todolistId: string) {
    return instance.get<TaskType[]>(`todo-lists/${todolistId}/tasks`)
  },
  createTask(todolistId: string, title: string) {
    return instance.post<ResponseType<{item:ItemsType}>>(`todo-lists/${todolistId}/tasks`, {title})
  },
  deleteTask(todolistId: string, taskId:string) {
    return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
  },
  updateTask(todolistId: string, taskId: string, title: string) {
    return instance.put<ResponseType<{item:ItemsType}>>(`/todo-lists/${todolistId}/tasks/${taskId}`, {title})
  }
}


type ItemsType = {
  description: string,
  title: string,
  completed: boolean,
  status: number,
  priority: number,
  startDate: Date,
  deadline: Date,
  id: string,
  todoListId: string,
  order: number,
  addedDate: Date,
}

type TaskType = {
  "items": ItemsType[],
  "totalCount": number,
  "error": null | string
}

type ResponseType<T={}> = {
  resultCode: number
  "fieldsErrors": string[]
  messages: string[],
  data: {
    item: T
  }
}

