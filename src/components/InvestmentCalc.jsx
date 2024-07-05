import React, { useState, useEffect } from 'react';
// import { style } from './style';
// import styled from 'styled-components';
import './InvestmentCalc.css';

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

// const StyledDiv = styled.div`
//   ${style}
// `;
const InvestmentCalculator = () => {
  const [initialDeposit, setInitialDeposit] = useState(3000);
  const [contributions, setContributions] = useState(200);
  const [contributionFrequency, setContributionFrequency] = useState('weekly');
  const [yearsToGrow, setYearsToGrow] = useState(30);
  const [annualReturn, setAnnualReturn] = useState(8);

  let adjustedContributions = contributions === '' ? 0 : Number(contributions),
    adjustedInitialDeposit = initialDeposit === '' ? 0 : Number(initialDeposit);

  const calculateFutureBalance = () => {
    const n =
      contributionFrequency === 'weekly'
        ? 52
        : contributionFrequency === 'monthly'
        ? 12
        : 1;
    const r = annualReturn / 100 / n;
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

  const generateChartData = () => {
    let n;
    switch (contributionFrequency) {
      case 'daily':
        n = 365;
        break;
      case 'weekly':
        n = 52;
        break;
      case 'monthly':
        n = 12;
        break;
      case 'yearly':
        n = 1;
        break;
      default:
        // let the default case be weekly
        n = 52;
    }
    const r = annualReturn / 100 / n;
    const t = yearsToGrow * n;
    let balance = adjustedInitialDeposit;
    const data = [];
    for (let i = 1; i <= t; i++) {
      let amount = balance * (1 + r) + adjustedContributions;
      let interest = amount - balance;
      balance = balance * (1 + r) + adjustedContributions;
      if (i % n === 0) {
        data.push({
          year: 2024 + Math.floor(i / n),
          amount: Math.floor(amount),
          interest: Math.floor(interest),
          random: 2,
        });
      }
    }
    return data;
  };

  console.log('generateChartData', generateChartData());

  // const barChartOptions = {
  //   grid: {
  //     horizontal: true,
  //     vertical: false,
  //   },
  // };

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
        className='text-centre'
        variant='h4'
        sx={{ display: 'flex', justifyContent: 'center' }}
        gutterBottom
      >
        Investment Calculator
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
            width: '15%',
          }}
        >
          <Typography className='capital heading-text'>
            Initial Deposit
          </Typography>
          <TextField
            type='number'
            value={initialDeposit}
            onChange={(e) => setInitialDeposit(e.target.value)}
            // fullWidth
            margin='normal'
          />
          <Typography className='capital heading-text'>
            Contributions
          </Typography>
          <TextField
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
            Years to Grow - {yearsToGrow} years
          </Typography>
          <Slider
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
            Average Annual Return (%)
          </Typography>
          <TextField
            type='number'
            maxLength='2'
            value={annualReturn}
            onChange={(e) => setAnnualReturn(Number(e.target.value))}
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
        <Stack sx={{ marginLeft: 10 }}>
          <Typography
            variant='h5'
            className='capital text-center heading-text'
            gutterBottom
          >
            Potential Future Balance:
          </Typography>
          <Typography
            variant='h2'
            className='capital text-center heading-text'
            gutterBottom
            fontWeight='bold'
          >
            ${calculateFutureBalance()}
          </Typography>
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
            <Bar dataKey='amount' stackId='a' fill='#82ca9d' />
            <Bar dataKey='random' stackId='a' fill='red' />
          </BarChart>
        </Stack>
      </Box>

      {/* end of the left stack */}
    </Box>
    // </StyledDiv>
  );
};

export default InvestmentCalculator;
