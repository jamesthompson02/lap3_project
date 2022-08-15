const Scores = require("./Scores");
const pg = require("pg");
jest.mock("pg");

const db = require("../db/dbConfig");

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
        { username: "Test User", quiz_category: "General Knowledge", score: 5 },

        {
          username: "Test User",
          quiz_category: "General Knowledge",
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

  // describe('findScoresByQuizCategory', () => {
  //     test('it resolves with scores all belonging to a single quiz category')

  // })

  //   describe('create', () => {

  //   })

  //   describe('destroy', () => {

  //   })
});
