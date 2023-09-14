import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


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

  const buttonStyle = {
    maxWidth: '40px',
    maxHeight: '40px',
    minWidth: '40px',
    minHeight: '40px',
  }

  return (
    <div>
      <TextField id="outlined-basic"
                 label={error? 'Title is required' : 'Please type here'}
                 variant="outlined"
                 size="small"
                 error={!!error}
                 value={title}
                 onChange={(e) => onChangeHandler(e.currentTarget.value)}
                 onKeyPress={(e) => onKeyPressHandler(e.key)}
      />
      <Button style={buttonStyle}
              onClick={onClickHandler}
              variant={'contained'}
              color={'primary'}>+</Button>
    </div>
  );
};
