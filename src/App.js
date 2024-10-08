import "./App.css";
import InvestmentCalculator from "./components/InvestmentCalc";
import { ThemeProvider } from "styled-components";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <InvestmentCalculator />
    </ThemeProvider>
  );
  // return;
}

export default App;
