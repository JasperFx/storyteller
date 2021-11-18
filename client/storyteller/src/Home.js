import React, {useContext} from 'react';
import {ProjectContext} from "./Model/ProjectContext";
import {ProjectTree} from "./Tree";

export function Home() {
    const {project, dispatch} = useContext(ProjectContext);
    
    
    return (
        <ProjectTree {...project}/>
    );
}