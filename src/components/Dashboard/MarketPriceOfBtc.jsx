import React, { useState, useEffect } from "react";
import { Typography, Box, Grid } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import CircularProgress from '@mui/material/CircularProgress';

function MarketPriceOfBtc({ Price }) {


  const apiCall = {
    method: "SUBSCRIBE",
    params: ["btcusdt@trade"],
    id: 1
  };
  const [BTC_INFO, setBTC_INFO] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('wss://stream.binance.com:9443/stream');
    ws.onopen = (event) => {
      ws.send(JSON.stringify(apiCall));
    };
    ws.onmessage = function (event) {
      const json = JSON.parse(event.data);
      try {
        if ((json.data)) {
          const Data = json.data;
          const color = parseFloat(Data.p) === parseFloat(BTC_INFO.p) ? "white" : parseFloat(Data.p) > parseFloat(BTC_INFO.p) ? "green" : "red";
          Data.color = color;
          setBTC_INFO(Data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    //clean up function
    return () => ws.close();
  }, []);
  // console.log(BTC_INFO);



  // const CoinColor = (Price) => {
  //   var coinPrice = parseFloat(Price).toFixed(2)
  //   const LastPrice = parseFloat(localStorage.getItem("LastPrice"));
  //   console.log(LastPrice);
  //   var Color = !LastPrice || LastPrice === coinPrice ? "white" : coinPrice > LastPrice ? "green" : 'red';
  //   localStorage.setItem("LastPrice", coinPrice);
  //   return Color;
  // }
  // console.log(Color)
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
        sx={{ display: "flex", flexDirection: "column", justifyContent: { xs: "center", lg: "center" }, alignItems: "center", gap: 2, height: "100%" }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: { xs: "18px", md: "10px", lg: "18px" },
            textAlign: 'center',
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
              color: `${BTC_INFO.color}`,
              fontSize: { xs: "24px", md: "12px", lg: "26px" },
              fontWeight: 600,
            }}
          >
            {BTC_INFO?.length === 0 ? "Loading..." : parseFloat(BTC_INFO.p).toFixed(2)}
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

export default MarketPriceOfBtc;
