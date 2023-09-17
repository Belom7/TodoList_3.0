import React, {memo} from 'react';
import {Button} from "@mui/material";

type ButtonThisMemoType = {
  title: string,
  variant: 'text' | 'outlined' | 'contained',
  onClick: () => void,
  color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning',
}

export const ButtonThisMemo = memo(({title,variant,onClick,color}: ButtonThisMemoType) => {
  console.log('ButtonThisMemo')
  return (
    <Button variant={variant}
            onClick={onClick}
            color={color}>{title}
    </Button>
  );
});
