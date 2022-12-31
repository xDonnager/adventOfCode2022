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

async function init() {
  let instr = await readFile(path.join(__dirname, "cycles.txt"));
  console.log(instr);

  instr = instr.map((row) => row.split(" "));
  //console.log(instr);

  let x = 1;
  let cycleCount = 0;
  let cycleStrengths = [];
  const keyCycles = [20, 60, 100, 140, 180, 220];

  for (const cycle of instr) {
    for (const instruction of cycle) {
      cycleCount++;

      if (keyCycles.indexOf(cycleCount) !== -1) {
        const strength = keyCycles.find((element) => element === cycleCount);
        cycleStrengths.push(x * strength);
      }
      if (instruction === "noop") {
        continue;
      }

      if (instruction === "addx") {
        continue;
      }

      if (typeof Number(instruction) === "number") {
        x += Number(instruction);
      }
    }
  }
  console.log(cycleStrengths);
  console.log(x);
  const sumOfSignals = cycleStrengths.reduce((acc, cur) => acc + cur);
  console.log(sumOfSignals);
}

init();
