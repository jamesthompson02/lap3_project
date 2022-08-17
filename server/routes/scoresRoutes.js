const express = require("express");
const router = express.Router();
const scoresController = require("../controllers/scores");

//will have the 2 leaderboard routes here

router.get("/:username", scoresController.findScoresByUsername);

router.get(
  "/:category/:difficulty/:type",
  scoresController.findScoresByQuizCategory
);

module.exports = router;
