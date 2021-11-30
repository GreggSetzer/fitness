import React from 'react';

const ProgressIndicator = (props) => {
    const {exerciseCount, exerciseNumber} = props;
    const tiles = [];

    for (let i = 0; i < exerciseCount; i++) {

        let cssClass = "border border-white w-6 h-6 m-2 ";

        if (exerciseNumber === i && exerciseNumber < exerciseCount) {
            cssClass += 'bg-white animate-pulse';
        }

        if (exerciseNumber > i) {
            cssClass += 'bg-white';
        }

        tiles.push(
            <div className={cssClass} key={i} />
        )
    }

    return (
        <div className="flex">
            {tiles}
        </div>
    )
}

export default ProgressIndicator;