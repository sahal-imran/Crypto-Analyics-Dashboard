import React, { useState, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import PriceTicker from "./PriceTicker";
// import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import MarketPriceOfBtc from "./MarketPriceOfBtc";
import FearAndGreedy from "./FearAndGreedy";
import LastPairPriceBtc from "./LastPairPriceBtc";
import CircularProgress from '@mui/material/CircularProgress';
import { ErrorOutline } from '@mui/icons-material';
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Top5Coin from './CoinList';
import Worst5Coin from './CoinList';

const Index = () => {

  // const socketUrl = "wss://stream.binance.com:9443/stream";
  // const {
  //   sendMessage,
  //   sendJsonMessage,
  //   lastMessage,
  //   lastJsonMessage,
  //   readyState,
  //   getWebSocket,
  // } = useWebSocket(socketUrl, {
  //   onOpen: () => console.log('opened'),
  //   //Will attempt to reconnect on all close events, such as server shutting down
  //   shouldReconnect: (closeEvent) => true,
  // });

  // const handleClickSendMessage = useCallback(
  //   () =>
  //     sendJsonMessage({
  //       method: "SUBSCRIBE",
  //       params: ["btcusdt@trade"],
  //       id: 1
  //     }),
  //   [sendJsonMessage]
  // );


  // useEffect(() => {
  //   handleClickSendMessage();
  // }, [])

  // const connectionStatus = {
  //   [ReadyState.CONNECTING]: "Connecting",
  //   [ReadyState.OPEN]: "Open",
  //   [ReadyState.CLOSING]: "Closing",
  //   [ReadyState.CLOSED]: "Closed",
  //   [ReadyState.UNINSTANTIATED]: "Uninstantiated"
  // }[readyState];

  // console.log(lastJsonMessage?.data);

  const [BTC_Data, set_BTC_Data] = useState([]);
  const [ETH_Data, set_ETH_Data] = useState([]);
  const [SHIB_Data, set_SHIB_Data] = useState([]);
  const [BTC_Bybit_Data, set_BTC_Bybit_Data] = useState([]);
  const [Top5Coins, set_Top5Coins] = useState([]);
  const [Top5Worst, set_Top5Worst] = useState([]);

  const FetchLastPriceBinanceBTC = () => {

    try {
      Promise.all([
        fetch('https://api.binance.com/api/v1/ticker/24hr?symbol=BTCUSDT'),
        fetch('https://api.binance.com/api/v1/ticker/24hr?symbol=ETHUSDT'),
        fetch('https://api.binance.com/api/v1/ticker/24hr?symbol=SHIBUSDT'),
        fetch('https://api-testnet.bybit.com/derivatives/v3/public/tickers?category=linear&symbol=BTCUSDT'),
        fetch('https://api.binance.com/api/v1/ticker/24hr')
      ]).then(function (responses) {
        return Promise.all(responses.map(function (response) {
          return response.json();
        }));
      }).then(function (data) {
        // console.log(data);
        set_BTC_Data(data[0]);
        set_ETH_Data(data[1]);
        set_SHIB_Data(data[2]);
        set_BTC_Bybit_Data(data[3].result.list[0]);
        const Data = data[4];
        Data.sort((a, b) => {
          return parseFloat(b.priceChangePercent) - parseFloat(a.priceChangePercent);
        });
        set_Top5Coins(Data.slice(0, 5));
        Data.sort((a, b) => {
          return parseFloat(a.priceChangePercent) - parseFloat(b.priceChangePercent);
        });
        set_Top5Worst(Data.slice(0, 5));
      })
    } catch (error) {
      console.log("Err while fetching all", error)
    }
  }
  const Intervel = setInterval(function () {
    return "hello"
  }, 2000);

  // console.log(BTC_Bybit_Data);
  useEffect(() => {
    FetchLastPriceBinanceBTC();
  }, [])

  // console.log(BTC_Data)



  return (
    <Box
      sx={{
        maxWidth: "100%",
        maxHeight: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Ist portion */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* header */}
        <Box
          sx={{
            width: "100%",
            height: { xs: "55px", lg: "65px" },
            borderBottom: "1px solid #252931",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#282828",
          }}
        >
          <Typography
            sx={{ color: "#f0b90c", fontSize: { xs: "20px", lg: "26px" } }}
          >
            Crypto Analytics
          </Typography>
        </Box>
        {/* crypto analytics body */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            mt: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* crypto ticket price */}
          <Box sx={{ width: "100%", p: "12px" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={2.4}>
                <PriceTicker Ticker={"btcusdt@ticker"} />
              </Grid>
              <Grid item xs={12} sm={6} md={2.4}>
                <PriceTicker Ticker={"ethusdt@ticker"} />
              </Grid>
              <Grid item xs={12} sm={6} md={2.4}>
                <PriceTicker Ticker={"shibusdt@ticker"} />
              </Grid>
              <Grid item xs={12} sm={6} md={2.4}>
                <PriceTicker Ticker={"btcusdt@ticker"} />
              </Grid>
              <Grid item xs={12} sm={6} md={2.4}>
                <PriceTicker Ticker={"btcusdt@ticker"} />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>

      {/* 2nd portion  */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 4, md: 0 },
          justifyContent: "center",
          alignItems: "start",
          p: "12px",
        }}
      >
        {/* coin statistics */}
        <Box
          sx={{
            width: { xs: "100%", md: "75%" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            pr: { xs: "0px", md: "12px" },
          }}
        >
          {/* market price , fear and greedy index */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row", md: "row" },
                    gap: 2,
                    width: "100%",
                    borderRadius: "10px",
                  }}
                >
                  {/* market price  */}
                  <Box
                    sx={{
                      width: { xs: "100%", sm: "50%" },
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <MarketPriceOfBtc Price={5000} />
                  </Box>
                  {/* fear and greedy  */}
                  <Box
                    sx={{
                      width: { xs: "100%", sm: "50%" },
                      height: { sm: "250px", xs: "236px" },
                    }}
                  >
                    <FearAndGreedy />
                  </Box>
                </Box>
              </Grid>
              {/* Last price futures pair btc/usdt - binance and bybit */}
              <Grid item xs={12} md={6}>
                <LastPairPriceBtc BTC_Data={BTC_Data} BTC_Bybit_Data={BTC_Bybit_Data} />
              </Grid>
            </Grid>
          </Box>

          {/* top 5 top and worst coins in 24 hrs */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              mt: 3,
              borderRadius: "20px",
              position: "relative",
            }}
          >
            {/* top coins */}
            {/* <Box
              sx={{
                width: { xs: "100%", sm: "50%" },
                background: "#282828",
                display: "flex",
                flexDirection: "column",
                gap: 1.2,
                justifyContent: "center",
                alignItems: "start",
                height: "100%",
                borderRadius: "10px",
                p: 2,
                boxShadow: 10,
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontSize: { xs: "18px", md: "10px", lg: "18px" },

                  fontWeight: 600,
                  textAlign: "center",
                }}
              >
                In Last 24 hours top 5 coins
              </Typography>
              <TableContainer>
                <Table sx={{ width: '100%' }} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: "white" }}>Symbol</TableCell>
                      <TableCell sx={{ color: "white" }} align="right">24hVolume</TableCell>
                      <TableCell sx={{ color: "white" }} align="right">24hChange</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Top5Coins.map((row, index) => (
                      <TableRow
                        key={index}
                      >
                        <TableCell sx={{ color: "white", border: "unset" }} component="th" scope="row">
                          {row.symbol}
                        </TableCell>
                        <TableCell sx={{ color: "white", border: "unset" }} align="right">{+row.volume}</TableCell>
                        <TableCell sx={{ color: "white", border: "unset" }} align="right">{+row.priceChangePercent + "%"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box> */}
            <Top5Coin Gainer={true} />
            {/* worst coins */}
            <Worst5Coin Gainer={false} />
            {/* <Box
              sx={{
                width: { xs: "100%", sm: "50%" },

                background: "#282828",
                display: "flex",
                flexDirection: "column",
                gap: 1.2,
                p: 2,
                justifyContent: "center",
                alignItems: "start",
                borderRadius: "10px",
                boxShadow: 10,
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontSize: { xs: "18px", md: "10px", lg: "18px" },

                  fontWeight: 600,
                  textAlign: "center",
                }}
              >
                In Last 24 hours top 5 worst coins
              </Typography>

              <TableContainer>
                <Table sx={{ width: '100%' }} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: "white" }}>Symbol</TableCell>
                      <TableCell sx={{ color: "white" }} align="right">24hVolume</TableCell>
                      <TableCell sx={{ color: "white" }} align="right">24hChange</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Top5Worst.map((row, index) => (
                      <TableRow
                        key={index}
                      >
                        <TableCell sx={{ color: "white", border: "unset" }} component="th" scope="row">
                          {row.symbol}
                        </TableCell>
                        <TableCell sx={{ color: "white", border: "unset" }} align="right">{+row.volume}</TableCell>
                        <TableCell sx={{ color: "white", border: "unset" }} align="right">{+row.priceChangePercent + "%"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box> */}
          </Box>
        </Box>

        {/* !---------Order Box------------- */}
        <Box
          sx={{
            width: { xs: "100%", md: "25%" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            borderLeft: { xs: "none", md: "1px solid #252931" },
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: { xs: "35px", lg: "45px" },
              borderBottom: "1px solid #252931",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ color: "#f0b90c", fontSize: { xs: "20px", lg: "26px" } }}
            >
              Order Book
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Index;
