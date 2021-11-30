import React, { useState } from 'react';
import StartTimer from '../startTimer/StartTimer';

const StartScreen = (props) => {
    const [timer, setTimer] = useState(10);
    const [showStartTimerScreen, setShowStartTimerScreen] = useState(false);

    if (!props.show) {
        return '';
    }

    const handleStartTimerOnClick = () => {
        let timeRemaining = timer;

        setShowStartTimerScreen(true);

        const interval = setInterval(() => {
            console.log(timeRemaining)
            if (timeRemaining > 1) {
                timeRemaining--;
                setTimer(timeRemaining);
            } else {
                clearInterval(interval);
                props.handleShowWorkout(true);
            }
        }, 1000);
    }

    const buttonCSS = 'inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500';
    return (
        <div className="h-full flex justify-center items-center">
            { showStartTimerScreen === false ?
                <button className={buttonCSS} onClick={handleStartTimerOnClick}>Start Workout</button> : '' }
            <StartTimer seconds={timer} show={showStartTimerScreen}/>
        </div>
    )
}

export default StartScreen;