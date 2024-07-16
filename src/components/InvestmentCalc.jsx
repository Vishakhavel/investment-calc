import React, { useState, useEffect } from 'react';
// import { style } from './style';
// import styled from 'styled-components';
import './InvestmentCalc.css';
import swipeSwipeImage from '../assets/swipeswipe_logo.png';

import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Slider,
  Typography,
  Box,
  Stack,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { styled } from '@mui/system';
import { grey } from '@mui/material/colors';
import { ThemeProvider } from '@mui/material/styles';

import SwipeTextField from './atom/SwipeTextField';

// const StyledDiv = styled.div`
//   ${style}
// `;

const CustomSlider = styled(Slider)({
  height: 8,
  color: '#2c2c6e', // Color for the track
  '& .MuiSlider-thumb': {
    height: 30,
    width: 30,
    backgroundImage: `url(${swipeSwipeImage})`,
    backgroundSize: 'cover',
    border: 'none',
    '&:focus, &:hover, &.Mui-active': {
      boxShadow: 'inherit',
    },
  },
  '& .MuiSlider-track': {
    border: 'none',
    backgroundColor: '#2c2c6e',
  },
  '& .MuiSlider-rail': {
    opacity: 1,
    backgroundColor: '#e0e0e0',
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

// const CustomTextField = styled(TextField)({
//   '& .MuiInputBase-root': {
//     backgroundColor: '#F9D46D', // Light yellow background color
//     borderRadius: '5px', // Rounded corners
//     // padding: '10px', // Padding inside the input
//   },
//   '& .MuiInputBase-input': {
//     textAlign: 'center', // Center the text
//     fontSize: '1.5em', // Increase font size
//     fontWeight: 'bold', // Make the text bold
//     color: '#2C3E50', // Text color
//   },
//   '& .MuiOutlinedInput-notchedOutline': {
//     borderColor: '#F9D46D', // Border color
//   },
//   '& .MuiSvgIcon-root': {
//     color: '#2C3E50', // Icon color
//   },
// });
const InvestmentCalculator = () => {
  const [initialDeposit, setInitialDeposit] = useState(3000);
  const [contributions, setContributions] = useState(200);
  const [contributionFrequency, setContributionFrequency] = useState('weekly');
  const [yearsToGrow, setYearsToGrow] = useState(30);
  const [annualReturn, setAnnualReturn] = useState(8);

  let adjustedContributions = contributions === '' ? 0 : Number(contributions),
    adjustedInitialDeposit = initialDeposit === '' ? 0 : Number(initialDeposit),
    adjustedAnnualReturn = initialDeposit === '' ? 0 : Number(annualReturn);

  const calculateFutureBalance = () => {
    const n =
      contributionFrequency === 'weekly'
        ? 52
        : contributionFrequency === 'monthly'
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

  const generateChartData = () => [
    { year: '2024', amount: 1000, interest: 0 },
    { year: '2025', amount: 2000, interest: 100 },
    { year: '2026', amount: 3000, interest: 300 },
    { year: '2027', amount: 4000, interest: 600 },
    { year: '2028', amount: 5000, interest: 1000 },
    { year: '2029', amount: 6000, interest: 1500 },
    { year: '2030', amount: 7000, interest: 2100 },
    { year: '2031', amount: 8000, interest: 2800 },
    { year: '2032', amount: 9000, interest: 3600 },
    { year: '2033', amount: 10000, interest: 4500 },
    { year: '2034', amount: 11000, interest: 5500 },
    { year: '2035', amount: 12000, interest: 6600 },
    { year: '2036', amount: 12580, interest: 8608 },
    { year: '2037', amount: 14000, interest: 9800 },
    { year: '2038', amount: 15000, interest: 11100 },
    { year: '2039', amount: 16000, interest: 12500 },
    { year: '2040', amount: 17000, interest: 14000 },
    { year: '2041', amount: 18000, interest: 15600 },
    { year: '2042', amount: 19000, interest: 17300 },
    { year: '2043', amount: 20000, interest: 19100 },
    { year: '2044', amount: 21000, interest: 21000 },
  ];

  // const generateChartData = () => {
  //   let n;
  //   switch (contributionFrequency) {
  //     case 'daily':
  //       n = 365;
  //       break;
  //     case 'weekly':
  //       n = 52;
  //       break;
  //     case 'monthly':
  //       n = 12;
  //       break;
  //     case 'yearly':
  //       n = 1;
  //       break;
  //     default:
  //       // let the default case be weekly
  //       n = 52;
  //   }

  //   const r = annualReturn / 100 / n;
  //   const t = yearsToGrow * n;
  //   let balance = adjustedInitialDeposit;
  //   const data = [];

  //   for (let i = 1; i <= t; i++) {
  //     let newBalance = balance * (1 + r) + adjustedContributions;
  //     let interest = newBalance - balance - adjustedContributions;
  //     balance = newBalance;

  //     if (i % n === 0) {
  //       data.push({
  //         year: 2024 + Math.floor(i / n),
  //         amount: Math.floor(balance),
  //         interest: Math.floor(interest),
  //       });
  //     }
  //   }

  //   return data;
  // };

  console.log('chart data', generateChartData());

  const CustomizedLabel = (props) => (
    <Box {...props}>
      Return: ${props.return}
      Investment: ${props.investment}
    </Box>
  );

  return (
    // <StyledDiv>
    <Box sx={{ p: 4 }} className='main-box'>
      <Typography
        className='text-centre main-heading'
        variant='h3'
        sx={{
          display: 'flex',
          justifyContent: 'center',
          fontFamily: 'Caudex, Arial, sans-serif',
          fontWeight: 700,
        }}
        gutterBottom
      >
        Savings & Investment Calculator
      </Typography>

      {/* content start */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          margin: 10,
        }}
      >
        {/* left section */}
        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'col',
            // width: '15%',
          }}
          className='left-stack'
        >
          <Typography className='capital heading-text'>
            Initial Investment Deposit
          </Typography>
          {/* <TextField
            type='number'
            value={initialDeposit}
            onChange={(e) => setInitialDeposit(e.target.value)}
            // fullWidth
            margin='normal'
          /> */}
          {/* <CustomTextField */}
          <SwipeTextField
            className='field-input'
            symbol='$'
            type='number'
            value={initialDeposit}
            onChange={(e) => setInitialDeposit(e.target.value)}
            // fullWidth
            margin='normal'
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
            onChange={(e) => setContributions(e.target.value)}
            // fullWidth
            margin='normal'
          />
          <RadioGroup
            value={contributionFrequency}
            onChange={(e) => setContributionFrequency(e.target.value)}
            row
            className='radio-group'
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gridTemplateRows: 'repeat(2, 1fr)',
                gap: 2,
                p: 4,
              }}
            >
              <FormControlLabel
                value='annual'
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
            onChange={(e) => setAnnualReturn(e.target.value)}
            // fullWidth
            margin='normal'
            inputProps={{
              maxLength: 10,
              placeholder: '8%',
              defaultValue: '8%',
            }}
          />
        </Stack>

        {/* right section */}
        <Stack sx={{ marginLeft: 10 }} className='right-stack'>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              variant='h6'
              // className='capital text-center heading-text'
              className='capital heading-text'
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
              ${calculateFutureBalance()}
            </Typography>
          </Box>

          <BarChart
            width={800}
            height={400}
            data={generateChartData()}
            // {...barChartOptions}
          >
            {/* <CartesianGrid vertical={false} stroke='green' /> */}
            <XAxis dataKey='year' />
            {/* the graph should move to the right if the number gets huge on the Y axis. handle this. */}
            <YAxis />
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
