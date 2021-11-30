import './App.css';
import { useEffect, useState } from 'react';
import StartScreen from './components/startScreen/StartScreen';
import WorkoutScreen from './components/workoutScreen/WorkoutScreen';
import { exercises } from './data/exercises';
import CompletedScreen from './components/completedScreen/CompletedScreen';

function App() {
    const [exerciseNumber, setExerciseNumber] = useState(0);
    const [plan] = useState(exercises[0]);
    const [currentExercise, setCurrentExercise] = useState(null);
    const [showWorkoutScreen, setShowWorkoutScreen] = useState(false);
    const [showStartScreen, setShowStartScreen] = useState(true);
    const [showCompletedScreen, setShowCompletedScreen] = useState(false);

    // Get the first exercise after page loads.
    useEffect(() => {
        setCurrentExercise(plan.exercises[0]);
    }, [showWorkoutScreen, plan]);

    const handleChangeExercise = () => {
        let found = false;
        for (let i = 0; i <= plan.exercises.length - 1; i++) {
            const tempExercise = plan.exercises[i];

            if (found) {
                setCurrentExercise(tempExercise);
                setExerciseNumber(i);
                break;
            }

            if (tempExercise.exerciseId === currentExercise.exerciseId) {
                found = true;
            }

            if (tempExercise.exerciseId === plan.exercises[plan.exercises.length - 1].exerciseId) {
                setShowCompletedScreen(true);
                setShowWorkoutScreen(false);
            }
        }
    }

    const handleShowWorkoutScreen = () => {
        setShowStartScreen(false);
        setShowWorkoutScreen(true);
    }

    return (
        <div className="App">
            <StartScreen show={showStartScreen} handleShowWorkout={handleShowWorkoutScreen} />
            <WorkoutScreen
                show={showWorkoutScreen}
                plan={plan}
                exerciseNumber={exerciseNumber}
                currentExercise={currentExercise}
                handleChangeExercise={handleChangeExercise}
            />
            <CompletedScreen show={showCompletedScreen} />
        </div>
    );
}

export default App;
