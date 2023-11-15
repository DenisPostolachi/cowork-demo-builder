import React, { useEffect, useState } from "react";
import { Grid, TextField, Typography } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { login } from "../../../actions/auth/authActions";
import { ProfileService } from "../../../services/ProfileService";

const HostProfileUpdateForm = () => {
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
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const getHostProfileInfo = async () => {
      try {
        const response = await ProfileService.getHostProfileInfo();
        console.log(response);
      } catch (e) {
        setMessage(e.response.data.message);
      }
    };
    getHostProfileInfo();
  }, []);
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await dispatch(login(data.email, data.password));
      navigate("/profile");
    } catch (e) {
      setLoading(false);
    }
  };
  const inputsStyle = { margin: "5px 0" };
  return (
    <div>
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
    </div>
  );
};

export default HostProfileUpdateForm;
