let navIconOpen = document.getElementById("navIconOpen");
let navIconClose = document.getElementById("navIconClose");
let navUl = document.getElementById("navUl");
let menuLateral = document.getElementById("menuLateral");
let main = document.getElementById("main");
let expandeLi = document.getElementsByClassName("expandeLi");
let logoutBtn = document.getElementById("logoutBtn");

navIconOpen.addEventListener("click", () => {
	menuLateral.style.transition = "0.5s";
	menuLateral.style.width = "75px";
	navUl.style.display = "block";
	main.style.filter = "blur(1.5px)";
	logoutBtn.style.display = "none";
	if (menuLateral.style.width == "75px") {
		navIconClose.style.display = "block";
		navIconOpen.style.display = "none";
		logoutBtn.style.display = "block";
		logoutBtn.style.position = "relative";
	}
});

navIconClose.addEventListener("click", () => {
	navIconOpen.style.display = "block";
	menuLateral.style.transition = "0.5s";
	menuLateral.style.width = "15px";
	navUl.style.display = "none";
	navIconClose.style.display = "none";
	main.style.filter = "blur(0)";
	logoutBtn.style.display = "none";
});

logoutBtn.addEventListener("click", () => {
	window.location.replace("/projeto/login.html");
});

window.addEventListener("resize", () => {
	if (window.matchMedia("(min-width: 1024px)").matches) {
		navIconOpen.style.display = "none";
		navIconClose.style.display = "none";
		menuLateral.style.width = "120px";
		navUl.style.display = "block";
		main.style.filter = "blur(0)";
		logoutBtn.style.display = "block";
		logoutBtn.style.position = "absolute";
	}
	if (window.matchMedia("(max-width: 1024px)").matches) {
		menuLateral.style.transition = "0.5s";
		navIconOpen.style.display = "block";
		navUl.style.display = "none";
		main.style.filter = "blur(1.5px)";
		menuLateral.style.width = "15px";
		main.style.filter = "blur(0)";
		logoutBtn.style.display = "none";
	}
});
