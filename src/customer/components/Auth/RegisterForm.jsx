import React, { useEffect } from 'react'
import { Button, Grid, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register} from '../../../State/Action/Action';


export const RegisterForm = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const auth = useSelector((store) => store.auth);

  useEffect(() => {
    if (auth.user) {
      navigate("/");
    }
  }, [auth.user, navigate]);


  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const userData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password")
    }
    dispatch(register(userData))
    console.log("userData", userData);

  }


  return (
    <div>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} >
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First Name"
              fullWidth
              autoComplete='given-name'
            />
          </Grid>
          <Grid item xs={12} sm={6}   >
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last Name"
              fullWidth
              autoComplete='given-name'
            />
          </Grid>
        </Grid>
        <Grid spacing={2} mt={2}>
          <Grid item xs={12} sm={6} >
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete='email'
            />
          </Grid>

          <Grid item xs={12} sm={6} mt={2} >
            <TextField
              required
              id="password"
              name="password"
              label="Password"
              fullWidth
              autoComplete='password'
            />
          </Grid>
          <Grid item xs={12} mt={2}>
            <Button
              className='bg-[#9155FD] w-full'
              type='submit'
              variant='contained'
              size='large'
              sx={{ padding: ".8rem 0", bgcolor: "#9155FD" }}

            >
              Register
            </Button>
          </Grid>

        </Grid>

      </form>

      <div className='flex justify-center flex-col items-center'>
        <div className='py-3 flex items-center'>
          <p>If you have already account ?</p>
          <Button onClick={() => navigate("/login")} className='ml-5' size='small'>Login</Button>
        </div>
      </div>
    </div>
  )
}
export default RegisterForm
