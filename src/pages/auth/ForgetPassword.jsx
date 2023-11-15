import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Alert from "@material-ui/lab/Alert";
import React, { useState } from "react";
import { AuthService } from "../../services/AuthService";

const EmailSend = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await AuthService.forgetPassword(data.email);
      setLoading(false);
    } catch (e) {
      setMessage("User not found");
    }
    setLoading(false);
  };
  const paperStyle = {
    padding: "20px",
    width: 280,
    margin: "20px auto",
  };
  const linksStyle = { padding: "5px 0" };
  const buttonStyle = { margin: "20px 0" };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  return (
    <div>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}></Avatar>
            <h2>Forget password ?</h2>
          </Grid>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid item xs={12}>
              <TextField
                {...register("email")}
                label="Email"
                placeholder="Enter email"
                error={!!errors.email}
                fullWidth
              />
              <Typography variant="inherit" color="error">
                {errors.email?.message}
              </Typography>
            </Grid>
            {message && (
              <Alert style={{ marginTop: "10px" }} severity="warning">
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
              Restore Password
            </Button>
          </form>
          <Typography style={linksStyle}>
            <Link to={"/login"}>Back to login</Link>
          </Typography>
        </Paper>
      </Grid>
    </div>
  );
};

export default EmailSend;
