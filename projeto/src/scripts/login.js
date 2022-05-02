const user = document.getElementById("user");
const password = document.getElementById("password");
let errorMsg = document.getElementById("errorMsg");

function validateLogin() {
	if (user.value == "aluno" && password.value == "aluno") {
		window.location.replace("/projeto/aluno.html");
	} else if (user.value == "pais" && password.value == "pais") {
		window.location.replace("/projeto/pais.html");
	} else if (user.value == "professor" && password.value == "professor") {
		window.location.replace("/projeto/professor.html");
	} else if (user.value == "secretaria" && password.value == "secretaria") {
		window.location.replace("/projeto/secretaria.html");
	} else if (user.value == "financeiro" && password.value == "financeiro") {
		window.location.replace("/projeto/financeiro.html");
	} else {
		errorMsg.style.display = "block";
	}
}
