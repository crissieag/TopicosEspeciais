const user = document.getElementById("user");
const password = document.getElementById("password");

function validateLogin() {
	if (user.value == "aluno" && password.value == "aluno") {
		window.location.replace("/projeto/aluno.html");
	}
}
