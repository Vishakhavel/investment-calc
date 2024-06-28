import React, { useState } from 'react';
import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Slider,
  Typography,
  Box,
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

const InvestmentCalculator = () => {
  const [initialDeposit, setInitialDeposit] = useState(3000);
  const [contributions, setContributions] = useState(200);
  const [contributionFrequency, setContributionFrequency] = useState('weekly');
  const [yearsToGrow, setYearsToGrow] = useState(30);
  const [annualReturn, setAnnualReturn] = useState(10);

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
    const n =
      contributionFrequency === 'weekly'
        ? 52
        : contributionFrequency === 'monthly'
        ? 12
        : 1;
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

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant='h4' gutterBottom>
        Investment Calculator
      </Typography>
      <TextField
        label='Initial Deposit'
        type='number'
        value={initialDeposit}
        onChange={(e) => setInitialDeposit(Number(e.target.value))}
        fullWidth
        margin='normal'
      />
      <TextField
        label='Contributions'
        type='number'
        value={contributions}
        onChange={(e) => setContributions(Number(e.target.value))}
        fullWidth
        margin='normal'
      />
      <RadioGroup
        value={contributionFrequency}
        onChange={(e) => setContributionFrequency(e.target.value)}
        row
      >
        <FormControlLabel value='annual' control={<Radio />} label='Annual' />
        <FormControlLabel value='monthly' control={<Radio />} label='Monthly' />
        <FormControlLabel value='weekly' control={<Radio />} label='Weekly' />
      </RadioGroup>
      <Typography gutterBottom>Years to Grow</Typography>
      <Slider
        value={yearsToGrow}
        onChange={(e, newValue) => setYearsToGrow(newValue)}
        valueLabelDisplay='auto'
        step={1}
        min={1}
        max={50}
      />
      <TextField
        label='Average Annual Return (%)'
        type='number'
        value={annualReturn}
        onChange={(e) => setAnnualReturn(Number(e.target.value))}
        fullWidth
        margin='normal'
      />
      <Typography variant='h5' gutterBottom>
        Potential Future Balance: ${calculateFutureBalance()}
      </Typography>
      <BarChart width={800} height={400} data={generateChartData()}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='year' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey='balance' fill='#82ca9d' />
      </BarChart>
    </Box>
  );
};

export default InvestmentCalculator;
