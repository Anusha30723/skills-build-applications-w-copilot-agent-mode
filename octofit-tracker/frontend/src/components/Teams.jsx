import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const apiUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

export default function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection(apiUrl).then(setTeams).catch((reason) => setError(reason.message)) }, [])
  return <><div className="page-heading"><div><p className="eyebrow">Together is stronger</p><h1>Teams</h1><p className="subheading">Small circles, big momentum.</p></div></div><div className="tile-grid">{error ? <p className="error">{error}</p> : teams.map((team) => <article className="info-card" key={team._id}><span className="card-index">TEAM / {team.members?.length ?? 0} MEMBERS</span><h2>{team.name}</h2><p>{team.description}</p></article>)}</div></>
}