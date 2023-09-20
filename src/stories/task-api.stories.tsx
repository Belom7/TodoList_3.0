import React, {useEffect, useState} from "react";
import {taskApi} from "../api/task-api";


export default {
  title: 'API'
}

const todolistId = '3c5a5694-126d-4e7c-89fa-b94b5371b90f'
const taskId = '0da5b926-6761-49f0-a538-cb25001ff88c'
const title = 'TASKA DVA DVA'
const updateTitle = 'TASKAAAAA ####'

export const GetTask = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    taskApi.getTask(todolistId)
      .then((res) => {
        setState(res.data)
      })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    taskApi.createTask(todolistId, title)
      .then((res) => setState(res.data))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    taskApi.deleteTask(todolistId,taskId)
      .then((res) => setState(res.data))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    taskApi.updateTask(todolistId, taskId, updateTitle)
      .then((res) => setState(res.data))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}