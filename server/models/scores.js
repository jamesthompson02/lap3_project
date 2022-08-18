const db = require("../db/dbConfig");

class Scores {
  constructor(data) {
    this.id = data.id;
    this.username = data.username;
    this.category = data.category;
    this.difficulty = data.difficulty;
    this.question_type = data.question_type;
    this.score = data.score;
    this.category_id = data.category_id;
    //might add a difficulty field to add more filtering
  }

  static get all() {
    return new Promise(async (resolve, reject) => {
      try {
        const scoresData = await db.query(`SELECT * FROM scores;`);
        const scores = scoresData.rows.map((score) => new Scores(score));
        resolve(scores);
      } catch (err) {
        reject("Error retrieving scores: " + err.message);
      }
    });
  }

  static findScoresByUsername(username) {
    //as long as user keeps the same username, can see all their scores for diff quizzes
    return new Promise(async (resolve, reject) => {
      try {
        let userData = await db.query(
          `SELECT username, category, difficulty, question_type, score FROM scores WHERE username = $1;`,
          [username]
        );
        let userScores = userData.rows.map((score) => new Scores(score));
        resolve(userScores);
      } catch (err) {
        reject("Could not load user's scores: " + err.message);
      }
    });
  }

  static findScoresByQuizCategory(categoryId, difficulty, questionType) {
    //leaderboard for quiz categories
    return new Promise(async (resolve, reject) => {
      try {
        let categoryData = await db.query(
          `SELECT username, category, difficulty, question_type, score FROM scores WHERE category_id = $1 AND difficulty = $2 AND question_type = $3 ORDER BY score DESC;`,
          [categoryId, difficulty, questionType]
        );
        let categoryScores = categoryData.rows.map(
          (score) => new Scores(score)
        );
        resolve(categoryScores);
      } catch (err) {
        reject("Could not load scores for this quiz category: " + err.message);
      }
    });
  }

  static findScoreById(id) {
    return new Promise(async (resolve, reject) => {
      try {
        let scoreData = await db.query(`SELECT * FROM scores WHERE id = $1;`, [
          id,
        ]);
        let score = new Scores(scoreData.rows[0]);
        resolve(score);
      } catch (err) {
        reject("Score not found: " + err.message);
      }
    });
  }

  static createScore(
    username,
    category,
    difficulty,
    questionType,
    score,
    categoryId
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        let scoreData = await db.query(
          `INSERT INTO scores (username, category, difficulty, question_type, score, category_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,
          [username, category, difficulty, questionType, score, categoryId]
        );
        let newScore = new Scores(scoreData.rows[0]);
        resolve(newScore);
      } catch (err) {
        reject(
          "Error creating a new score for this user and quiz category: " +
            err.message
        );
      }
    });
  }

  destroy() {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await db.query(
          `DELETE FROM scores WHERE id = $1 RETURNING id;`,
          [this.id]
        );
        resolve(`This score (id: ${result.id}) has been deleted`);
      } catch (err) {
        reject("Error deleting score: " + err.message);
      }
    });
  }
}

module.exports = Scores;
