import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const apiUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

export default function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection(apiUrl).then(setUsers).catch((reason) => setError(reason.message)) }, [])
  return <><div className="page-heading"><div><p className="eyebrow">The people behind the progress</p><h1>Members</h1><p className="subheading">Know the goals. Celebrate the wins.</p></div></div><div className="member-grid">{error ? <p className="error">{error}</p> : users.map((user) => <article className="member-card" key={user._id}><span className="avatar">{user.avatar ?? user.name?.slice(0, 2).toUpperCase()}</span><div><h2>{user.name}</h2><p>{user.goal}</p><small>{user.email}</small></div></article>)}</div></>
}