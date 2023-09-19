import axios from "axios";


const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true
})

export const todoListsApi = {
  getTodoList() {
    return instance.get('todo-lists')
  },
  createTodoList(title: string) {
    return instance.post('todo-lists', {title})
  },
  deleteTodoList(todoListId: string) {
    return instance.delete(`todo-lists/${todoListId}`)
  },
  updateTodoList(todoListId: string, title: string) {
    return instance.put(`/todo-lists/${todoListId}`, {title})
  }
}