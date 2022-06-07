let fs = require("fs");
let path = require("path");
let utility = require("../utility");

let types = utility.types;

function organizeFun(dirPath) {
    let desPath;
  
    if (!dirPath) {
      dirPath = process.cwd();
   }
  
    if (!fs.existsSync(dirPath)) {
      console.log("Kindly enter the correct path");
      return;
    }
  
    desPath = path.join(dirPath, "organized_files");
    if (!fs.existsSync(desPath)) {
      fs.mkdirSync(desPath);
    }
    organizeHelper(dirPath, desPath); // source, destination
  }
  
  function organizeHelper(src, dest) {
    let childNames = fs.readdirSync(src);
    for (let i = 0; i < childNames.length; i++) {
      let childAddress = path.join(src, childNames[i]);
      let isFile = fs.lstatSync(childAddress).isFile();
      if (isFile) {
        let category = getCategory(childNames[i]);
        sendFiles(childAddress, dest, category);
      }
    }
  }
  
  function sendFiles(srcFilePath, dest, category) {
    let categoryPath = path.join(dest, category);
    if (!fs.existsSync(categoryPath)) {
      fs.mkdirSync(categoryPath);
    }
  
    let fileName = path.basename(srcFilePath);
    let destFilePath = path.join(categoryPath, fileName);
    fs.copyFileSync(srcFilePath, destFilePath);
  
    console.log(fileName, " copied to ", category);
  }
  
  function getCategory(name) {
    let ext = path.extname(name);
    ext = ext.slice(1);
  
    for (let type in types) {
      // will get all keys from object(media,archives,documents)
      let currTypeArr = types[type];
      for (let i = 0; i < currTypeArr.length; i++) {
        if (ext == currTypeArr[i]) {
          return type;
        }
      }
    }
  
    return "others";
  }

module.exports = {
    organizeKey : organizeFun
}