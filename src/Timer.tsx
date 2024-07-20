import {useEffect, useState} from "react";

type TimerPropsType = {
    initialTimer: number
    onChange: (timer: number) => void
    userId: number
}
export const Timer = (props: TimerPropsType) => {
    const [timer, setTimer] = useState(props.initialTimer)

    useEffect(() => {
        console.log("InitialTimer: " + props.initialTimer)
        setTimer(props.initialTimer)
    }, [/*props.initialTimer*/props.userId])

    useEffect(() => {
        props.onChange(timer)
    }, [timer])

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimer((prev) => prev - 1)
            console.log("tick")
        }, 1000);
        return () => {clearInterval(intervalId)}
    }, [props.userId])

    return (
        <div>{timer}</div>
    )
}