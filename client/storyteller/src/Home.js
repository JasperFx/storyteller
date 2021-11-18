import {Button, LinearProgress} from "@mui/material";
import React, {useState} from 'react';

export function Home() {

    // This is using the React useState() hook
    const [progress, setProgress] = useState(0);
    
    
    return (
        <div>
            <h2>Home</h2>

            <h3>Below is a demonstration of useState()</h3>
            <LinearProgress variant="determinate" value={progress} />
            <Button onClick={() => setProgress(progress + 5)}>Increment</Button>
            
        </div>
    );
}