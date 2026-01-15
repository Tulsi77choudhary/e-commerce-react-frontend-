import React, { useEffect } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../../State/Action/Action";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((store) => store.auth);

  // Redirect after successful registration
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
      password: data.get("password"),
    };

    dispatch(register(userData));
  };

  return (
    <div>
      <form onSubmit={handleSubmit} noValidate>
        {/* Name Fields */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="firstName"
              label="First Name"
              fullWidth
              autoComplete="given-name"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="lastName"
              label="Last Name"
              fullWidth
              autoComplete="family-name"
            />
          </Grid>

          {/* Email */}
          <Grid item xs={12}>
            <TextField
              required
              name="email"
              label="Email"
              type="email"
              fullWidth
              autoComplete="email"
            />
          </Grid>

          {/* Password */}
          <Grid item xs={12}>
            <TextField
              required
              name="password"
              label="Password"
              type="password"
              fullWidth
              autoComplete="new-password"
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{
                padding: ".8rem 0",
                bgcolor: "#9155FD",
                "&:hover": { bgcolor: "#7e3ff2" },
              }}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Switch to Login */}
      <div className="flex justify-center flex-col items-center mt-3">
        <div className="py-2 flex items-center gap-2">
          <p>Already have an account?</p>
          <Button size="small" onClick={() => navigate("/login")}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;

