var loadedItems = 1;
fitty('#infotext', {
	minSize: 12,
	maxSize: 100
});

$(function() {
	$("div[data-src]").lazy({
		chainable: false,
		afterLoad: function(element) {
			loadMore(element);
		}
	});
})

function loadMore(element) {
	console.log("loaded ");
	document.getElementById("buttons").innerHTML += element[0].innerHTML;
	$(element).remove();
	var newLazy = $('<div data-loader="ajax" data-src="buttons-' + (loadedItems++).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) +'.html"></div>');
	$('body').append(newLazy);
	$("div[data-src]").lazy({
		chainable: false,
		afterLoad: function(element) {
			loadMore(element);
		}
	});
}

const infoDiv = document.getElementById("info");
const infotext = document.getElementById("infotext");
const word = "This is a large word";
var wordHidden = word.replace(/\S/g, "̲");
document.getElementById("word").innerHTML = wordHidden;
$("#word").lettering();

function showDetails(button) {
	infoDiv.style.display = "flex";
	var name = button.getAttribute("data-name");
	infotext.innerHTML = name;
}

function hideDetails() {
	infoDiv.style.display = "none";
}

function guess(button) {
	var guessedCodepoint = button.getAttribute("data-codepoint");
	var guessedChar = (String.fromCodePoint(guessedCodepoint));
	console.log(guessedChar);
	var indexLocations = getAllIndexes(word, guessedChar);
	console.log(indexLocations);
	if(indexLocations.length > 0) {
		console.log("here");
		for(i = 0; i < indexLocations.length; i++) {
			console.log(indexLocations[i]);
			wordHidden = replaceAt(wordHidden, indexLocations[i], guessedChar)
			document.getElementById("word").innerHTML = wordHidden;
			$("#word").lettering();
		}
	}
	document.documentElement.scrollTop = 0; 
} 

function getAllIndexes(arr, val) {
    var indexes = [], i;
    for(i = 0; i < arr.length; i++)
        if (arr[i] === val)
            indexes.push(i);
    return indexes;
}

function replaceAt(str, index, ch) {
    return str.replace(/./g, (c, i) => i == index ? ch : c);
}