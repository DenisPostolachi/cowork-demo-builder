import React from "react";
import { Grid } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import AppBar from "../../layout/builder/AppBar";
import "../../App.css";
import ToolBar from "../../layout/builder/ToolBar";
import GridContainer from "../../layout/builder/GridContainer";
import CoordinateToolTip from "./CoordinateToolTip";
import MouseToolTip from "./MouseToolTip";
import { isMobile } from "react-device-detect";

function Builder() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#24292E",
      },
    },
  });

  return (
    <div>
      <ThemeProvider theme={theme}>
        {!isMobile ? (
          <>
            <Grid container>
              <Grid item xs={12}>
                <AppBar />
              </Grid>

              <Grid item>
                <ToolBar />
              </Grid>

              <Grid
                item
                xs
                style={{ height: "calc(100vh - 64px)", overflow: "scroll" }}
              >
                <GridContainer />
              </Grid>
            </Grid>

            <CoordinateToolTip />
            <MouseToolTip />
          </>
        ) : (
          <div style={{ position: "fixed", top: "30%", width: "100vw" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {/*<img width="112" height="112" src={logo} />*/}
            </div>
          </div>
        )}
      </ThemeProvider>
    </div>
  );
}

export default Builder;
