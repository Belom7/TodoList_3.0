import React, {ChangeEvent, useCallback} from 'react'
import {EditableSpan} from './EditableSpan'
import {Delete} from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import {TaskStatuses, TaskType} from './api/todolists-api'

type TaskPropsType = {
  task: TaskType
  changeTaskStatus: (taskId: string, status: TaskStatuses) => void
  changeTaskTitle: (taskId: string, newTitle: string) => void
  removeTask: (taskId: string) => void
}
export const Task = React.memo((props: TaskPropsType) => {

  const onClickHandler = useCallback(() => {
    props.removeTask(props.task.id)
  }, [props.task.id]);
  const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    let newIsDoneValue = e.currentTarget.checked
    props.changeTaskStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New)
  }, [props.task.id]);
  const onTitleChangeHandler = useCallback((newValue: string) => {
    props.changeTaskTitle(props.task.id, newValue)
  }, [props.task.id]);

  return <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
    <Checkbox
      checked={props.task.status === TaskStatuses.Completed}
      color="primary"
      onChange={onChangeHandler}
    />

    <EditableSpan value={props.task.title} onChange={onTitleChangeHandler}/>
    <IconButton onClick={onClickHandler}>
      <Delete/>
    </IconButton>
  </div>
})
