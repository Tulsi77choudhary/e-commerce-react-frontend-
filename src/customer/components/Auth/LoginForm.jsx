import React, { useEffect } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../State/Action/Action";

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      email: data.get("email"),
      password: data.get("password")
    };
    dispatch(login(userData));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>

        <Grid item xs={12}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            fullWidth autoComplete="email"
          />
        </Grid>
        <Grid item xs={12} mt={2}>
          <TextField
            required
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth autoComplete="current-password"
          />
        </Grid>
        <Grid item xs={12} mt={2}>
          <Button
            type="submit"
            variant="contained"
            size="large" sx={{ padding: ".8rem 0", bgcolor: "#9155FD", width: '100%' }} >
            Login
          </Button>
        </Grid>

      </form>
      <div className="flex justify-center flex-col items-center">
        <div className="py-3 flex items-center">
          <p>If you don't have an account?</p>
          <Button
            onClick={() => navigate("/register")}
            className="ml-5" size="small">
            Register
          </Button>
        </div>
      </div>
    </div>);
};

export default LoginForm;
