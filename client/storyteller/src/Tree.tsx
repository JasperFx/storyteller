import {Project, Specification, SpecificationResult, SpecificationState, Suite} from "./Model/Specifications";
import Box from "@mui/material/Box";
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

export function ProjectTree(project : Project){
    const elements : JSX.Element[] = [];
    project.suites.forEach((suite, key) => elements.push(SuiteNode(suite)));
    
    return (

        <Box sx={{flexGrow: 1}} marginTop='25px'>
            <div>{project.name}</div>
            <div style={{marginLeft: '20px'}}>{elements}</div>
        </Box>
    )
}

export function SuiteNode(suite: Suite) : JSX.Element {
    const elements = suite.specs.map(spec => SpecLeaf(spec));

    return (
        <div>
            <div><FolderOpenIcon />{suite.path}</div>
            <div style={{marginLeft: '20px'}}>{elements}</div>
            
        </div>
        
    )
}

export function SpecLeaf(spec: Specification){
    let element: JSX.Element;
    
    switch (spec.state){
        case SpecificationState.None:
            switch (spec.result()){
                case SpecificationResult.None:
                    element = (<CircleOutlinedIcon />);
                    break;
                case SpecificationResult.Failed:
                    element = (<ErrorIcon htmlColor="red"/>);
                    break;
                case SpecificationResult.Success:
                    element = (<CheckCircleIcon htmlColor="green"/>);
                    break;

            }
            
            
            break;
        case SpecificationState.Queued:
            element = (<HourglassEmptyOutlinedIcon />);
            break;
        case SpecificationState.Running:
            element = (<ChangeCircleOutlinedIcon />);
            break;
    }
    
    return (
        <div>{element} {spec.title}</div>
    )
}