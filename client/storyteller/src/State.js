import React, {useState} from "react";
import {Button, LinearProgress} from "@mui/material";

export function State() {
    // This is using the React useState() hook
    const [progress, setProgress] = useState(0);


    return (
        <div>
            <h2>useState() Demo</h2>

            <LinearProgress variant="determinate" value={progress}/>
            <Button onClick={() => setProgress(progress + 5)}>Increment</Button>
        </div>
    );
}