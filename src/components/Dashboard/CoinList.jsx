import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useState, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

function Top5Coin({ Gainer }) {


    const apiCall = {
        method: "SUBSCRIBE",
        params: ["!ticker@arr"],
        id: 1
    };
    const [Tickers, setTickers] = useState([]);

    useEffect(() => {
        const ws = new WebSocket('wss://stream.binance.com:9443/stream');
        ws.onopen = (event) => {
            ws.send(JSON.stringify(apiCall));
        };
        ws.onmessage = function (event) {
            const json = JSON.parse(event.data);
            try {
                if (json.data) {
                    const Data = json.data;
                    Data.sort((a, b) => {
                        return Gainer ? parseFloat(b.P) - parseFloat(a.P) : parseFloat(a.P) - parseFloat(b.P);
                    });
                    setTickers(Data.slice(0, 5));
                }
            } catch (err) {
                console.log(err);
            }
        };
        //clean up function
        return () => ws.close();
    }, []);
    // console.log(Tickers);


    return (
        <Box
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
                        {Tickers?.map((row, index) => (
                            <TableRow
                                key={index}
                            >
                                <TableCell sx={{ color: "white", border: "unset" }} component="th" scope="row">
                                    {row.s}
                                </TableCell>
                                <TableCell sx={{ color: "white", border: "unset" }} align="right">{+row.v}</TableCell>
                                <TableCell sx={{ color: "white", border: "unset" }} align="right">{+row.P + "%"}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default Top5Coin