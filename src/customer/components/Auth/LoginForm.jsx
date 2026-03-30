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
    <div className="w-full max-w-md mx-auto p-4 sm:p-6 lg:p-8 bg-white shadow-xl rounded-2xl border border-gray-100">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Grid container spacing={2}>
          
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email Address"
              fullWidth
              autoComplete="email"
              // Tailwind class for border color on focus
              className="focus:ring-2 focus:ring-[#9155FD] rounded-md"
              sx={{
                "& label.Mui-focused": { color: "#9155FD" }, // Label color on focus
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": { borderColor: "#9155FD" }, // Border color
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              id="password"
              name="password"
              label="Password"
              type="password"
              fullWidth
              autoComplete="current-password"
              sx={{
                "& label.Mui-focused": { color: "#9155FD" },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": { borderColor: "#9155FD" },
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ 
                padding: ".8rem 0", 
                bgcolor: "#9155FD", // Primary Brand Color
                width: '100%',
                fontWeight: "bold",
                "&:hover": { 
                  bgcolor: "#7a45d4", // Darker shade for hover
                  boxShadow: "0px 4px 20px rgba(145, 85, 253, 0.4)" 
                } 
              }} 
            >
              Login
            </Button>
          </Grid>

        </Grid>
      </form>

      <div className="flex flex-col sm:flex-row justify-center items-center mt-8 text-sm">
        <p className="text-gray-500 font-medium">Don't have an account?</p>
        <Button
          onClick={() => navigate("/register")}
          size="small"
          sx={{ 
            marginLeft: { xs: "0", sm: "0.5rem" },
            color: "#9155FD", // Link color matching the theme
            fontWeight: "700",
            textTransform: "none",
            "&:hover": { backgroundColor: "transparent", textDecoration: "underline" }
          }}
        >
          Create Account
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;