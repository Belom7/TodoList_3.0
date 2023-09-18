import React, {ChangeEvent, memo, useCallback} from 'react';
import {changeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from "./state/tasks-reducer";
import {Checkbox} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./Todolist";
import {useDispatch} from "react-redux";

type PropsType = {
  todoListId: string,
  task: TaskType
}


export const Task = memo(({todoListId, task}: PropsType) => {

  console.log('Task')

  const dispatch = useDispatch()

  const onClickHandler = () => dispatch(RemoveTaskAC(todoListId, task.id))
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let newIsDoneValue = e.currentTarget.checked;
    dispatch(changeTaskStatusAC(todoListId, task.id, newIsDoneValue))
  }

  const onTitleChangeHandler = useCallback((newValue: string) => dispatch(ChangeTaskTitleAC(todoListId, task.id, newValue)), [dispatch])
  return (
    <div key={task.id} className={task.isDone ? "is-done" : ""}>
      <Checkbox
        checked={task.isDone}
        color="primary"
        onChange={onChangeHandler}
      />

      <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
      <IconButton onClick={onClickHandler}>
        <Delete/>
      </IconButton>
    </div>
  )
})
