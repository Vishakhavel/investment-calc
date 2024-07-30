import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Libre Franklin, Arial, sans-serif", // Set your desired font family
    // You can customize other typography options here
  },
  palette: {
    primary: { main: "#2c3c64" },
    secondary: { main: "#00000" },
    // secondaryFontColor: "#e5e8ea",
  },
});

export default theme;
