const infoDiv = document.getElementById("info");
const infotext = document.getElementById("infotext");
function showDetails(button) {
	infoDiv.style.display = "flex";
	var name = button.getAttribute("data-name");
	infotext.innerHTML = name;
}

function hideDetails() {
	infoDiv.style.display = "none";
}