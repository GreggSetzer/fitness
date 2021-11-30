import React, {useState, useEffect, useRef} from 'react';
import './Timer.css';

const Timer = (props) => {
    const FULL_DASH_ARRAY = 283;
    const WARNING_THRESHOLD = props.duration * .5;
    const ALERT_THRESHOLD = props.duration * .25;
    const COLOR_CODES = {
        info: {
            color: "green"
        },
        warning: {
            color: "orange",
            threshold: WARNING_THRESHOLD
        },
        alert: {
            color: "yellow",
            threshold: ALERT_THRESHOLD
        }
    };
    const dial = useRef(0);
    const label = useRef(0);
    const [pathColor, setPathColor] = useState(COLOR_CODES.info.color);

    let timeLeft = props.duration;
    let timerInterval = null;

    const startTimer = () => {
        let timePassed = 0;

        timerInterval = setInterval(() => {
            timePassed = timePassed += 1;
            timeLeft = props.duration - timePassed;
            if (label && label.current) {
                label.current.innerHTML = formatTime(timeLeft);
            }

            if (dial && dial.current) {
                setCircleDasharray();
                setRemainingPathColor(timeLeft);
            }

            if (timeLeft === 0) {
                onTimesUp();
            }
        }, 1000);
    }

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;

        if (seconds < 10) {
            seconds = `0${seconds}`;
        }

        return `${minutes}:${seconds}`;
    }

    const onTimesUp = () => {
        clearInterval(timerInterval);
    }

    const resetColor = () => {
        const { info } = COLOR_CODES;
        setPathColor(info);
    }

    useEffect(() => {
        if (props.enabled) {
            startTimer();
        } else {
            clearInterval();
        }
    }, [startTimer, props.enabled, props.duration, resetColor]);

    useEffect( () => () => clearInterval(), [] );

    function setRemainingPathColor(timeLeft) {
        const { alert, warning, info } = COLOR_CODES;
        if (timeLeft <= 0) {
            dial.current.classList.remove(alert.color);
            dial.current.classList.add(info.color);
        } else if (timeLeft <= alert.threshold) {
            dial.current.classList.remove(warning.color);
            dial.current.classList.add(alert.color);
        } else if (timeLeft <= warning.threshold) {
            dial.current.classList.remove(info.color);
            dial.current.classList.add(warning.color);
        }
    }

    function calculateTimeFraction() {
        const rawTimeFraction = timeLeft / props.duration;
        return rawTimeFraction - (1 / props.duration) * (1 - rawTimeFraction);
    }

    function setCircleDasharray() {
        const circleDasharray = `${(calculateTimeFraction() * FULL_DASH_ARRAY).toFixed(0)} 283`;
        dial.current.setAttribute("stroke-dasharray", circleDasharray);
    }

    if (!props.show) {
        return '';
    }

    return (
        <div className="base-timer">
            <svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <g className="base-timer__circle">
                    <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45" />
                    <path
                        ref={dial}
                        id="base-timer-path-remaining"
                        strokeDasharray="283"
                        className={`base-timer__path-remaining ${pathColor}`}
                        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
                    />
                </g>
            </svg>
            <span id="base-timer-label" className="base-timer__label" ref={label}>{formatTime(
                timeLeft
            )}</span>
        </div>
    )
}

export default Timer;
