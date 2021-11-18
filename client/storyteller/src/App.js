import './App.css';
import {Container} from '@mui/material';
import Box from '@mui/material/Box';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Home} from "./Home";
import {Chart} from "./Chart";
import {Table} from "./Table";
import {State} from "./State";
import React, {useEffect, useReducer} from "react";
import {TitleBar} from "./TitleBar";
import {ProjectReducer} from "./Model/ProjectReducer";
import {Counts, Project} from "./Model/Specifications";
import {ProjectContext} from "./Model/ProjectContext";

function App() {
  const [project, dispatch] = useReducer(ProjectReducer, new Project());

  // THIS HAS TO BE DONE IN useEffect() to prevent an infinite loop
  useEffect(() => {
    // Cheating here.
    const initialData = {
      type: 'initial',
      name: 'My Testing Project',
      specs: [
        {title: 'The first spec', id: '1', suite: 'Folder 1'},
        {title: 'The second spec', id: '2', suite: 'Folder 1'},
        {title: 'The third spec', id: '3', suite: 'Folder 2'},
        {title: 'The fourth spec', id: '4', suite: 'Folder 3'},
        {title: 'The fifth spec', id: '5', suite: 'Folder 3'},
        {title: 'The sixth spec', id: '6', suite: 'Folder 3'}
      ]
    }

    dispatch(initialData);
    
    dispatch({type: 'spec-finished', id: "1", counts: new Counts(1, 0, 0)});
    dispatch({type: 'spec-finished', id: "2", counts: new Counts(1, 2, 0)});
  });
  

  
  return (
      <ProjectContext.Provider value={{project, dispatch}}>
      <Router>
        <Box sx={{flexGrow: 1}}>
          <TitleBar />
          <Container maxWidth="xl">
            <Routes>
              <Route path="/table" element={<Table/>}/>
              <Route path="/chart" element={<Chart/>}/>
              <Route path="/state" element={<State/>}/>
              <Route exact path="/" element={<Home />}/>
            </Routes>
          </Container>

        </Box>
      </Router>
    </ProjectContext.Provider>
  );
}

export default App;
