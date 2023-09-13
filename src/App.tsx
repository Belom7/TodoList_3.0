import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";
type TodoListType = {
  id: string,
  title: string,
  filter: FilterValuesType
}
type TasksStateType = {
  [todoListID: string]: TaskType[]
}

function App() {

  const todoListId_1 = v1()
  const todoListId_2 = v1()
  const todoListId_3 = v1()

  const [todoLists, setTodoLists] = useState<TodoListType[]>([
    {id: todoListId_1, title: "Wot to learn", filter: 'all'},
    {id: todoListId_2, title: "Wot to Rus", filter: 'all'},
    {id: todoListId_3, title: "Wot to By", filter: 'all'},
  ])
  const [tasks, setTasks] = useState<TasksStateType>({
    [todoListId_1]: [
      {id: v1(), title: "HTML&CSS 1", isDone: true},
      {id: v1(), title: "JS 1", isDone: true},
      {id: v1(), title: "ReactJS 1", isDone: false},
      {id: v1(), title: "Rest API 1", isDone: false},
      {id: v1(), title: "GraphQL 1", isDone: false},
    ],
    [todoListId_2]: [
      {id: v1(), title: "HTML&CSS 2", isDone: true},
      {id: v1(), title: "JS 2", isDone: true},
      {id: v1(), title: "ReactJS 2", isDone: false},
      {id: v1(), title: "Rest API 2", isDone: false},
      {id: v1(), title: "GraphQL 2", isDone: false},
    ],
    [todoListId_3]: [
      {id: v1(), title: "HTML&CSS 3", isDone: true},
      {id: v1(), title: "JS 3", isDone: true},
      {id: v1(), title: "ReactJS 3", isDone: false},
      {id: v1(), title: "Rest API 3", isDone: false},
      {id: v1(), title: "GraphQL 3", isDone: false},
    ]
  })

  const addTodolist = (title: string) => {
    const newId = v1()
    setTodoLists([{id: newId, title: title, filter: 'all'}, ...todoLists])
    setTasks({
      ...tasks,
      [newId]: []
    })
  }
  const removeTodolist = (todoListID: string) => {
    setTodoLists(todoLists.filter((todolist) => todolist.id !== todoListID))
    delete tasks[todoListID]
  }
  const changeTodoList = (todoListID: string, title: string) => {
    setTodoLists(todoLists.map(el => el.id === todoListID ? {...el, title: title} : el))
  }
  const changeTodolistFilter = (todoListID: string, value: FilterValuesType) => {
    setTodoLists(todoLists.map((tl) => tl.id === todoListID ? {...tl, filter: value} : tl))
  }

  const addTask = (todoListID: string, title: string) => {
    const task = {id: v1(), title: title, isDone: false}
    setTasks({...tasks, [todoListID]: [task, ...tasks[todoListID]]})
  }
  const removeTask = (todoListID: string, id: string) => {
    setTasks({...tasks, [todoListID]: tasks[todoListID].filter(t => t.id !== id)});
  }
  const changeTask = (todoListID: string, taskID: string, value: string) => {
    setTasks({...tasks, [todoListID]: tasks[todoListID].map(el => el.id === taskID ? {...el, title: value} : el)})
  }
  const toggleTaskStatus = (todoListID: string, isDone: boolean, id: string) => {
    setTasks({...tasks, [todoListID]: tasks[todoListID].map(e => e.id === id ? {...e, isDone} : e)})
  }


  const getFilteredTasksFoeRender = (someTasks: TaskType[], someFilterValue: FilterValuesType): TaskType[] => {
    let tasksForTodolist = someTasks;

    if (someFilterValue === "active") {
      tasksForTodolist = someTasks.filter(t => !t.isDone);
    }
    if (someFilterValue === "completed") {
      tasksForTodolist = someTasks.filter(t => t.isDone);
    }
    return tasksForTodolist
  }

  const todolistForRender: JSX.Element[] = todoLists.map(el => {
    const taskForRender = getFilteredTasksFoeRender(tasks[el.id], el.filter)
    return (
      <Todolist
        key={el.id}
        title={el.title}
        filter={el.filter}
        todoListId={el.id}
        tasks={taskForRender}
        removeTask={removeTask}
        changeFilter={changeTodolistFilter}
        addTask={addTask}
        changeIsDone={toggleTaskStatus}
        removeTodolist={removeTodolist}
        changeTask={changeTask}
        changeTodoList={changeTodoList}
      />
    )
  })

  return (
    <div className="App">
      <AddItemForm callback={addTodolist}/>
      {todolistForRender}
    </div>
  );
}

export default App;
