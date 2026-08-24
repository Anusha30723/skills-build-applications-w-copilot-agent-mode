import mongoose from 'mongoose';
import { connectDatabase, disconnectDatabase } from '../config/database.js';
import { Activity, Leaderboard, Team, User, Workout } from '../models.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();
    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      { name: 'Maya Chen', email: 'maya@example.com', avatar: 'MC', goal: 'Build strength' },
      { name: 'Jordan Lee', email: 'jordan@example.com', avatar: 'JL', goal: 'Run a 10K' },
      { name: 'Sam Rivera', email: 'sam@example.com', avatar: 'SR', goal: 'Improve mobility' },
    ]);

    await Team.insertMany([
      { name: 'Morning Movers', description: 'Start every day with a strong routine.', members: [users[0]._id, users[1]._id] },
      { name: 'Weekend Warriors', description: 'Make every weekend workout count.', members: [users[1]._id, users[2]._id] },
    ]);

    await Activity.insertMany([
      { user: users[0]._id, type: 'Strength training', durationMinutes: 45, calories: 320, completedAt: new Date('2026-08-22T07:30:00Z') },
      { user: users[1]._id, type: 'Outdoor run', durationMinutes: 38, calories: 410, completedAt: new Date('2026-08-23T08:00:00Z') },
      { user: users[2]._id, type: 'Yoga', durationMinutes: 30, calories: 160, completedAt: new Date('2026-08-23T10:00:00Z') },
    ]);

    await Leaderboard.insertMany([
      { user: users[0]._id, points: 1240, rank: 1, streakDays: 12 },
      { user: users[1]._id, points: 1110, rank: 2, streakDays: 8 },
      { user: users[2]._id, points: 980, rank: 3, streakDays: 6 },
    ]);

    await Workout.insertMany([
      { title: 'Full-body foundation', description: 'A balanced session for building everyday strength.', difficulty: 'beginner', durationMinutes: 30, exercises: [{ name: 'Bodyweight squat', sets: 3, reps: 12 }, { name: 'Push-up', sets: 3, reps: 8 }] },
      { title: 'Runner mobility reset', description: 'Loosen hips and calves after a long run.', difficulty: 'intermediate', durationMinutes: 20, exercises: [{ name: 'World\'s greatest stretch', sets: 2, reps: 6 }, { name: 'Standing calf raise', sets: 3, reps: 15 }] },
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await disconnectDatabase();
  }
}

seedDatabase();
