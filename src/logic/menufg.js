function goToPage(name) {
	var menuholder = document.getElementById("menu");
	var ol = menuholder.querySelector(".menu-page-shown");
	var ne = menuholder.querySelector("#" + name);
	if (ne.classList) {
		if (ol) ol.classList.remove("menu-page-shown");
		ne.classList.add("menu-page-shown");
		menuholder.scroll({
			top: ne.offsetTop,
			behavior: "smooth" // smooth scroll
		});
	}
	else {
		if (ol) {
			ol.className = ol.className.replace("menu-page-shown", "");
			ol.className = ol.className.replace("  ", "");
		}
		ne.className += "menu-page-shown";
	}
}

function enterMainMenu() {
	document.getElementById("menu-buttons").className = "enabled";
	document.getElementById("menu-main-logo").className = "enabled";
	console.log("menu open");
}

function onStoryModeButtonClick() {
	goToPage("levels");
}

function onStoryModeBackButtonClick() {
	goToPage("main");
}

window.onStoryModeButtonClick = onStoryModeButtonClick;
window.onStoryModeBackButtonClick = onStoryModeBackButtonClick;

export { goToPage, enterMainMenu };
