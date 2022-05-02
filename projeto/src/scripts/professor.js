let matricula = document.getElementById('matricula');
let agendarBtn = document.getElementById('agendarBtn');
let agendaProva = document.getElementById('prova');
let agendaAtividade = document.getElementById('atividade');
let agendaAula = document.getElementById('aula');

let modal = document.getElementById("modal");
let close = document.getElementById("close");

let modalContent = document.querySelector(".modal-content");
let errorMsg = document.querySelector(".errorMsg");


function mostraBotoes() {
    if (matricula.value == '') {
        modal("Matricula não informada!");
        matricula.focus();
    } else {
        document.getElementById('mostraBotao').style.display = '';
    }
}

function modalAgendamento() {
    console.log("asijdasijd");
    if (agendaAula.checked == true || agendaProva.checked == true || agendaAtividade.checked == true) {
		modal.style.display = "block";
		errorMsg.style.display = "none";
	} else {
		errorMsg.style.display = "block";
	}
}

function fechaModal() {
	modal.style.display = "none";
}
