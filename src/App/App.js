import React from "react";
import { CssBaseline, createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";

import SideMenu from "../components/SideMenu";
import Header from "../components/Header";
import Employees from "../pages/Employees/Employees";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#333996",
      light: "#3c44b126"
    },
    secondary: {
      main: "#f83245",
      light: "#f8324526"
    },
    background: {
      default: "#f4f5fd"
    }
  },
  shape: {
    borderRadius: 4
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: "translateZ(0)"
      }
    }
  },
  props: {
    MuiIconButton: {
      disableRipple: true
    }
  }
});

const useStyles = makeStyles({
  main: {
    paddingLeft: "320px",
    width: "100%"
  }
});

export default function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <SideMenu />
      <div className={classes.main}>
        <Header />
        <Employees />
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
}
