const Scores = require("../../../models/scores");
const pg = require("pg");
jest.mock("pg");

const db = require("../../../db/dbConfig");

describe("Scores", () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe("all", () => {
    test("it resolves with scores on successful db query", async () => {
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [{}, {}, {}, {}] });
      const all = await Scores.all;
      expect(all).toHaveLength(4);
    });
  });

  describe("findScoresByUsername", () => {
    test("it resolves with scores all belonging to a single user on successful db query", async () => {
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
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: userScores });
      const result = await Scores.findScoresByUsername("Test User");
      expect(result).toHaveLength(2);
      expect(result[0].username).toBe("Test User");
      expect(result[0].score).toBe(5);
      expect(result[1].score).toBe(10);
    });
  });

  describe("findScoresByQuizCategory", () => {
    test("it resolves with scores all belonging to a single quiz category ordered by their score in descending order", async () => {
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

      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: quizScores });
      const result = await Scores.findScoresByQuizCategory("General Knowledge");

      expect(result).toHaveLength(5);
      expect(result[0].username).toBe("Test User 3");
      expect(result[4].score).toBe(2);
    });
  });

  describe("findScoreById", () => {
    test("it resolves with score on successful db query", async () => {
      let scoreData = {
        id: 1,
        username: "Test User",
        category: "Japanese Manga & Anime",
        difficulty: "hard",
        question_type: "multiple",
        score: 8,
      };

      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [scoreData] });
      const result = await Scores.findScoreById(1);
      expect(result).toBeInstanceOf(Scores);
    });
  });

  describe("createScore", () => {
    test("it resolves with score on successful db query", async () => {
      let scoreData = {
        username: "Test User",
        category: "Japanese Manga & Anime",
        difficulty: "hard",
        question_type: "multiple",
        score: 8,
      };
      jest
        .spyOn(db, "query")
        .mockResolvedValueOnce({ rows: [{ ...scoreData, id: 1 }] });
      const result = await Scores.createScore(
        "Test User",
        "Japanese Manga & Anime",
        8
      );
      expect(result).toBeInstanceOf(Scores);
    });
  });

  describe("destroy", () => {
    test("it resolves with message on successful db query", async () => {
      jest.spyOn(db, "query").mockResolvedValueOnce({ id: 1 });
      let testScore = new Scores({
        id: 1,
        username: "Test User",
        category: "Japanese Manga & Anime",
        difficulty: "hard",
        question_type: "multiple",
        score: 10,
      });
      const result = await testScore.destroy();
      expect(result).toBe("This score (id: 1) has been deleted");
    });
  });
});
