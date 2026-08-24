import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

export default function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('activities').then(setActivities).catch((reason) => setError(reason.message)) }, [])
  return <DataPage label="Movement log" title="Activities" description="A clear record of the work your team is putting in."><div className="data-list">{error ? <p className="error">{error}</p> : activities.map((activity) => <article className="data-row" key={activity._id}><div><strong>{activity.type}</strong><small>{activity.completedAt ? new Date(activity.completedAt).toLocaleDateString() : 'Recent session'}</small></div><span>{activity.durationMinutes} min</span><span>{activity.calories} kcal</span></article>)}</div></DataPage>
}

function DataPage({ label, title, description, children }) { return <><div className="page-heading"><div><p className="eyebrow">{label}</p><h1>{title}</h1><p className="subheading">{description}</p></div></div>{children}</> }