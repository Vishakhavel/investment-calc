import React, { useState, useMemo } from "react";
import "./InvestmentCalc.css";
import swipeSwipeImage from "../assets/swipeswipe_logo.png";

import {
  Radio,
  RadioGroup,
  FormControlLabel,
  Slider,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { styled } from "@mui/system";

import SwipeTextField from "./atom/SwipeTextField";
import CustomGraphTooltip from "./atom/CustomGraphTooltip";

const CustomSlider = styled(Slider)({
  height: 8,
  color: "#2c2c6e", // Color for the track
  "& .MuiSlider-thumb": {
    height: 30,
    width: 30,
    backgroundImage: `url(${swipeSwipeImage})`,
    backgroundSize: "cover",
    border: "none",
    "&:focus, &:hover, &.Mui-active": {
      boxShadow: "inherit",
    },
  },
  "& .MuiSlider-track": {
    border: "none",
    backgroundColor: "#2c2c6e",
  },
  "& .MuiSlider-rail": {
    opacity: 1,
    backgroundColor: "#e0e0e0",
  },
  // '& .MuiSlider-valueLabel': {
  //   left: 'calc(-50% + 12px)',
  //   top: 30,
  //   '& *': {
  //     background: 'transparent',
  //     color: '#2c2c6e', // Color for the value label
  //   },
  // },
});

const InvestmentCalculator = () => {
  // const [initialDeposit, setInitialDeposit] = useState(3000);
  const [initialDeposit, setInitialDeposit] = useState("100");
  // const [contributions, setContributions] = useState(200);
  const [contributions, setContributions] = useState("200");
  const [contributionFrequency, setContributionFrequency] = useState("weekly");
  const [yearsToGrow, setYearsToGrow] = useState(30);
  const [annualReturn, setAnnualReturn] = useState(8);

  let adjustedContributions =
      contributions === "" ? 0 : parsePlaceholderNumber(contributions),
    adjustedInitialDeposit =
      initialDeposit === "" ? 0 : parsePlaceholderNumber(initialDeposit),
    adjustedAnnualReturn =
      annualReturn === "" ? 0 : parsePlaceholderNumber(annualReturn);

  const calculateFutureBalance = () => {
    const n =
      contributionFrequency === "weekly"
        ? 52
        : contributionFrequency === "monthly"
        ? 12
        : 1;
    const r = adjustedAnnualReturn / 100 / n;
    const t = yearsToGrow * n;
    let futureBalance = adjustedInitialDeposit * Math.pow(1 + r, t);
    for (let i = 1; i <= t; i++) {
      futureBalance += adjustedContributions * Math.pow(1 + r, t - i);
    }
    return Math.floor(futureBalance);
  };

  const formatPlaceholderNumber = (num) => {
    if (!num) return "";
    const parts = num.toString().split(".");
    parts[0] = parts[0].split(",").join("");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  // function to parse and return a numeric value of the comma seperated placeholder value
  function parsePlaceholderNumber(formattedNum) {
    if (typeof formattedNum === "number") return formattedNum;
    else if (!formattedNum) return 0;

    console.log({ formattedNum });

    return parseFloat(formattedNum.replace(/,/g, ""));
  }

  const chartData = useMemo(() => {
    const rate = annualReturn / 100;
    const contributionNumber = parsePlaceholderNumber(contributions);
    const initialDepositNumber = parsePlaceholderNumber(initialDeposit);

    console.log({ initialDepositNumber, contributionNumber });

    let n;
    switch (contributionFrequency) {
      case "daily":
        n = 365;
        break;
      case "weekly":
        n = 52;
        break;
      case "monthly":
        n = 12;
        break;
      case "yearly":
        n = 1;
        break;
      default:
        throw new Error(
          'Invalid compounding frequency. Choose from "daily", "weekly", "monthly", or "yearly".'
        );
    }

    const yearlyAmounts = [];
    let totalAmount = initialDepositNumber;
    let principalAndContributions = initialDepositNumber;
    let previousAmount = initialDepositNumber;

    const currentYear = new Date().getFullYear();

    for (let year = 1; year <= yearsToGrow; year++) {
      for (let i = 1; i <= n; i++) {
        // totalAmount = totalAmount * (1 + rate / n) + Number(contributions);
        totalAmount = totalAmount * (1 + rate / n) + contributionNumber;
        // principalAndContributions just stores the initialDeposit and the subsequent contributions
        principalAndContributions += contributionNumber;
      }
      const interestEarned = totalAmount - previousAmount - contributions * n;

      yearlyAmounts.push({
        year: Number(currentYear) + year,
        amount: Math.floor(totalAmount),
        // investment and return are the 2 fields to be used in the chart
        Return: Math.floor(interestEarned),
        Invested: Math.floor(principalAndContributions),
      });
      previousAmount = totalAmount;
    }

    return yearlyAmounts;
  }, [
    initialDeposit,
    contributions,
    contributionFrequency,
    yearsToGrow,
    annualReturn,
  ]);

  const handleInitialDepositChange = (e) => {
    if (parsePlaceholderNumber(e.target.value) <= 999999) {
      console.log("number valeu", Number(e.target.value));
      setInitialDeposit(formatPlaceholderNumber(e.target.value));
    }
  };
  const handleAnnualReturn = (e) => {
    if (Number(e.target.value) < 100) {
      setAnnualReturn(e.target.value);
    }
  };
  const handleContributionChange = (e) => {
    if (Number(e.target.value) <= 99999) {
      setContributions(formatPlaceholderNumber(e.target.value));
    }
  };

  console.log({ annualReturn, initialDeposit, contributions, yearsToGrow });

  const formatAxisText = (value) => {
    if (value >= 1e6) {
      return (value / 1e6).toFixed(1) + "M";
    } else if (value >= 1e3) {
      return (value / 1e3).toFixed(1) + "k";
    }
    return value.toString();
  };

  return (
    <Box sx={{ p: 4 }} className="main-box">
      <Typography
        className="text-centre main-heading"
        variant="h3"
        sx={{
          display: "flex",
          justifyContent: "center",
          fontFamily: "Caudex, Arial, sans-serif",
          fontWeight: 700,
          color: "#293a60",
        }}
        gutterBottom
      >
        Savings & Investment Calculator
      </Typography>

      {/* content start */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          margin: 10,
        }}
      >
        {/* left section */}
        <Stack
          sx={{
            display: "flex",
            flexDirection: "col",
            alignItems: "center",
            // width: '15%',
          }}
          className="left-stack"
        >
          <Typography className="capital heading-text">
            Initial Investment Deposit
          </Typography>
          <SwipeTextField
            className="field-input"
            symbol="$"
            // type="number"
            value={initialDeposit}
            onChange={(e) => handleInitialDepositChange(e)}
            margin="normal"
            placeholder="0"
          />
          <Typography className="capital heading-text">
            Contributions
          </Typography>

          <SwipeTextField
            className="field-input"
            symbol="$"
            // type="number"
            value={contributions}
            onChange={(e) => handleContributionChange(e)}
            margin="normal"
            placeholder="0"
          />
          <RadioGroup
            value={contributionFrequency}
            onChange={(e) => setContributionFrequency(e.target.value)}
            row
            className="radio-group"
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gridTemplateRows: "repeat(2, 1fr)",
                gap: 2,
                p: 4,
              }}
            >
              <FormControlLabel
                value="yearly"
                control={<Radio />}
                label="Annual"
              />
              <FormControlLabel
                value="monthly"
                control={<Radio />}
                label="Monthly"
              />
              <FormControlLabel
                value="weekly"
                control={<Radio />}
                label="Weekly"
              />
              <FormControlLabel
                value="daily"
                control={<Radio />}
                label="Daily"
              />
            </Box>
          </RadioGroup>
          <Typography gutterBottom className="heading-text capital">
            {yearsToGrow} Years to Grow
          </Typography>

          <CustomSlider
            value={yearsToGrow}
            onChange={(e, newValue) => setYearsToGrow(newValue)}
            valueLabelDisplay="auto"
            step={1}
            min={1}
            max={50}
            size="small"
            color="secondary"
          />
          <Typography className="capital heading-text">
            Average Annual Return
          </Typography>

          <SwipeTextField
            // symbol
            className="field-input"
            type="number"
            maxLength="2"
            value={annualReturn}
            onChange={(e) => handleAnnualReturn(e)}
            margin="normal"
            inputProps={{
              placeholder: "0%",
            }}
          />
        </Stack>

        {/* right section */}
        <Stack sx={{ marginLeft: 10 }} className="right-stack">
          <Box>
            <Typography
              variant="h6"
              className="capital heading-text text-center"
              gutterBottom
            >
              Potential Future Balance in {yearsToGrow} years
            </Typography>
            <Typography
              variant="h3"
              className="capital text-center heading-text"
              gutterBottom
              fontWeight="bold"
            >
              ${calculateFutureBalance().toLocaleString("en-US")}
            </Typography>
          </Box>

          <BarChart width={800} height={400} data={chartData}>
            <XAxis dataKey="year" />
            <YAxis tickFormatter={formatAxisText} />
            <Tooltip content={<CustomGraphTooltip chartData={chartData} />} />
            <Legend />
            {/* <Bar dataKey="amount" stackId="a" fill="#293A60" /> */}
            <Bar dataKey="Invested" stackId="a" fill="#293A60" />
            <Bar dataKey="Return" stackId="a" fill="#FBC950" />
          </BarChart>
        </Stack>
      </Box>

      {/* end of the left stack */}
    </Box>
  );
};

export default InvestmentCalculator;
