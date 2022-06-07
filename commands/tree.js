let fs = require("fs");
let path = require("path");

function treeFun(dirPath) {
    if (!dirPath) {
      dirPath = process.cwd();
    }
  
    if (!fs.existsSync(dirPath)) {
      console.log("Kindly enter the correct path");
      return;
    }
  
    treeHelper(dirPath, "");
  }
  
  function treeHelper(dirPath, indent) {
    // Using Recursion
    let isFile = fs.lstatSync(dirPath).isFile();
    if (isFile) {
      let fileName = path.basename(dirPath);
      console.log(indent + "------" + fileName);
    } else {
      let dirName = path.basename(dirPath);
      console.log(indent + "|------" + dirName);
      let children = fs.readdirSync(dirPath);
  
      for (let i = 0; i < children.length; i++) {
        let childPath = path.join(dirPath, children[i]);
        treeHelper(childPath, indent + "\t");
      }
    }
  }

  module.exports = {
      treeKey : treeFun
  }