import React from 'react';

const StartTimer = (props) => {
    if (!props.show) {
        return '';
    }

    return (
        <div>
            <p className="text-4xl flex items-center justify-center">Get ready!</p>
            <p className="text-8xl flex items-center justify-center">{props.seconds}</p>
        </div>
    )
}

export default StartTimer;