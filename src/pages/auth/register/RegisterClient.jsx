import React, { useState } from "react";
import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerAsClient } from "../../../actions/auth/authActions";
import Alert from "@material-ui/lab/Alert";

const RegisterClient = () => {
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    surname: Yup.string().required("Surname is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    email_confirmation: Yup.string()
      .required("Email confirmation is required")
      .oneOf([Yup.ref("email"), null], "Confirm Password does not match"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(40, "Password must not exceed 40 characters"),
    password_confirmation: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
    phone_number: Yup.string().required("Phone Number is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const onSubmitClient = async (data) => {
    try {
      setLoading(true);
      await dispatch(registerAsClient(data));
      navigate("/email-send");
    } catch (e) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const paperStyle = {
    padding: "20px 20px",
    width: "40vw",
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
          <h2>Register as client</h2>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Username*"
              {...register("name")}
              placeholder="Enter username"
              style={inputsStyle}
              fullWidth
              error={!!errors.name}
            />
            <Typography variant="inherit" color="error">
              {errors.name?.message}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Surname*"
              {...register("surname")}
              placeholder="Enter surname"
              style={inputsStyle}
              fullWidth
              error={!!errors.surname}
            />
            <Typography variant="inherit" color="error">
              {errors.surname?.message}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email*"
              {...register("email")}
              placeholder="Enter email"
              style={inputsStyle}
              fullWidth
              error={!!errors.email}
            />
            <Typography variant="inherit" color="error">
              {errors.email?.message}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email Confirmation*"
              {...register("email_confirmation")}
              placeholder="Enter Email Confirmation"
              style={inputsStyle}
              fullWidth
              error={!!errors.email_confirmation}
            />
            <Typography variant="inherit" color="error">
              {errors.email_confirmation?.message}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Password*"
              {...register("password")}
              placeholder="Enter Password"
              style={inputsStyle}
              fullWidth
              error={!!errors.password}
              type="password"
            />
            <Typography variant="inherit" color="error">
              {errors.password?.message}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Password Confirmation*"
              {...register("password_confirmation")}
              placeholder="Enter Password Confirmation"
              style={inputsStyle}
              fullWidth
              error={!!errors.password_confirmation}
              type="password"
            />
            <Typography variant="inherit" color="error">
              {errors.password_confirmation?.message}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone Number*"
              {...register("phone_number")}
              placeholder="Enter Phone Number"
              style={inputsStyle}
              fullWidth
              error={!!errors.phone_number}
              type="number"
            />
            <Typography variant="inherit" color="error">
              {errors.phone_number?.message}
            </Typography>
          </Grid>
        </Grid>
        {message && (
          <Alert style={{ marginTop: "10px" }} severity="error">
            {message}
          </Alert>
        )}
        <Button
          onClick={handleSubmit(onSubmitClient)}
          color="primary"
          variant="contained"
          style={buttonStyle}
          fullWidth
          disabled={loading}
        >
          Register
        </Button>
        <Typography style={linksStyle}>
          Already have an account ?
          <Link style={{ marginLeft: "7px" }} to={"/login"}>
            Sign In
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default RegisterClient;
