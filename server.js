const app = require('express')()
const server = require('http').createServer(app)

const opts = { cors: { origin: '*' } }
const io = require('socket.io')(server, opts)

const cors = require('cors')
app.use(cors())

function getAllIndexes(arr, val) {
  var indexes = [], i;
  for(i = 0; i < arr.length; i++)
      if (arr.codePointAt(i) === parseInt(val)) {
          indexes.push(i);
      }
  return indexes;
}

function replaceAt(str, index, ch) {
  return str.replace(/./g, (c, i) => i == index ? ch : c);
}

var word = "👌👀👌👀👌👀👌👀👌👀 good shit go౦ԁ sHit👌 thats ✔ some good👌👌shit right👌👌there👌👌👌 right✔there ✔✔if i do ƽaү so my self 💯 i say so 💯 thats what im talking about right there right there (chorus: ʳᶦᵍʰᵗ ᵗʰᵉʳᵉ) mMMMMᎷМ💯 👌👌 👌НO0ОଠOOOOOОଠଠOoooᵒᵒᵒᵒᵒᵒᵒᵒᵒ👌 👌👌 👌 💯 👌 👀 👀 👀 👌👌Good shit"
var wordHidden = word.replace(/\S/g, "_");


function generateHiddenHTML(word) {
  return wordHidden.replace(/\w+/g, (wordFunc) => (
    '<div>' +
    wordFunc.replace(/./g, '<span>$&</span>') +
    '</div>'
  ));
}

guessesSuccessful = Array();

io.on('connection', (socket) => {
  console.log(`Client connected (id=${socket.id})`)

  io.to(socket.id).emit('word is', generateHiddenHTML(wordHidden))

  socket.on('disconnect', () => {
    console.log(`Client disconnected (id=${socket.id})`)
  })

  socket.on("guess", (guessedCodepoint) => {
    console.log(guessedCodepoint);
    var guessedChar = (String.fromCodePoint(guessedCodepoint));
    console.log(guessedChar);
    var indexLocations = getAllIndexes(word, guessedCodepoint);
    if(indexLocations.length > 0) {
      console.log(`Successful Guess!! (codepoint=${guessedCodepoint})`)
      for(i = 0; i < indexLocations.length; i++) {
        // console.log(indexLocations[i]);
        wordHidden = replaceAt(wordHidden, indexLocations[i], guessedChar)
        io.emit('word is', generateHiddenHTML(wordHidden))
      }
    }
  });
});

(
  port => server.listen(
    port, 
    () => console.log(`Express server running on port ${port}`)
  )
)(process.env.PORT || 3000)