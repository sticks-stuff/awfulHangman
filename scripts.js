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
var word = "dummy";
var wordHidden = "dummy";

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
	socket.emit('guess', guessedCodepoint);
	document.documentElement.scrollTop = 0; 
} 

const socket = io('ws://awfulhangman.herokuapp.com');
socket.on('word is', res => { 
	document.getElementById('word').innerHTML = res;
});