let inputArr = process.argv.slice(2);
let command = inputArr[0];
let fs = require("fs");
let path = require("path");
let types = {
  media: ["mp4, mkv"],
  archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
  documents: [
    "docx",
    "doc",
    "pdf",
    "xlsx",
    "xls",
    "odt",
    "ods",
    "odp",
    "odg",
    "odf",
    "txt",
    "ps",
    "tex",
  ],
  app: ["exe", "dmg", "pkg", "deb"],
};

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
      console.log(childNames[i], 'belongs to', category);
    }
  }
}

function getCategory(name) {
  let ext = path.extname(name);
  ext = ext.slice(1);

  for (let type in types) {   // will get all keys from object(media,archives,documents)
    let currTypeArr = types[type];
    for (let i = 0; i < currTypeArr.length; i++) {
      if (ext == currTypeArr[i]) {
        return type;
      }
    }
  }

  return "others";
}

function helpFun(dirPath) {
  console.log(`
    List of all the commands:
              node main.js tree "directoryPath"
              node main.js organize "directoryPath"
              node main.js help
  `);
}
