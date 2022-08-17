const scoresController = require("../../../controllers/scores");
const Scores = require("../../../models/scores");

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn((code) => ({ send: mockSend, json: mockJson }));
const mockRes = { status: mockStatus };

describe("scores controller", () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe("find scores by username", () => {
    test("it returns all the scores by a certain username with a 200 status code", async () => {
      let userScores = [
        {
          username: "Test User",
          category: "General Knowledge",
          difficulty: "hard",
          question_type: "multiple",
          score: 5,
        },
        {
          username: "Test User",
          category: "General Knowledge",
          difficulty: "hard",
          question_type: "multiple",
          score: 10,
        },
      ];
      jest.spyOn(Scores, "findScoresByUsername").mockResolvedValue(userScores);
      const mockReq = { params: { username: "User" } };
      await scoresController.findScoresByUsername(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(userScores);
    });
  });

  describe("find scores by category", () => {
    test("it returns all scores for a quiz of a certain category with a 200 status code", async () => {
      let quizScores = [
        {
          username: "Test User 3",
          category: "General Knowledge",
          difficulty: "hard",
          question_type: "multiple",
          score: 10,
        },
        {
          username: "Test User 4",
          category: "General Knowledge",
          difficulty: "hard",
          question_type: "multiple",
          score: 9,
        },
        {
          username: "Test User 1",
          category: "General Knowledge",
          difficulty: "hard",
          question_type: "multiple",
          score: 7,
        },
        {
          username: "Test User",
          category: "General Knowledge",
          difficulty: "hard",
          question_type: "multiple",
          score: 5,
        },
        {
          username: "Test User 2",
          category: "General Knowledge",
          difficulty: "hard",
          question_type: "multiple",
          score: 2,
        },
      ];

      jest
        .spyOn(Scores, "findScoresByQuizCategory")
        .mockResolvedValue(quizScores);
      const mockReq = {
        body: {
          category: "General Knowledge",
          difficulty: "hard",
          question_type: "multiple",
        },
      };
      await scoresController.findScoresByQuizCategory(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(quizScores);
    });
  });

  describe("create a score", () => {
    test("it returns a new score with a 201 status code", async () => {
      let testScore = {
        id: 1,
        username: "Test User",
        category: "Japanese Manga & Anime",
        difficulty: "hard",
        question_type: "multiple",
        score: 8,
      };

      jest
        .spyOn(Scores, "createScore")
        .mockResolvedValue(new Scores(testScore));
      const mockReq = { body: testScore };
      await scoresController.createScore(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(201);
      expect(mockJson).toHaveBeenCalledWith(new Scores(testScore));
    });
  });

  describe("delete a score", () => {
    test("it returns a status code of 204 upon successful deletion of a score", async () => {
      let testScore = new Scores({
        id: 1,
        username: "Test User",
        category: "Japanese Manga & Anime",
        difficulty: "hard",
        question_type: "multiple",
        score: 8,
      });
      jest
        .spyOn(Scores.prototype, "destroy")
        .mockResolvedValue("This score (id: 1) has been deleted");
      jest.spyOn(Scores, "findScoreById").mockResolvedValue(testScore);
      const mockReq = { params: { id: testScore.id } };
      await scoresController.destroyScore(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(204);
    });
  });
});
