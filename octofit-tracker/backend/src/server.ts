import express from 'express'
import { connectDatabase } from './config/database.js'
import { Activity, Leaderboard, Team, User, Workout } from './models.js'

const app = express()
const port = Number(process.env.PORT ?? 8000)
const codespaceName = process.env.CODESPACE_NAME
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`

app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', apiBaseUrl })
})

const collectionRoutes = [
  ['/api/users/', User],
  ['/api/teams/', Team],
  ['/api/activities/', Activity],
  ['/api/leaderboard/', Leaderboard],
  ['/api/workouts/', Workout],
] as const

for (const [route, model] of collectionRoutes) {
  app.get(route, async (_request, response, next) => {
    try {
      response.json(await model.find().lean())
    } catch (error) {
      next(error)
    }
  })
}

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`OctoFit backend listening at ${apiBaseUrl}`)
    })
  })
  .catch((error) => {
    console.error('Error connecting to octofit_db:', error)
    process.exit(1)
  })