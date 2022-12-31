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
  const keyCycles = [40, 80, 120, 160, 200, 240];
  let crtImage = [];
  let spritePosition = [0, 2];
  let curRow = [];
  let curRowPixel = 1;

  for (const cycle of instr) {
    for (const instruction of cycle) {
      cycleCount++;
      if (instruction === "noop" || instruction === "addx") {
        drawPixel(cycleCount);
        continue;
      }
      if (typeof Number(instruction) === "number") {
        drawPixel(cycleCount);
        x += Number(instruction);
        spritePosition = [x, x + 2];
      }
    }
  }
  console.log(x);
  console.log(crtImage);

  function drawPixel(cycleCount) {
    if (
      curRowPixel - 1 >= spritePosition[0] &&
      curRowPixel - 1 <= spritePosition[1]
    ) {
      curRow.push("#");
    } else {
      curRow.push(".");
    }
    curRowPixel++;
    if (keyCycles.indexOf(cycleCount) !== -1) {
      crtImage.push(curRow);
      curRow = [];
      curRowPixel = 1;
    }
  }
}

init();
