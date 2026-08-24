import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('/api/workouts/').then(setWorkouts).catch((reason) => setError(reason.message)) }, [])
  return <><div className="page-heading"><div><p className="eyebrow">Built for your next win</p><h1>Workouts</h1><p className="subheading">Purposeful sessions, ready when you are.</p></div></div><div className="tile-grid">{error ? <p className="error">{error}</p> : workouts.map((workout) => <article className="info-card workout-card" key={workout._id}><span className="card-index">{workout.difficulty} / {workout.durationMinutes} MIN</span><h2>{workout.title}</h2><p>{workout.description}</p><div className="exercise-line">{workout.exercises?.map((exercise) => <span key={exercise._id ?? exercise.name}>{exercise.name}</span>)}</div></article>)}</div></>
}