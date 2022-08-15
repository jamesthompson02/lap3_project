const db = require("../db/dbConfig");

class Scores {
  constructor(data) {
    this.id = data.id;
    this.username = data.username;
    this.quiz_category = data.quiz_category;
    this.score = data.score;
  }

  static get all() {
    return new Promise(async (resolve, reject) => {
      try {
        const scoresData = await db.query(
          `SELECT username, quiz_category, score FROM scores;`
        );
        const scores = scoresData.rows.map((score) => new Scores(score));
        resolve(scores);
      } catch (err) {
        reject("Error retrieving scores" + err);
      }
    });
  }

  static findScoresByUsername(username) {
    //as long as user keeps the same username, can see all their scores for diff quizzes
    return new Promise(async (resolve, reject) => {
      try {
        let userData = await db.query(
          `SELECT username, quiz_category, score FROM scores WHERE username = $1;`,
          [username]
        );
        let userScores = userData.rows.map((score) => new Scores(score));
        resolve(userScores);
      } catch (err) {
        reject("Could not load user's scores" + err);
      }
    });
  }

  static findScoresByQuizCategory(category) {
    //leaderboard for quiz categories
    return new Promise(async (resolve, reject) => {
      try {
        let categoryData = await db.query(
          `SELECT username, quiz_category, score FROM scores WHERE quiz_category = $1;`,
          [category]
        );
        let categoryScores = categoryData.rows.map(
          (score) => new Scores(score)
        );
        resolve(categoryScores);
      } catch (err) {
        reject("Could not load scores for this quiz category" + err);
      }
    });
  }

  static createScore(username, quizCategory, score) {
    return new Promise(async (resolve, reject) => {
      try {
        let scoreData = await db.query(
          `INSERT INTO scores (username, quiz_category, score) VALUES ($1, $2, $3) RETURNING *;`,
          [username, quizCategory, score]
        );
        let newScore = new Scores(scoreData.rows[0]);
        resolve(newScore);
      } catch (err) {
        reject(
          "Error creating a new score for this user and quiz category" + err
        );
      }
    });
  }
}

module.exports = Scores;
