import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import TableRowsIcon from "@mui/icons-material/TableRows";
import PieChartIcon from "@mui/icons-material/PieChart";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";

export function TitleBar(){
    return (<AppBar position="sticky">
        <Toolbar>

            <Typography variant="h6" component="div" mr="25px">
                Storyteller
            </Typography>

            <Tooltip title="Default tree view">
                <IconButton size="large" aria-label="home" color="inherit" href="/">
                    <HomeIcon/>
                </IconButton>
            </Tooltip>

            <Tooltip title="Tabular specifications view">
                <IconButton size="large" aria-label="table" color="inherit" href="/table">
                    <TableRowsIcon />
                </IconButton>
            </Tooltip>

            <Tooltip title="Pie chart specification view">
                <IconButton size="large" aria-label="home" color="inherit" href="/chart">
                    <PieChartIcon/>
                </IconButton>
            </Tooltip>


            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>

            </Typography>

            <Tooltip title="Search for specifications or suites">
                <IconButton size="large" aria-label="search" color="inherit">
                    <SearchIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Advanced actions">
                <IconButton size="large" aria-label="search" color="inherit">
                    <MoreVertIcon />
                </IconButton>
            </Tooltip>
        </Toolbar>
    </AppBar>);
}