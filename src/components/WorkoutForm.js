import { useState } from 'react'
import { useWorkoutContext } from '../hooks/useWorkoutContext'

export const WorkoutForm = () => {
    const {dispatch} = useWorkoutContext() 
    const [title, setTitle] =  useState('');
    const [load, setLoad] =  useState('');
    const [rept, setRept] =  useState('');
    const [error, setError] =  useState(null);
    const [emptyFields, setEmptyFields] =  useState([]);

    const hendalSumit = async (e) => {
        e.preventDefault()

        const workout = {title, load, rept}

        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok){
            setTitle('')
            setLoad('')
            setRept('')
            setError(null)
            setEmptyFields([])
            console.log('New workout added');
            dispatch({type: 'CREATE_WORKOUTS', payload: json})
        }
    }

    return (
        <form className='create' onSubmit={hendalSumit}>
            <h3>Add a New Workout</h3>

            <label>Excersize Title</label>

            <input 
                type='text'
                onChange={(e)=> setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />
            
            <label>Load (in kg): </label>  
            <input 
                type='number'
                onChange={(e)=> setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes('load') ? 'error' : ''}
            />

            <label>Rept:</label>  
            <input 
                type='number'
                onChange={(e)=> setRept(e.target.value)}
                value={rept}
                className={emptyFields.includes('rept') ? 'error' : ''}
            />

            <button>Add Workout</button>
            { error && <div className='error'>Error: {error} </div> }
        </form>
    )

}