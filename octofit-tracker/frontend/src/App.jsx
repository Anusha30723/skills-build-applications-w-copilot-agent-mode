import { NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand"><span className="brand-mark">O</span><span>OctoFit</span></div>
        <span className="status-dot">Live training desk</span>
      </header>
      <div className="workspace">
        <aside className="sidebar">
          <p className="eyebrow">Your command center</p>
          <nav aria-label="Primary navigation">
            <NavLink to="/" end>Overview</NavLink>
            <NavLink to="/activities">Activities</NavLink>
            <NavLink to="/leaderboard">Leaderboard</NavLink>
            <NavLink to="/teams">Teams</NavLink>
            <NavLink to="/users">Members</NavLink>
            <NavLink to="/workouts">Workouts</NavLink>
          </nav>
        </aside>
        <main className="content">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

function Overview() {
  return <><div className="page-heading"><div><p className="eyebrow">Monday, August 24</p><h1>Make today count.</h1><p className="subheading">Your team is moving well. Keep the rhythm going.</p></div><div className="heading-badge">◒ <strong>12</strong><span>day streak</span></div></div><section className="overview-grid"><NavLink className="feature-tile coral" to="/activities"><span>01 / TRACK</span><strong>Log your movement</strong><small>See every session in one place</small></NavLink><NavLink className="feature-tile ink" to="/leaderboard"><span>02 / COMPETE</span><strong>Climb the board</strong><small>1,240 points keeps Maya in front</small></NavLink><NavLink className="feature-tile mint" to="/workouts"><span>03 / TRAIN</span><strong>Find your next set</strong><small>Two workouts ready to go</small></NavLink></section></>
}

export default App
