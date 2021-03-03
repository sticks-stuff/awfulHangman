// const SafeCodePoint = require('safe-code-point')

// SafeCodePoint('13.0.0').then(safeCodePoint => {
//   const numCodePoints = (1 << 16) + (1 << 20)

//   let numSafeCodePoints = 0
//   for (let codePoint = 0; codePoint < numCodePoints; codePoint++) {
//     if (safeCodePoint(codePoint)) {
//       numSafeCodePoints++
// 	  console.log(String.fromCodePoint(codePoint));
//     }
//   }

//   console.log(numSafeCodePoints)
// })

const {StringStream} = require("scramjet");
const request = require("request");

request.get("https://unicode.org/Public/UNIDATA/UnicodeData.txt")   // fetch csv
    .pipe(new StringStream())                       // pass to stream
    .CSVParse()                                   // parse into objects
    .consume(object => console.log("Row:", object[0]))  // do whatever you like with the objects
    .then(() => console.log("all done"))