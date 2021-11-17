import logo from './logo.svg';
import './App.css';

import { Container } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import HomeIcon from '@mui/icons-material/Home';
import TableRowsIcon from '@mui/icons-material/TableRows';
import PieChartIcon from '@mui/icons-material/PieChart';


import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function Chart() {
  return (
    <div>
      <h2>Chart</h2>
    </div>
  );
}

function Table() {
  return (
    <div>
      <h2>Table</h2>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="sticky">
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
        </AppBar>
          <Container maxWidth="xl">
          <Routes>
            <Route path="/table" element={<Table />} />
            <Route path="/chart" element={<Chart />} />
            <Route exact path="/" element={<Home />} />
          </Routes>
          </Container>

    </Box>
    </Router>
  );
}

export default App;
