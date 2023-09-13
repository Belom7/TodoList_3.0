import React, {useState} from 'react';
import styles from "./Todolist.module.css";

type AddItemFormPropsType = {
  callback: (title: string) => void,
}

export const AddItemForm = (props: AddItemFormPropsType) => {

  const [title, setTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  const onChangeHandler = (value: string) => {
    setError(null)
    setTitle(value)
  }
  const onClickHandler = () => {
    if (title.trim() !== '') {
      props.callback(title)
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

  return (
    <div>
      <input className={error ? styles.error : ''}
             value={title}
             onChange={(e) => onChangeHandler(e.currentTarget.value)}
             onKeyPress={(e) => onKeyPressHandler(e.key)}
      />
      <button onClick={onClickHandler}>+</button>
      <>{error ? <div className={styles.errorMessage}>{error}</div> : <></>}</>
    </div>
  );
};
