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
  const instructions = await readFile(path.join(__dirname, "buffer.txt"));
  console.log(instructions);
  console.log(instructions[0].split(""));
  const chars = instructions[0].split("");

  for (let i = 4; i < chars.length; i++) {
    const fragment = chars.slice(i - 4, i);
    let fragmentMap = new Map();
    for (const char of fragment) {
      if (!fragmentMap.get(char)) {
        fragmentMap.set(char, 1);
      } else {
        let repetitions = fragmentMap.get(char);
        fragmentMap.set(char, repetitions + 1);
      }
    }
    console.log(fragmentMap);
    if (fragmentMap.size === 4) {
      console.log("found!");
      console.log(i);
      break;
    }
  }
}

init();
