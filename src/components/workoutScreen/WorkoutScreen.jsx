import React, { useEffect } from 'react';
import Timer from '../timer/Timer';
import ProgressIndicator from '../processIndicator/ProgressIndicator';
import './WorkoutScreen.css';

const WorkoutScreen = (props) => {
    const {show, plan, exerciseNumber, currentExercise, handleChangeExercise} = props;

    useEffect(() => {
        if (currentExercise && show) {
            setTimeout(() => {
                handleChangeExercise();
            }, currentExercise.duration * 1000)
        }
    }, [currentExercise, show, handleChangeExercise]);

    if (!show || !currentExercise || !plan) {
        return '';
    }

    const exerciseCount = plan.exercises.filter((exercise) => {
        return exercise.isExercise;
    }).length;

    return (
        <div className="h-full">
            <div className="h-full grid grid-cols-3">
                <div className="h-full flex justify-center items-center bg-blue-600">
                    <Timer show={true} enabled={true} duration={currentExercise.duration}/>
                </div>
                <div className="h-full grid grid-rows-2 col-span-2 grid-row-override">
                    <div className="h-full flex justify-center items-center bg-blue-200">
                        <p className="text-9xl flex items-center justify-center">{currentExercise.name}</p>
                    </div>
                    <div className="h-full flex justify-center items-center bg-blue-400 py-8">
                        <ProgressIndicator exerciseCount={exerciseCount} exerciseNumber={Math.ceil(exerciseNumber / 2)} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WorkoutScreen;