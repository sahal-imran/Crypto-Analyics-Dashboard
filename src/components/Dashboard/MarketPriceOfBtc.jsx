import React, { useState, useEffect } from "react";
import { Typography, Box, Grid } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import CircularProgress from '@mui/material/CircularProgress';

function MarketPriceOfBtc({ Price }) {


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: "#282828",
        height: "250px",
        borderRadius: "10px",
        boxShadow: 10,
        p: 2,
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", justifyContent: { xs: "center", lg: "center" },alignItems:"center", gap: 2, height: "100%" }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: { xs: "18px", md: "10px", lg: "18px" },
textAlign:'center',
            fontWeight: 600,
          }}
        >
          Market Price <br /> BTCUSDT
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* price */}
          <Typography
            sx={{
              color: "white",
              fontSize: { xs: "24px", md: "12px", lg: "26px" },
              fontWeight: 600,
            }}
          >
            {!Price ? "Loading..." : parseFloat(Price).toFixed(2)}
          </Typography>
          {/* percentage */}
          {/* <Typography
            sx={{
              color: "white",
              fontSize: { xs: "16px", md: "12px", lg: "16px" },
              fontWeight: 600,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "5px",
              ml: "16px",
            }}
          >
            +11.01%
            <TrendingUpIcon sx={{ fontSize: "16px", color: "white" }} />
          </Typography> */}
        </Box>
      </Box>
    </Box>
  );
}

const data = [
  {
    name: "Page A",
    uv: 0,
    pv: 0,
    amt: 0,
  },
  {
    name: "Page B",
    uv: 800,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 750,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 950,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 920,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 1000,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3290,
    pv: 4300,
    amt: 2100,
  },
];
export default MarketPriceOfBtc;
