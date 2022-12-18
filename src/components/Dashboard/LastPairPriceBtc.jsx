import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

function LastPairPriceBtc({ BTC_Data,BTC_Bybit_Data }) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "250px",
        background: "#282828",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: 10,
        mt: { xs: 1, md: 0 },
      }}
    >
      {/* binacne price */}
      <Box
        sx={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          p: 2,
          gap: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "18px", md: "10px", lg: "18px" },
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          Last price BTCUSDT<br /> (Binacne)
        </Typography>
        <Typography
          sx={{ fontSize: { xs: "26px", md: "12px", lg: "26px" }, fontWeight: 600, 
          // color: `${+BTC_Data?.priceChange >= 0 ? "green" : "red"}`
          color:"white"
        }}
        >
          {!BTC_Data ? "Loading" : +BTC_Data?.lastPrice}
        </Typography>
      </Box>
      {/* vertical line */}
      <Box sx={{ borderLeft: "0.01rem solid #f0b90c", height: "50%" }}></Box>
      {/* bybit price */}
      <Box
        sx={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          gap: 3,
          p: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "18px", md: "10px", lg: "18px" },

            fontWeight: 600,
            textAlign: "center",
          }}
        >
          Last price BTCUSDT<br /> (Bybit)
        </Typography>
        <Typography
          sx={{ fontSize: { xs: "26px", md: "12px", lg: "26px" }, fontWeight: 600 }}
        >
          {+BTC_Bybit_Data?.lastPrice}
        </Typography>
      </Box>
    </Box>
  );
}

export default LastPairPriceBtc;
