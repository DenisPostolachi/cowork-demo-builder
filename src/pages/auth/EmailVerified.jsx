import React, { useEffect } from "react";
import { Avatar, Grid, Paper, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { AuthService } from "../../services/AuthService";

const EmailVerified = () => {
  const { token } = useParams();

  useEffect(() => {
    if (!token) return;
    const sendToken = async () => {
      try {
        await AuthService.confirmEmail(token);
      } catch (e) {

      }
    };
    sendToken();
  }, [token]);
  const paperStyle = {
    padding: "20px",
    width: 280,
    margin: "20px auto",
  };
  const linksStyle = { padding: "15px 5px" };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  return (
    <div>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}></Avatar>
            <h2>User verified. Access confirmed!</h2>
          </Grid>
          <Typography style={linksStyle}>
            Please, press Back to login to log in your account
          </Typography>
          <Typography style={linksStyle}>
            <Link style={{ marginLeft: "7px" }} to={"/login"}>
              Back to login
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </div>
  );
};

export default EmailVerified;
