import { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";

type TimerPropsType = {
    initialTimer: number;
    onChange: (timer: number) => void;
    userId: number;
};

export const Timer = (props: TimerPropsType) => {
    const [timer, setTimer] = useState(props.initialTimer);

    useEffect(() => {
        console.log("InitialTimer: " + props.initialTimer);
        setTimer(props.initialTimer);
    }, [props.userId]);

    useEffect(() => {
        props.onChange(timer);
    }, [timer]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimer((prev) => prev - 1);
            console.log("tick");
        }, 1000);
        return () => {
            console.log("Clear interval")
            clearInterval(intervalId);
        };
    }, [props.userId]);

    return (
        <Box display="flex" justifyContent="center" alignItems="center" p={2}>
            <Typography variant="h4">{timer}</Typography>
        </Box>
    );
};
