import React from "react";
import { Box, Container, Typography, useTheme } from "@mui/material";

const CustomGraphTooltip = ({
  active,
  payload,
  label,
  chartData,
  ...props
}) => {
  const theme = useTheme();
  if (!active || !label) {
    return null;
  }
  const data = chartData.find((data) => data.year === label);
  console.log("data inside tooltip", data);

  if (!data) return null;

  console.log({ active, payload, label, chartData });

  return (
    <Container
      sx={{
        backgroundColor: "white",
        width: "auto",
        padding: "10px",
        borderRadius: "10px",
      }}
    >
      <Box sx={{ paddingBottom: "5px" }}>
        <Typography variant="h6">{label}</Typography>
      </Box>
      <Box>
        <Typography variant="h6" sx={{ color: "primary" }}>
          Balance: ${(data?.Invested + data?.Return).toLocaleString("en-US")}
        </Typography>
      </Box>
      <Box>
        <Typography sx={{ color: "grey" }}>
          Investment: {data.Invested.toLocaleString("en-US")}
        </Typography>
      </Box>
      <Box>
        <Typography sx={{ color: "grey" }}>
          Return: {data.Return.toLocaleString("en-US")}
        </Typography>
      </Box>
    </Container>
  );
};

export default CustomGraphTooltip;
