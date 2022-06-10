import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import config from "../../config";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

const axios = require("axios");

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [message, setMessage] = useState();
  const history = useHistory();

  const submitHandler = (data, e) => {
    setMessage({
      data: "Login is in progress...",
      severity: "info",
    });

    axios
      .post(`${config.baseUrl}/user/login`, data)
      .then((response) => {
        const data = response.data.data;

        setMessage({
          data: "Logged in successfully, redirecting...",
          severity: "success",
        });

        localStorage.setItem("token", data.token);

        setTimeout(() => {
          history.push("/dashboard");
        }, 2000);

        e.target.reset();
      })
      .catch((error) => {
        setMessage({
          data: error.response.data.error,
          severity: "error",
        });
      });
  };

  return (
    <Container maxWidth="sm">
      {message && <Alert severity={message.severity}>{message.data}</Alert>}

      <Box
        component="form"
        onSubmit={handleSubmit(submitHandler)}
        noValidate
        autoComplete="off"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h1" component="div">
          User Login
        </Typography>
        <TextField
          fullWidth
          sx={{ mb: 3 }}
          error={errors.username}
          helperText={errors.username ? errors.username.message : ""}
          variant="filled"
          label="Username"
          id="username"
          type="text"
          {...register("username", {
            required: {
              value: true,
              message: "Please enter a username.",
            },
            minLength: {
              value: 3,
              message: "Username should contain at least 3 characters.",
            },
            maxLength: {
              value: 30,
              message: "Username should have a maximum of 30 characters.",
            },
            pattern: {
              value: /^[a-zA-Z0-9_-]{3,30}$/,
              message:
                "Username should contain letters, numbers, underscore, and dash only.",
            },
          })}
        />
        <TextField
          fullWidth
          sx={{ mb: 3 }}
          error={errors.password}
          helperText={errors.password ? errors.password.message : ""}
          variant="filled"
          label="Password"
          id="password"
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: "Please enter a password.",
            },
            minLength: {
              value: 6,
              message: "Password should contain at least 6 characters.",
            },
            maxLength: {
              value: 128,
              message: "Password should have a maximum of 128 characters.",
            },
            pattern: {
              value:
                /^\S*(?=\S{6,128})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/,
              message:
                "Password should contain at least 1 upper case English letter, 1 lower case English letter, and 1 special character.",
            },
          })}
        />
        <Button
          fullWidth
          variant="contained"
          type="submit"
          sx={{ borderRadius: 5, mb: 5 }}
        >
          Login
        </Button>
        <Typography variant="h2" component="div">
          Don't have an account?
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/register"
        >
          Register
        </Button>
      </Box>
    </Container>
  );
};

export default Login;