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

function Top5Coin() {
    const socketUrl = "wss://stream.binance.com:9443/stream";
    const {
        sendMessage,
        sendJsonMessage,
        lastMessage,
        lastJsonMessage,
        readyState,
        getWebSocket,
    } = useWebSocket(socketUrl, {
        onOpen: () => console.log('opened'),
        //Will attempt to reconnect on all close events, such as server shutting down
        shouldReconnect: (closeEvent) => true,
    });

    const handleClickSendMessage = useCallback(
        () =>
            sendJsonMessage({
                method: "SUBSCRIBE",
                params: ["!ticker@arr"],
                id: 1
            }),
        [sendJsonMessage]
    );


    useEffect(() => {
        handleClickSendMessage();
    }, [])

    const connectionStatus = {
        [ReadyState.CONNECTING]: "Connecting",
        [ReadyState.OPEN]: "Open",
        [ReadyState.CLOSING]: "Closing",
        [ReadyState.CLOSED]: "Closed",
        [ReadyState.UNINSTANTIATED]: "Uninstantiated"
    }[readyState];
console.log(lastJsonMessage?.data)
    const Sort = () => {
        return lastJsonMessage?.data.sort((a, b) => {
            return parseFloat(b.priceChangePercent) - parseFloat(a.priceChangePercent);
        });
    }


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
                        {/* {Sort().map((row, index) => (
                            <TableRow
                                key={index}
                            >
                                <TableCell sx={{ color: "white", border: "unset" }} component="th" scope="row">
                                    {row.s}
                                </TableCell>
                                <TableCell sx={{ color: "white", border: "unset" }} align="right">{+row.v}</TableCell>
                                <TableCell sx={{ color: "white", border: "unset" }} align="right">{+row.P + "%"}</TableCell>
                            </TableRow>
                        ))} */}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default Top5Coin