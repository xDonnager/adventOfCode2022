const fs = require("fs").promises;
const path = require("path");

async function readFile(location) {
  try {
    const content = await fs.readFile(location, { encoding: "utf8" });
    const splittedContent = content.split(/\n/g);
    //console.log("instructions num", splittedContent.length);
    return splittedContent.filter((content) => content !== "");
  } catch (e) {
    console.log(e);
  }
}

async function init() {
  const instructions = await readFile(path.join(__dirname, "crates.txt"));
  console.log(instructions.slice(0, 8));
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
  console.log(cratesPositions);
  let reversedCratesPositions = [];
  for (let i = 0; i <= cratesPositions.length; i++) {
    let reversed = [];
    for (let j = 7; j >= 0; j--) {
      reversed.push(cratesPositions[j][i]);
    }
    reversedCratesPositions.push(reversed);
  }
  console.log("reversedCratesPositions");
  console.log(reversedCratesPositions);

  const movements = instructions.slice(9);
  console.log(movements);

  for (const move of movements) {
    const quantity = move.split(" ")[1];
    const origin = move.split(" ")[3];
    const destination = move.split(" ")[5];

    const rowOrigin = reversedCratesPositions[origin - 1];
    const indexOfLastBoxOrigin = rowOrigin.indexOf(" ");

    let movedCrates;
    if (indexOfLastBoxOrigin === -1) {
        movedCrates = rowOrigin.splice(rowOrigin.length - Number(quantity), rowOrigin.length - 1)
    } else {
        movedCrates = rowOrigin.slice(
            indexOfLastBoxOrigin - Number(quantity),
            indexOfLastBoxOrigin 
        );
    }

    //const movedCrates = rowOrigin.slice(2, 4);


    const rowDestination = reversedCratesPositions[destination - 1];
    const indexOfLastBoxDestination = rowDestination.indexOf(" ");
    if (indexOfLastBoxDestination === -1) {
      rowDestination.push(...movedCrates);
    } else {
      rowDestination.splice(
        indexOfLastBoxDestination,
        Number(quantity),
        ...movedCrates
      );
    }

    //console.log(reversedCratesPositions);
  }
  console.log(reversedCratesPositions);
  const letters = reversedCratesPositions.map(row =>{
    return row[row.length-1]
  })
  console.log(letters.join(''))

}

init();
