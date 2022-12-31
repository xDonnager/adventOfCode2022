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
  const commandsList = await readFile(path.join(__dirname, "dirTest.txt"));
  console.log(commandsList);

  const fileSys = commandsList.reduce(
    (acc, cur) => {
      let inputPrompt;
      if (cur[0] === "$") {
        inputPrompt = cur.split(" ");
      }

      if (inputPrompt[1] === "cd") {
      }
    },
    { "/": {} }
  );
}

init();
