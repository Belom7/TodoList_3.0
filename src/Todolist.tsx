import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType} from './App';
import styles from './Todolist.module.css';


type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string) => void
  changeFilter: (value: FilterValuesType) => void
  addTask: (title: string) => void
  changeIsDone: (isDone: boolean, id: string) => void
}

export function Todolist(props: PropsType) {

  const [title, setTitle] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [buttonName, setButtonName] = useState('all')


  const onChangeHandler = (value: string) => {
    setError(null)
    setTitle(value)
  }
  const onClickHandler = () => {
    if (title.trim() !== '') {
      props.addTask(title)
      setTitle('')
    } else {
      setError('Title is required')
    }
  }
  const onKeyPressHandler = (key: string) => {
    if (key === 'Enter') {
      onClickHandler()
    }
  }

  // const onAllClickHandler = () => {
  //   props.changeFilter("all")
  // }
  // const onActiveClickHandler = () => {
  //   props.changeFilter("active")
  // }
  // const onCompletedClickHandler = () => {
  //   props.changeFilter("completed")
  // }

  const tsarHandler = (value: FilterValuesType) => {
    props.changeFilter(value)
    setButtonName(value)
  }
  const onChangeIsDoneHandler = (isDone: boolean, id: string) => {
    props.changeIsDone(isDone, id)
  }

  return <div>
    <h3>{props.title}</h3>
    <div>
      <input className={error ? styles.error : ''}
             value={title}
             onChange={(e) => onChangeHandler(e.currentTarget.value)}
             onKeyPress={(e) => onKeyPressHandler(e.key)}
      />
      <button onClick={onClickHandler}>+</button>
    </div>
    {error ? <div className={styles.errorMessage}>{error}</div> : <></>}
    <ul>
      {
        props.tasks.map(t => <li key={t.id} className={t.isDone ? styles.isDone : ''}>
          <button onClick={() => {
            props.removeTask(t.id)
          }}>x
          </button>
          <input type="checkbox"
                 checked={t.isDone}
                 onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeIsDoneHandler(e.currentTarget.checked, t.id)}

          />
          <span>{t.title}</span>
        </li>)
      }
    </ul>
    <div>
      <button className={buttonName === 'all' ? styles.activeFilter : ''} onClick={() => tsarHandler('all')}>All
      </button>
      <button className={buttonName === 'active' ? styles.activeFilter : ''}
              onClick={() => tsarHandler('active')}>Active
      </button>
      <button className={buttonName === 'completed' ? styles.activeFilter : ''}
              onClick={() => tsarHandler('completed')}>Completed
      </button>
    </div>
  </div>
}
