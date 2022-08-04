import { useEffect } from 'react'
import { useWorkoutContext } from '../hooks/useWorkoutContext'

// Components
import { WorkoutDetails } from '../components/WorkoutDetails'
import { WorkoutForm } from '../components/WorkoutForm'

export const Home = () => {
    const { workouts, dispatch } = useWorkoutContext()

    useEffect(()=>{
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts')
            const json = await response.json()
            
            if(response.ok){
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }

        fetchWorkouts()
    }, [dispatch])
    
    return (
        <div className='home'>
            <div className='workouts'>
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}