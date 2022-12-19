import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

function PriceTicker({ Ticker }) {
  const apiCall = {
    method: "SUBSCRIBE",
    params: [Ticker],
    id: 1
  };
  const [Coin_INFO, setCoin_INFO] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('wss://stream.binance.com:9443/stream');
    ws.onopen = (event) => {
      ws.send(JSON.stringify(apiCall));
    };
    ws.onmessage = function (event) {
      const json = JSON.parse(event.data);
      try {
        if ((json.data)) {
          setCoin_INFO(json.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    //clean up function
    return () => ws.close();
  }, []);
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        background: "#E3F5FF",
        p: { xs: 2, lg: 3 },
        gap: 2,
        borderRadius: "10px",
      }}
    >
      {/* coin name */}
      <Typography
        sx={{
          color: "black",
          fontSize: { xs: "18px", md: "10px", lg: "18px" },
          fontWeight: 600,
        }}
      >
        {Coin_INFO.s}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "space-between", lg: "space-between" },
          alignItems: "center",
        }}
      >
        {/* price */}
        <Typography
          sx={{
            color: `${+Coin_INFO.P > 0 ? "green" : "red"}`,
            fontSize: { xs: "26px", md: "12px", lg: "26px" },
            fontWeight: 600,
          }}
        >
          {parseFloat(Coin_INFO.c)}
        </Typography>
        {/* percentage */}
        <Typography
          sx={{
            color: `${+Coin_INFO.P > 0 ? "green" : "red"}`,
            fontSize: { xs: "16px", md: "12px", lg: "16px" },
            fontWeight: 600,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "5px",
            ml: "16px",
          }}
        >
          {+Coin_INFO.P > 0 ? "+" + Coin_INFO.P : Coin_INFO.P}
          {+Coin_INFO.P > 0 ? <TrendingUpIcon sx={{ fontSize: "16px" }} /> : <TrendingDownIcon sx={{ fontSize: "16px" }} />}
        </Typography>
      </Box>
    </Box>
  );
}

export default PriceTicker;
