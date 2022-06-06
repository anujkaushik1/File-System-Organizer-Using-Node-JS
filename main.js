let inputArr = process.argv.slice(2);
let command = inputArr[0];

switch (command) {
  case "tree":
    treeFun();
    break;
  case "organize":
    organizeFun();
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
  console.log("Organize Command Implemented for ", dirPath);
}

function helpFun(dirPath) {
  console.log("Help Command Implemented for ", dirPath);
}
