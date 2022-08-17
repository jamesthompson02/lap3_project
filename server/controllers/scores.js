const Scores = require("../models/scores");

async function findScoresByUsername(req, res) {
  try {
    const scores = await Scores.findScoresByUsername(req.params.username);
    res.status(200).json(scores);
  } catch (err) {
    res.status(404).json({ err });
  }
}

async function findScoresByQuizCategory(req, res) {
  //leaderboard
  try {
    const scores = await Scores.findScoresByQuizCategory(req.params.category); // most categories have spaces in them will need to add a method to help with this
    res.status(200).json(scores);
  } catch (err) {
    res.status(404).json({ err });
  }
}

async function createScore(req, res) {
  try {
    const score = await Scores.createScore(req.body);
    res.status(201).json(score);
  } catch (err) {
    res.status(422).json({ err });
  }
}

async function destroyScore(req, res) {
  try {
    const score = await Scores.findScoreById(parseInt(req.params.id));
    const resp = score.destroy();
    res.status(204).end();
  } catch (err) {
    res.status(404).json({ err });
  }
}

module.exports = {
  findScoresByUsername,
  findScoresByQuizCategory,
  createScore,
  destroyScore,
};
