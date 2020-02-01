function goToPage(name) {
  var menuholder = document.getElementById("menu");
  var ol = menuholder.querySelector(".menu-page-shown");
  var ne = menuholder.querySelector("#" + name);
  if (ne.classList) {
    if (ol) ol.classList.remove("menu-page-shown");
    ne.classList.add("menu-page-shown")
  }
  else {
    if (ol) {
      ol.className = ol.className.replace("menu-page-shown", "");
      ol.className = ol.className.replace("  ", "");
    }
    ne.className += "menu-page-shown";
  }
}

export { goToPage };
