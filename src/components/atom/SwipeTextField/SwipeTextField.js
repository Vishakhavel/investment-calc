import React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
// import CustomTextField from '../CustomTextField';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

const CustomTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    backgroundColor: '#F9D46D', // Light yellow background color
    borderRadius: '5px', // Rounded corners
    // padding: '10px', // Padding inside the input
  },
  '& .MuiInputBase-input': {
    textAlign: 'center', // Center the text
    fontSize: '1.5em', // Increase font size
    fontWeight: 'bold', // Make the text bold
    color: '#2C3E50', // Text color
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#F9D46D', // Border color
  },
  '& .MuiSvgIcon-root': {
    color: '#2C3E50', // Icon color
  },
});

const SwipeTextField = ({ symbol = '', max = 100, min = 0, ...props }) => {
  console.log({ max, min });
  return (
    <CustomTextField
      type='number'
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>{symbol}</InputAdornment>
        ),
        min: 0,
        max: 100,
      }}
      variant='outlined'
      inputProps={{ max: 100, min: 0 }}
      {...props}
      // inputProps={{ min: 0, max: 100 }}
    />
  );
};

export default SwipeTextField;
