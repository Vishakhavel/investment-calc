import React, { useState, useEffect, useMemo } from "react";
// import { style } from './style';
// import styled from 'styled-components';
import "./InvestmentCalc.css";
import swipeSwipeImage from "../assets/swipeswipe_logo.png";

import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Slider,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { styled } from "@mui/system";
import { grey } from "@mui/material/colors";
import { ThemeProvider } from "@mui/material/styles";

import SwipeTextField from "./atom/SwipeTextField";

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
  const [initialDeposit, setInitialDeposit] = useState(3000);
  const [contributions, setContributions] = useState(200);
  const [contributionFrequency, setContributionFrequency] = useState("weekly");
  const [yearsToGrow, setYearsToGrow] = useState(30);
  const [annualReturn, setAnnualReturn] = useState(8);

  let adjustedContributions = contributions === "" ? 0 : Number(contributions),
    adjustedInitialDeposit = initialDeposit === "" ? 0 : Number(initialDeposit),
    adjustedAnnualReturn = initialDeposit === "" ? 0 : Number(annualReturn);

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
    console.log({
      futureBalance,
      adjustedContributions,
      adjustedInitialDeposit,
    });
    return Math.floor(futureBalance);
  };

  const generateChartData = useMemo(() => {
    const rate = annualReturn / 100;

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
    let totalAmount = initialDeposit;
    let previousAmount = initialDeposit;

    const currentYear = new Date().getFullYear();

    let checkData = [];

    for (let year = 1; year <= yearsToGrow; year++) {
      for (let i = 1; i <= n; i++) {
        totalAmount = totalAmount * (1 + rate / n) + Number(contributions);
      }
      const interestEarned = totalAmount - previousAmount - contributions * n;
      checkData.push({
        interestEarned,
        totalAmount,
        previousAmount,
        contributions,
      });
      console.log();
      yearlyAmounts.push({
        // year: year,
        year: Number(currentYear) + year,
        amount: Math.floor(totalAmount),
        interest: Math.floor(interestEarned),
      });
      previousAmount = totalAmount;
    }

    console.log({ checkData });

    return yearlyAmounts;
  }, [
    initialDeposit,
    contributions,
    contributionFrequency,
    yearsToGrow,
    annualReturn,
  ]);

  console.log("chart data", generateChartData);

  const handleInitialDepositChange = (e) => {
    if (Number(e.target.value) <= 999999) {
      setInitialDeposit(e.target.value);
    }
  };
  const handleAnnualReturn = (e) => {
    if (Number(e.target.value) < 100) {
      setAnnualReturn(e.target.value);
    }
  };
  const handleContributionChange = (e) => {
    if (Number(e.target.value) <= 99999) {
      setContributions(e.target.value);
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
    // <StyledDiv>
    <Box sx={{ p: 4 }} className='main-box'>
      <Typography
        className='text-centre main-heading'
        variant='h3'
        sx={{
          display: "flex",
          justifyContent: "center",
          fontFamily: "Caudex, Arial, sans-serif",
          fontWeight: 700,
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
          className='left-stack'
        >
          <Typography className='capital heading-text'>
            Initial Investment Deposit
          </Typography>
          <SwipeTextField
            className='field-input'
            symbol='$'
            type='number'
            value={initialDeposit}
            // onChange={(e) => setInitialDeposit(e.target.value)}
            // onChange={(e) => handleInitialDepositChange(e)}
            onChange={(e) => handleInitialDepositChange(e)}
            // fullWidth
            margin='normal'
            // max={100}
            // min={0}
            // inputProps={{ max: 100, min: 0 }}

            // inputProps={{
            //   placeholder: "0%",
            //   // defaultValue: "8%",
            // }}
            placeholder='0'
          />
          <Typography className='capital heading-text'>
            Contributions
          </Typography>
          {/* <TextField
            type='number'
            value={contributions}
            onChange={(e) => setContributions(e.target.value)}
            // fullWidth
            margin='normal'
          /> */}
          <SwipeTextField
            className='field-input'
            symbol='$'
            type='number'
            value={contributions}
            // onChange={(e) => setContributions(e.target.value)}
            onChange={(e) => handleContributionChange(e)}
            // fullWidth
            margin='normal'
            placeholder='0'
          />
          <RadioGroup
            value={contributionFrequency}
            onChange={(e) => setContributionFrequency(e.target.value)}
            row
            className='radio-group'
            // sx={{ alignItems: "center" }}
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
                value='yearly'
                control={<Radio />}
                label='Annual'
              />
              <FormControlLabel
                value='monthly'
                control={<Radio />}
                label='Monthly'
              />
              <FormControlLabel
                value='weekly'
                control={<Radio />}
                label='Weekly'
              />
              <FormControlLabel
                value='daily'
                control={<Radio />}
                label='Daily'
              />
            </Box>
          </RadioGroup>
          <Typography gutterBottom className='heading-text capital'>
            {yearsToGrow} Years to Grow
          </Typography>

          <CustomSlider
            value={yearsToGrow}
            onChange={(e, newValue) => setYearsToGrow(newValue)}
            valueLabelDisplay='auto'
            step={1}
            min={1}
            max={50}
            size='small'
            color='secondary'
          />
          <Typography className='capital heading-text'>
            Average Annual Return
          </Typography>
          {/* <TextField
            type='number'
            maxLength='2'
            value={annualReturn}
            onChange={(e) => setAnnualReturn(e.target.value)}
            // fullWidth
            margin='normal'
            inputProps={{
              maxLength: 10,
              placeholder: '8%',
              defaultValue: '8%',
            }}
          /> */}
          <SwipeTextField
            // symbol
            className='field-input'
            type='number'
            maxLength='2'
            value={annualReturn}
            // onChange={(e) => setAnnualReturn(e.target.value)}
            onChange={(e) => handleAnnualReturn(e)}
            // fullWidth
            margin='normal'
            inputProps={{
              // maxLength: 10,
              placeholder: "0%",
              // defaultValue: "8%",
            }}
          />
        </Stack>

        {/* right section */}
        <Stack sx={{ marginLeft: 10 }} className='right-stack'>
          {/* <Box sx={{ display: "flex", justifyContent: "space-between" }}> */}
          <Box>
            <Typography
              variant='h6'
              // className='capital text-center heading-text'
              className='capital heading-text text-center'
              gutterBottom
            >
              Potential Future Balance in {yearsToGrow} years
            </Typography>
            <Typography
              variant='h3'
              className='capital text-center heading-text'
              gutterBottom
              fontWeight='bold'
            >
              ${calculateFutureBalance().toLocaleString("en-US")}
            </Typography>
          </Box>

          <BarChart
            width={800}
            height={400}
            data={generateChartData}
            // {...barChartOptions}
          >
            {/* <CartesianGrid vertical={false} stroke='green' /> */}
            <XAxis dataKey='year' />
            {/* the graph should move to the right if the number gets huge on the Y axis. handle this. */}
            <YAxis tickFormatter={formatAxisText} />
            <Tooltip />
            <Legend />
            <Bar dataKey='amount' stackId='a' fill='#293A60' />
            <Bar dataKey='interest' stackId='a' fill='#FBC950' />
          </BarChart>
        </Stack>
      </Box>

      {/* end of the left stack */}
    </Box>
    // </StyledDiv>
  );
};

export default InvestmentCalculator;
