import React, {useEffect, useState} from 'react'
import {todoListsApi} from "../api/todoLists-api";

export default {
  title: 'API'
}

const todoId = 'fde0f2a0-01d8-4ab9-bd6e-bb9ed40b5d5d'

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    todoListsApi.getTodoList()
      .then((res) => {
        setState(res.data)
      })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    todoListsApi.createTodoList('Groom')
      .then((res) => setState(res.data))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    todoListsApi.deleteTodoList(todoId)
      .then((res) => setState(res.data))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    todoListsApi.updateTodoList(todoId, 'GOVNO!')
      .then((res) => setState(res.data))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}