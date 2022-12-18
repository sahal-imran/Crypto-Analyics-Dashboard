import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

function PriceTicker() {
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
          fontSize: { xs: "18px",md:"10px", lg: "18px" },
          fontWeight: 600,
        }}
      >
        Btscusdt
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
            color: "black",
            fontSize: { xs: "26px", md:"12px",lg: "26px" },
            fontWeight: 600,
          }}
        >
          77.00K
        </Typography>
        {/* percentage */}
        <Typography
          sx={{
            color: "black",
            fontSize: { xs: "16px",md:"12px", lg: "16px" },
            fontWeight: 600,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "5px",
            ml: "16px",
          }}
        >
          +11.01%
          <TrendingUpIcon sx={{ fontSize: "16px" }} />
        </Typography>
      </Box>
    </Box>
  );
}

export default PriceTicker;
