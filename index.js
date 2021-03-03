const SafeCodePoint = require('safe-code-point');
const {StringStream} = require("scramjet");
const fs = require('fs'); 

SafeCodePoint('13.0.0').then(safeCodePoint => {
    fs.createReadStream("./UnicodeData.txt")   // fetch csv
    .pipe(new StringStream())                       // pass to stream
    .CSVParse()                                   // parse into objects
    .consume(object => {
        // console.log("Row:", object[0]);
        if (safeCodePoint(parseInt(object[0], 16))) {
            // console.log(object[1]);
            // console.log(String.fromCodePoint(parseInt(object[0], 16)));
            console.log("<button onclick='guess(this)' onmouseenter='showDetails(this)' onmouseleave='hideDetails()' data-name='", object[1], "' data-codepoint='", parseInt(object[0], 16), "'>", String.fromCodePoint(parseInt(object[0], 16)), "</button>");
        }
    })  // do whatever you like with the objects
    .then(() => console.log("all done"))
});