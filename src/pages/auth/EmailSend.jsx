import React from "react";
import { Avatar, Grid, Paper, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const EmailSend = () => {
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
            <h2>Email Confirmation</h2>
          </Grid>
          <Typography style={linksStyle}>
            A message has been sent to your email address.
          </Typography>
          <Typography style={linksStyle}>
            You need to confirm the validity of the email address by accessing
            the link in the message.
          </Typography>
          <Typography style={linksStyle}>
            The message may arrive late or may be in spam folder.
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

export default EmailSend;
