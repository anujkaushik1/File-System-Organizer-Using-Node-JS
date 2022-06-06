let inputArr = process.argv.slice(2);
let command = inputArr[0];
let fs = require("fs");
let path = require("path");

switch (command) {
  case "tree":
    treeFun(inputArr[1]);
    break;
  case "organize":
    organizeFun(inputArr[1]);
    break;
  case "help":
    helpFun();
    break;
  default:
    console.log("Please input right command");
}

function treeFun(dirPath) {
  console.log("Tree Command Implemented for ", dirPath);
}

function organizeFun(dirPath) {
  if (!dirPath) {
    console.log("Kindly enter the path");
    return;
  }

  if (!fs.existsSync(dirPath)) {
    console.log("Kindly enter the correct path");
    return;
  }

  let desPath = path.join(dirPath, "organized_files");
  if (fs.existsSync(desPath)) {
    console.log("Folder already exists");
    return;
  }
  fs.mkdirSync(desPath);
}

function helpFun(dirPath) {
  console.log(`
    List of all the commands:
              node main.js tree "directoryPath"
              node main.js organize "directoryPath"
              node main.js help
  `);
}
