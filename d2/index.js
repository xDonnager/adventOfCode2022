const fs = require('fs').promises
const path = require("path");

const scoreGuide = {
  A: {
    type: "rock",
    points: 1,
    beats: "Z",
    defeats: "Y",
    draws: "X"
  },
  B: {
    type: "paper",
    points: 2,
    beats: "X",
    defeats: "Z",
    draws: "Y"
  },
  C: {
    type: "scissors",
    points: 3,
    beats: "Y",
    defeats: "X",
    draws: "Z"
  }
};
scoreGuide.X = { ...scoreGuide.A };
scoreGuide.Y = { ...scoreGuide.B };
scoreGuide.Z = { ...scoreGuide.C };

const roundStatus = {
  X: "lose",
  Y: "draw",
  Z: "win"
}

async function readFile() {
  const loc = path.join(__dirname, "puzzleInput.txt");
  //console.log(loc);
  try {
    const content = await fs.readFile(loc, { encoding: "utf8" });
    const plays = content.split(/\n/g);
    console.log("len", plays.length);
    return plays;
  } catch (e) {
    console.log(e);
  }
}

function losePick(oponentPick){
  for (const [key, value] of Object.entries(scoreGuide)) {
    console.log(`${key}: ${value}`);
    if(key === oponentPick){
      return value.beats
    }
  }
}

function winPick(oponentPick){
  for (const [key, value] of Object.entries(scoreGuide)) {
    console.log(`${key}: ${value}`);
    if(key === oponentPick){
      return value.defeats
    }
  }
}

function drawPick(oponentPick){
  for (const [key, value] of Object.entries(scoreGuide)) {
    console.log(`${key}: ${value}`);
    if(key === oponentPick){
      return value.draws
    }
  }
}

(async function () {
  try {
    const plays = await readFile();
    //console.log(plays);
    let totalScore = 0
    for (const play of plays) {
      let roundScore = 0
      let playerTwoPick;
      console.log(play);
      const [playerOnePick, roundEndsLike] = play.split(" ");
      if(playerOnePick === "" || roundEndsLike === ""){
        continue
      }
      // const arrlike = Object.entries(scoreGuide)
      // console.log(arrlike)

      if(roundEndsLike === "X"){
        console.log("SHOULD LOSE");
        playerTwoPick = losePick(playerOnePick)
      } else if (roundEndsLike === "Z") {
        console.log("SHOULD win");
        playerTwoPick = winPick(playerOnePick)
      } else {
        console.log("draw");
        playerTwoPick = drawPick(playerOnePick)
      }

      if (scoreGuide[playerOnePick].type === scoreGuide[playerTwoPick].type) {
        console.log("draw");
        roundScore +=3 
      } else if (scoreGuide[playerOnePick].beats === playerTwoPick) {
        console.log("playerOne wins");
      } else {
        console.log("playerTwo wins");
        roundScore +=6
      }
      //console.log(roundScore);
      roundScore += scoreGuide[playerTwoPick].points
      console.log('r',roundScore);
      totalScore += roundScore
      console.log('t',totalScore)
    }
    console.log(totalScore)
  } catch (e) {
    console.log(e);
  }
})();
