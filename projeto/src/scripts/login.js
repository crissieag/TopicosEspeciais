const user = document.getElementById("user");
const password = document.getElementById("password");

function validateLogin() {
	if (user.value == "aluno" && password.value == "aluno") {
		window.location.replace("/projeto/aluno.html");
	} else if (user.value == "pais" && password.value == "pais") {
		window.location.replace("/projeto/paiss.html");
	}
}
