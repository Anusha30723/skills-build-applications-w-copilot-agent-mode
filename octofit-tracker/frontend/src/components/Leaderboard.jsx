import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

export default function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('/api/leaderboard/').then(setEntries).catch((reason) => setError(reason.message)) }, [])
  return <><div className="page-heading"><div><p className="eyebrow">The weekly climb</p><h1>Leaderboard</h1><p className="subheading">Consistency is the real competition.</p></div></div><div className="ranking-list">{error ? <p className="error">{error}</p> : entries.sort((a, b) => a.rank - b.rank).map((entry) => <article className={`rank-row rank-${entry.rank}`} key={entry._id}><b>0{entry.rank}</b><div><strong>{entry.user?.name ?? entry.user ?? 'Athlete'}</strong><small>{entry.streakDays} day streak</small></div><span>{entry.points.toLocaleString()} pts</span></article>)}</div></>
}