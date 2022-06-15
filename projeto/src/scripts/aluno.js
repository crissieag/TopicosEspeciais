let btn = document.getElementById("enviaMatricula");
let modal = document.getElementById("modal");

let modalContent = document.querySelector(".modal-content");
let errorMsg = document.querySelector(".errorMsg");

let atividade = document.getElementById("atividade");
let diaSemana = document.getElementById("diaSemana");
let horarioAtividade = document.getElementById("horarioAtividade");

let novoParagrafo = document.createElement("p");

function feedbackMatricula() {
	if (
		atividade.value > 0 &&
		diaSemana.value > 0 &&
		horarioAtividade.value > 0
	) {
		modal.style.display = "block";
		errorMsg.style.display = "none";

		modalContent.appendChild(novoParagrafo);

		novoParagrafo.innerText = `A solicitação para matrícula na atividade extra ${
			atividade.options[atividade.value].text
		}, no dia ${diaSemana.options[diaSemana.value].text} - às: ${
			horarioAtividade.options[horarioAtividade.value].text
		} foi realizada. Em até 48hrs o professor irá analisar o pedido.`;
	} else {
		errorMsg.style.display = "block";
	}
}

function fechaModal() {
	modal.style.display = "none";
}

window.onclick = (event) => {
	if (event.target == modal) {
		modal.style.display = "none";
	}
};
