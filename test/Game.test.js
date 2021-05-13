const Game = require("../lib/Game");

// describe('Calculate Score', () => {
//   it("returns the correct score when give a score card as an array", () => {
//     const game1 = new Game();
//     const score1 = [[1,4],[4,5],[6,4],[5,5],[10],[0,1],[7,3],[6,4],[10],[2,8,6]]
//     expect(game1.score(score1)).toEqual(133)
//   })
// })
describe("Pin Drop Array", () => {
  it("returns array with null's to show strike no bowls", () => {
    const game1 = new Game();
    const score1 = [1, 4, 4, 5, 6, 4, 5, 5, 10, 0, 1, 7, 3, 6, 4, 10, 2, 8, 6];

    score1.forEach((roll) => {
      game1.roll(roll);
    });
    expect(game1.pinCount).toEqual(
      [1, 4, 4, 5, 6, 4, 5, 5, 10, null, 0, 1, 7, 3, 6, 4, 10, null, 2, 8, 6]
    );
  });
  it("returns paired array to represent frames", () => {
    const game1 = new Game();
    const score1 = [1, 4, 4, 5, 6, 4, 5, 5, 10, 0, 1, 7, 3, 6, 4, 10, 2, 8, 6];

    score1.forEach((roll) => {
      game1.roll(roll);
    });

    expect(game1.pairedArray()).toEqual(
      [[1, 4], [4, 5], [6, 4], [5, 5], [10, null], [0, 1], [7, 3], [6, 4], [10, null], [2, 8, 6]]
    );
  });
});

describe("Frame Score Object", () => {
  it("returns a frame score object that has frametype and pin score(no bonus)", () => {
    const game1 = new Game();
    const score1 = [1, 4, 4, 5, 6, 4, 5, 5, 10, 0, 1, 7, 3, 6, 4, 10, 2, 8, 6];

    score1.forEach((roll) => {
      game1.roll(roll);
    });
    game1.frameScores()
    expect(game1.scoreObject).toEqual([
      { roll1: 1, roll2: 4, rawScore: 5, type: "normal" },
      { roll1: 4, roll2: 5, rawScore: 9, type: "normal" },
      { roll1: 6, roll2: 4, rawScore: 10, type: "spare" },
      { roll1: 5, roll2: 5, rawScore: 10, type: "spare" },
      { roll1: 10, rawScore: 10, type: "strike" },
      { roll1: 0, roll2: 1, rawScore: 1, type: "normal" },
      { roll1: 7, roll2: 3, rawScore: 10, type: "spare" },
      { roll1: 6, roll2: 4, rawScore: 10, type: "spare" },
      { roll1: 10, rawScore: 10, type: "strike" },
      { roll1: 2, roll2: 8, roll3: 6, rawScore: 16, type: "3-ball-frame" },
    ]
    );
  })
})

describe("Total Game Score", () => {
  it("simulates a FULL game and returns the correct score", () => {
    const game1 = new Game();
    const score1 = [1, 4, 4, 5, 6, 4, 5, 5, 10, 0, 1, 7, 3, 6, 4, 10, 2, 8, 6];

    score1.forEach((roll) => {
      game1.roll(roll);
    });
    expect(game1.score()).toEqual(133)
  })
  it("simulates a different FULL game and returns the correct score", () => {
    const game2 = new Game();
    const score2 = [10, 7, 3, 9, 0, 10, 0, 8, 8, 2, 0, 6, 10, 10, 10, 8, 1];

    score2.forEach((roll) => {
      game2.roll(roll);
    });
    expect(game2.score()).toEqual(167)
  })
  it("simulates a different FULL game and returns the correct score", () => {
    const game2 = new Game();
    const score2 = [9,1,10,10,10,7,3,10,9,1,10,10,7,2];

    score2.forEach((roll) => {
      game2.roll(roll);
    });
    expect(game2.score()).toEqual(212)
  })
  it("simulates a perfect FULL game and returns a score 300", () => {
    const game3 = new Game();
    const score3 = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];

    score3.forEach((roll) => {
      game3.roll(roll);
    });
    expect(game3.score()).toEqual(300)
  })
  it("simulates a different FULL game and returns the correct score", () => {
    const game2 = new Game();
    const score2 = [6,0,4,0,7,2,3,3,8,0,9,0,8,1,3,0,6,0,9,1,6 ];

    score2.forEach((roll) => {
      game2.roll(roll);
    });
    expect(game2.score()).toEqual(76)
  })


})

