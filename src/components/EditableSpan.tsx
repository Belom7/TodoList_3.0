import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
  title: string
  callback: (value: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {

  const [editMode, setEditMode] = useState(false)
  const [valueInput, setValueInput] = useState(props.title)

  const activateEditMode = () => {
    setEditMode(!editMode)
    if (editMode) {
      props.callback(valueInput)
    }
  }
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.currentTarget.value)

  }

  return (
    editMode
      ? <input value={valueInput} onBlur={activateEditMode} autoFocus onChange={onChangeHandler}/>
      : <span onDoubleClick={activateEditMode}>{props.title}</span>
  );
};
