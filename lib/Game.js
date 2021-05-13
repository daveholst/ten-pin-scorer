class Game {
  constructor() {
    this.pinCount = [];
    this.scoreObject = [];
  }
  // produces 'detailed' array with relevant frame information
  frameScore(a, b = 0, c) {
    // non strike/spare score
    if (a + b < 10) return { score: a + b, type: "normal" };
    // spare
    if (a + b === 10) return { score: 10, type: "spare" };
    // strike
    if (a === 10) return { score: 10, type: "strike" };
    // final frame detector??
  }
  pairedArray() {
    const pairedArray = [];
    let tempArray = [];
    for (let i = 0; i < this.pinCount.length; i++) {
      const roll = this.pinCount[i];
      tempArray.push(roll);
      if (i % 2 === 1 && pairedArray.length < 9 ) {
        pairedArray.push(tempArray);
        tempArray = [];
      }
      if (i === this.pinCount.length - 1) pairedArray.push(tempArray);
    }
    return pairedArray;
  }
  // calculate frame scores without bonuses
  frameScores(arr = this.pairedArray()) {
    let frameScore = [];

    for (let i = 0; i < arr.length; i++) {
      let a = arr[i][0];
      let b = arr[i][1];
      // normal 2 ball frame
      if (arr[i].length < 3) {
        // non strike/spare score
        if (a + b < 10) frameScore.push({ roll1: a, roll2: b, rawScore: a + b, type: "normal" });
        // strike - first ball scores 10
        else if (a === 10) frameScore.push({ roll1: a, rawScore: 10, type: "strike" });
        // spare - second + first ball equals 10
        else if (a + b === 10) frameScore.push({ roll1: a, roll2: b,rawScore: 10, type: "spare" });
        // not yet bowled bowl - frame is a mid bowl
        else if (b === undefined) frameScore.push({ roll1: a, rawScore: a, type: "mid-frame" });
      }
      // 3 ball final frame
      if (arr[i].length === 3) {
        let c = arr[i][2];
        frameScore.push({ roll1: a, roll2: b, roll3: c, rawScore: a + b + c, type: "3-ball-frame" });
      }

    }
    this.scoreObject = frameScore;
  }
  // used to record scores as the game goes on.
  roll(pinsDown) {
    // work out if it is a first or second roll of frame;
    this.pinCount.push(pinsDown);
    const firstRoll = !(this.pinCount.legth % 2 === 1);
    // if it is a strike, push null as second roll -- added extra condition for strikes in last frame
    if (firstRoll && pinsDown === 10 && this.pinCount.length <= 18) this.pinCount.push(null);


  }
  // returns an array with bonus scores
  bonusCalculator(frameScores = this.scoreObject) {
    for (let i = 0; i < frameScores.length; i++) {
      const frame = frameScores[i];
      if (frame.type === 'spare') {
        frame.rawScore += frameScores[i + 1].roll1;
      }
      if (frame.type === 'strike') {
        // add first bonus
        frame.rawScore += frameScores[i + 1].roll1
        // add second bonus
        // check if frame + 1 was a strike and frame + 2 exists
        if (frameScores[i + 1].type === 'strike' && frameScores[i+2] !== undefined) {
          frame.rawScore += frameScores[i+2].roll1
        } else {
          frame.rawScore += frameScores[i+1].roll2
        }
      }
    }

  }
  // tally the rawScores
  totalScore(arr = this.scoreObject) {
    let total = 0;
    arr.forEach(frame => {
      total += frame.rawScore
    });
    return total;
  }

  // calculate total score
  score() {
    this.frameScores();
    this.bonusCalculator();
    return this.totalScore();
  }
}
module.exports = Game;
