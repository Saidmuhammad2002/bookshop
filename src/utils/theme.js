import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "rgba(98, 0, 238, 1)",
    },
    secondary: {
      main: "rgba(255, 255, 255, 1)",
    },
  },
  typography: {
    fontFamily: [
      "Mulish",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          height: "47px",
          paddingTop: 0,
          paddingBottom: 0,
          boxShadow: "0px 4px 18px 0px #3333330A",
          borderRadius: "6px",
        },
      },
      root: {
        borderRadius: "6px",
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          width: "100%",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          maxHeight: "47px",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: "6px",
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "14px",
          fontWeight: 500,
          color: "#000",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
        },
      },
    },
  },
});
