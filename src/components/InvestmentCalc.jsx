import React, { useState } from 'react';
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

  const calculateFutureBalance = () => {
    const n =
      contributionFrequency === 'weekly'
        ? 52
        : contributionFrequency === 'monthly'
        ? 12
        : 1;
    const r = annualReturn / 100 / n;
    const t = yearsToGrow * n;
    let futureBalance = initialDeposit * Math.pow(1 + r, t);
    for (let i = 1; i <= t; i++) {
      futureBalance += contributions * Math.pow(1 + r, t - i);
    }
    return futureBalance.toFixed(2);
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
    let balance = initialDeposit;
    const data = [];
    for (let i = 1; i <= t; i++) {
      balance = balance * (1 + r) + contributions;
      if (i % n === 0) {
        data.push({ year: 2024 + Math.floor(i / n), balance: balance });
      }
    }
    return data;
  };

  const barChartOptions = {
    grid: {
      horizontal: true,
      vertical: false,
    },
  };

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
            onChange={(e) => setInitialDeposit(Number(e.target.value))}
            // fullWidth
            margin='normal'
          />
          <Typography className='capital heading-text'>
            Contributions
          </Typography>
          <TextField
            type='number'
            value={contributions}
            onChange={(e) => setContributions(Number(e.target.value))}
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
            {...barChartOptions}
          >
            {/* displays the grid lines. */}
            {/* fill='#F6DA0D' */}
            <CartesianGrid vertical={false} stroke='green' />
            <XAxis dataKey='year' />
            {/* the graph should move to the right if the number gets huge on the Y axis. handle this. */}
            <YAxis />
            <Tooltip />
            {/* <Legend /> */}
            <Bar dataKey='balance' label={<CustomizedLabel />} fill='#82ca9d' />
          </BarChart>
        </Stack>
      </Box>

      {/* end of the left stack */}
    </Box>
    // </StyledDiv>
  );
};

export default InvestmentCalculator;
