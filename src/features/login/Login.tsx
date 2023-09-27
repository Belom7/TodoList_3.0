import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import {loginTC} from "./auth-reducer";
import {useAppDispatch, useAppSelector} from "../../state/store";
import {Navigate} from "react-router-dom";

type FormikErrorType = {
  email?:string,
  password?:string
}

export type LoginDataType = {
  email:string,
  password:string,
  rememberMe: boolean,
}

export const Login = () => {

  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  const validate = (values: FormikErrorType) => {
    const errors:FormikErrorType = {};
    if (!values.password) {
      errors.password = 'Required';
    } else if (values.password.length > 15) {
      errors.password = 'Must be 15 characters or less';
    }

    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    validate,
    onSubmit: values => {
      dispatch(loginTC(values))
      formik.resetForm()
    },

  });

  const res = Object.values(formik.errors)

  if(isLoggedIn) {
    return  <Navigate to={'/'}/>
  }

  return <Grid container justifyContent={'center'}>
    <Grid item justifyContent={'center'}>
      <FormControl>
        <FormLabel>
          <p>To log in get registered
            <a href={'https://social-network.samuraijs.com/'}
               target={'_blank'}> here
            </a>
          </p>
          <p>or use common test account credentials:</p>
          <p>Email: free@samuraijs.com</p>
          <p>Password: free</p>
        </FormLabel>
        <form onSubmit={formik.handleSubmit}>
        <FormGroup>

            <TextField label={formik.touched.email && formik.errors.email? `${formik.errors.email}` : "Email"}
                       margin="normal"
                       // name={'email'}
                       // onChange={formik.handleChange}
                       // value={formik.values.email}
                       // style={{color:'red'}}
                       // onBlur={formik.handleBlur}
                       {...formik.getFieldProps('email')}
            />
          {formik.errors && <span style={{color:"red"}}>{formik.errors.email}</span>}
            <TextField type="password"
                       label={formik.touched.password && formik.errors.password? `${formik.errors.password}` : "Password"}
                       margin="normal"
                       {...formik.getFieldProps('password')}
            />
          {/*{formik.errors && <span style={{color:"red"}}>{formik.errors}</span>}*/}
            <FormControlLabel label={'Remember me'}
                              control={<Checkbox
                                {...formik.getFieldProps('rememberMe')}
                              />}/>
            <Button type={'submit'}
                    variant={'contained'}
                    color={'primary'}
                    disabled={!!res.length}
            >
              Login
            </Button>

        </FormGroup>

      </form>

      </FormControl>
    </Grid>
  </Grid>
}