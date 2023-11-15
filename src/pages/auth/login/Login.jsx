import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../actions/auth/authActions";
import Alert from "@material-ui/lab/Alert";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const Login = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(40, "Password must not exceed 40 characters"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const [loading, setLoading] = useState(false);
  const { message } = useSelector((state) => state.message);
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await dispatch(login(data.email, data.password));
      navigate("/profile");
    } catch (e) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const paperStyle = {
    padding: "20px",
    width: 280,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const buttonStyle = { margin: "20px 0" };
  const linksStyle = { padding: "5px 0" };
  const inputsStyle = { margin: "5px 0" };
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}></Avatar>
          <h2>Sign In</h2>
        </Grid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid item xs={12}>
            <TextField
              {...register("email")}
              label="Email"
              placeholder="Enter email"
              error={!!errors.email}
              style={inputsStyle}
              fullWidth
            />
            <Typography variant="inherit" color="error">
              {errors.email?.message}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register("password")}
              label="Password"
              placeholder="Enter password"
              type="password"
              style={inputsStyle}
              fullWidth
            />
            <Typography variant="inherit" color="error">
              {errors.password?.message}
            </Typography>
          </Grid>
          {message && (
            <Alert style={{ marginTop: "10px" }} severity="error">
              {message}
            </Alert>
          )}
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={buttonStyle}
            fullWidth
            disabled={loading}
          >
            Sign in
          </Button>
        </form>
        <Typography style={linksStyle}>
          <Link to={"/forget-password"}>Forgot password ?</Link>
        </Typography>
        <Typography style={linksStyle}>
          Do you have an account ?
          <Link style={{ marginLeft: "7px" }} to={"/register"}>
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
