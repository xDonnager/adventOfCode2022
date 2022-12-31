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
  let forest = await readFile(path.join(__dirname, "forest.txt"));
  // console.log(forest);

  forest = forest.map((row) => row.split(""));
  // console.log(forest);
  let visibleTrees = 0;
  let hiddenTrees = 0;

  for (let i = 0; i < forest.length; i++) {
    for (let j = 0; j < forest[i].length; j++) {
      if (
        i === 0 ||
        j === 0 ||
        i === forest.length - 1 ||
        j === forest[i].length - 1
      ) {
        visibleTrees++;
        continue;
      }

      const centerTree = forest[i][j];
      const topTrees = getTopTrees(forest, i - 1, j);
      const rightTrees = getRightTrees(forest, i, j + 1);
      const leftTrees = getLeftTrees(forest, i, j - 1);
      const botTrees = getBotTrees(forest, i + 1, j);

      const surroundingTrees = [topTrees, rightTrees, botTrees, leftTrees];
      // console.log(centerTree, surroundingTrees);

      isHiddenTree(centerTree, surroundingTrees)
        ? hiddenTrees++
        : visibleTrees++;
    }
  }
  console.log("visible", visibleTrees);
  console.log("hidden", hiddenTrees);
}

function isHiddenTree(tree, surTrees) {
  for (const rowTrees of surTrees) {
    //onst hiddenBy = rowTrees.filter((rowTree) => +rowTree >= +tree);

    const hiddenBy = rowTrees.filter((rowTree) => {
      // console.log(+rowTree);
      // console.log(+tree);
      return +rowTree >= +tree;
    });
    if (hiddenBy.length === 0) {
      return false;
    }
  }
  return true;
}

function getTopTrees(forest, i, j) {
  let topTrees = [];
  while (i >= 0) {
    topTrees.push(forest[i][j]);
    i--;
  }
  return topTrees;
}

function getRightTrees(forest, i, j) {
  let rightTrees = [];
  while (j < forest[i].length) {
    rightTrees.push(forest[i][j]);
    j++;
  }
  return rightTrees;
}

function getLeftTrees(forest, i, j) {
  let leftTrees = [];
  while (j >= 0) {
    leftTrees.push(forest[i][j]);
    j--;
  }
  return leftTrees;
}

function getBotTrees(forest, i, j) {
  let botTrees = [];
  while (i < forest.length) {
    botTrees.push(forest[i][j]);
    i++;
  }
  return botTrees;
}
init();
