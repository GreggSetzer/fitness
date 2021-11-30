import React from 'react';

const CompletedScreen = (props) => {

    if (!props.show) {
        return '';
    }

    return (
        <div className="h-full flex items-center justify-center">
            <p className="text-9xl">All done!</p>
        </div>
    )
}

export default CompletedScreen;