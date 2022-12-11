const fs = require("fs").promises;
const path = require("path");

async function readFile(location) {
  try {
    const content = await fs.readFile(location, { encoding: "utf8" });
    const splittedContent = content.replace(/\r/g, "").split(/\n/g);
    //console.log("instructions num", splittedContent.length);
    return splittedContent.filter((content) => content !== "");
  } catch (e) {
    console.log(e);
  }
}

function reverseCratesMatrix(cratesMatrix) {
  let reversedCratesPositions = [];
  for (let i = 0; i <= cratesMatrix[0].length - 1; i++) {
    let reversed = [];
    for (let j = cratesMatrix.length - 1; j >= 0; j--) {
      if (cratesMatrix[j][i] !== " ") {
        reversed.push(cratesMatrix[j][i]);
      }
    }
    reversedCratesPositions.push(reversed);
  }
  return reversedCratesPositions;
}

async function init() {
  const instructions = await readFile(path.join(__dirname, "crates.txt"));
  // console.log(instructions.slice(0, 8));
  const cratesPositions = instructions.slice(0, 8).map((row) => {
    //console.log("row", row);
    //console.log("spl", row.split(""));
    let transf = [];
    let tempRow = row.split("");
    for (let i = 0; i < 9; i++) {
      let tempChar = tempRow.splice(0, 3);
      transf.push(tempChar[1]);
      tempRow.splice(0, 1);
    }
    return transf;
  });
  console.log("cratesPositions", cratesPositions);
  let reversedCratesPositions = reverseCratesMatrix(cratesPositions);
  console.log("reversedCratesPositions");
  console.log(reversedCratesPositions);

  const movements = instructions.slice(9);
  console.log(movements);

  for (const move of movements) {
    const quantity = Number(move.split(" ")[1]);
    const origin = Number(move.split(" ")[3]);
    const destination = Number(move.split(" ")[5]);
    let movedCrates;
    try {
      const rowOrigin = reversedCratesPositions[origin - 1];
      movedCrates = rowOrigin.slice(rowOrigin.length - quantity);
      rowOrigin.splice(rowOrigin.length - quantity);

      const rowDestination = reversedCratesPositions[destination - 1];
      rowDestination.push(...movedCrates);
    } catch (e) {
      console.log(e);
    }
  }

  console.log(reversedCratesPositions);
  const letters = reversedCratesPositions.map((row) => {
    return row[row.length - 1];
  });
  console.log(letters.join(""));
}

init();
