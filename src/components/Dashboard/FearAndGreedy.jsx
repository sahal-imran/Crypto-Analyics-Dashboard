import React from "react";
import Box from "@mui/material/Box";

function FearAndGreedy() {
  return (
    <Box
      className="greedyImg"
      sx={{
        width: "100%",
        boxShadow: 10,
        background: "#282828",
        height: "100%",
        borderRadius: "10px",
        position: "relative",
      }}
    >
      <img
        src="https://alternative.me/crypto/fear-and-greed-index.png"
        alt="img"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
      />
    </Box>
  );
}

export default FearAndGreedy;
