let tituloPresenca1 = document.getElementById("tituloPresenca1");
let tituloPresenca2 = document.getElementById("tituloPresenca2");
let tituloNota1 = document.getElementById("tituloNota1");
let tituloNota2 = document.getElementById("tituloNota2");
let turma1Presenca = document.querySelector(".turma1-presenca");
let turma2Presenca = document.querySelector(".turma2-presenca");
let turma1Nota = document.querySelector(".turma1-nota");
let turma2Nota = document.querySelector(".turma2-nota");

let inputTurmas1 = document.querySelectorAll(".turma1 div input");
let novoSpan = document.createElement("span");
let matricula = document.getElementById("matricula");
let agendarBtn = document.getElementById("agendarBtn");
let agendaProva = document.getElementById("prova");
let agendaAtividade = document.getElementById("atividade");
let agendaAula = document.getElementById("aula");
let modal = document.getElementById("modal");
let close = document.getElementById("close");

let modalContent = document.querySelector(".modal-content");
let errorMsg = document.querySelector(".errorMsg");

function mostraBotoes() {
	if (matricula.value == "") {
		modal("Matricula não informada!");
		matricula.focus();
	} else {
		document.getElementById("mostraBotao").style.display = "";
	}
}

function mostraModal() {}

tituloPresenca1.addEventListener("click", () => {
	if (turma1Presenca.style.display == "block") {
		turma1Presenca.style.display = "none";
	} else {
		turma1Presenca.style.display = "block";
		turma1Presenca.style.transition = "0.5s";
	}
});

tituloPresenca2.addEventListener("click", () => {
	if (turma2Presenca.style.display == "block") {
		turma2Presenca.style.display = "none";
	} else {
		turma2Presenca.style.display = "block";
		turma2Presenca.style.transition = "0.5s";
	}
});

tituloNota1.addEventListener("click", () => {
	if (turma1Nota.style.display == "block") {
		turma1Nota.style.display = "none";
	} else {
		turma1Nota.style.display = "block";
		turma1Nota.style.transition = "0.5s";
	}
});

tituloNota2.addEventListener("click", () => {
	if (turma2Nota.style.display == "block") {
		turma2Nota.style.display = "none";
	} else {
		turma2Nota.style.display = "block";
		turma2Nota.style.transition = "0.5s";
	}
});
function modalAgendamento() {
	console.log("asijdasijd");
	if (
		agendaAula.checked == true ||
		agendaProva.checked == true ||
		agendaAtividade.checked == true
	) {
		modal.style.display = "block";
		errorMsg.style.display = "none";
	} else {
		errorMsg.style.display = "block";
	}
}

function fechaModal() {
	modal.style.display = "none";
}
