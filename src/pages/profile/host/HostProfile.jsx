import React from "react";
import { Container, Grid, Paper } from "@material-ui/core";
import { useSelector } from "react-redux";

const HostProfile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  const paperStyle = {
    padding: "20px",
    margin: "20px auto",
  };
  return (
    <div>
      <Container maxWidth="lg">
        <Grid>
          <Paper elevation={10} style={paperStyle}>

          </Paper>
        </Grid>
      </Container>
    </div>
  );
};

export default HostProfile;
