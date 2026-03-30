import React, { useEffect } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../../State/Action/Action";

const RegisterForm = () => {
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
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
    };
    dispatch(register(userData));
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-6 lg:p-8 bg-white shadow-xl rounded-2xl border border-gray-100">
      <form onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          {/* Name Fields - Side by side on larger screens */}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="firstName"
              label="First Name"
              fullWidth
              autoComplete="given-name"
              sx={{
                "& label.Mui-focused": { color: "#9155FD" },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": { borderColor: "#9155FD" },
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="lastName"
              label="Last Name"
              fullWidth
              autoComplete="family-name"
              sx={{
                "& label.Mui-focused": { color: "#9155FD" },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": { borderColor: "#9155FD" },
                },
              }}
            />
          </Grid>

          {/* Email */}
          <Grid item xs={12}>
            <TextField
              required
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              autoComplete="email"
              sx={{
                "& label.Mui-focused": { color: "#9155FD" },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": { borderColor: "#9155FD" },
                },
              }}
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
              sx={{
                "& label.Mui-focused": { color: "#9155FD" },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": { borderColor: "#9155FD" },
                },
              }}
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
                fontWeight: "bold",
                "&:hover": { 
                  bgcolor: "#7a45d4",
                  boxShadow: "0px 4px 20px rgba(145, 85, 253, 0.4)" 
                },
              }}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Switch to Login Link */}
      <div className="flex flex-col sm:flex-row justify-center items-center mt-6 text-sm">
        <p className="text-gray-500 font-medium">Already have an account?</p>
        <Button 
          size="small" 
          onClick={() => navigate("/login")}
          sx={{ 
            marginLeft: { xs: "0", sm: "0.5rem" },
            color: "#9155FD",
            fontWeight: "700",
            textTransform: "none",
            "&:hover": { backgroundColor: "transparent", textDecoration: "underline" }
          }}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default RegisterForm;