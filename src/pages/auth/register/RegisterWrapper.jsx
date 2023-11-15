import React, { useState } from "react";
import { Button, Grid, Paper } from "@material-ui/core";
import RegisterClient from "./RegisterClient";
import RegisterHost from "./RegisterHost";

const RegisterWrapper = () => {
  const [userRegistration, setUserRegistration] = useState(false);
  const [hostRegistration, setHostRegistration] = useState(false);
  const userMode = () => {
    setHostRegistration(false);
    setUserRegistration(true);
  };
  const hostMode = () => {
    setUserRegistration(false);
    setHostRegistration(true);
  };
  const paperStyle = {
    padding: "20px 20px",
    width: "40vw",
    margin: "20px auto",
  };
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid>
          <Button
            style={{ marginRight: "10px" }}
            color="primary"
            variant="outlined"
            onClick={userMode}
          >
            I’m looking for a work-place
          </Button>
          <Button onClick={hostMode} color="primary" variant="outlined">
            I have an office
          </Button>
        </Grid>
      </Paper>
      {userRegistration ? <RegisterClient /> : <div></div>}
      {hostRegistration ? <RegisterHost /> : <div></div>}
    </Grid>
  );
};

export default RegisterWrapper;
