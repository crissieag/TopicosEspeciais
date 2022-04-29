////Botão 1 Matricula

let btn = document.getElementById("enviaMatricula");
let modal = document.getElementById("modal");
let close = document.getElementById("close");

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

////Botão 2 - Financeiro
let btn2 = document.getElementById("enviaFatura");
let modal2 = document.getElementById("modal2");
let close2 = document.getElementById("close2");

let modal2Content = document.querySelector(".modal2-content");
let errorMsg2 = document.querySelector(".errorMsg2");

let mensalidade = document.getElementById("mensalidade");
let envio = document.getElementById("envio");


let novoParagrafo2 = document.createElement("p");

function feedbackFatura() {
	if (
		mensalidade.value > 0 &&
		envio.value > 0 
	) {
		modal2.style.display = "block";
		errorMsg2.style.display = "none";

		modal2Content.appendChild(novoParagrafo2);

		novoParagrafo2.innerText = `A fatura do mês ${
			mensalidade.options[mensalidade.value].text}
		 será enviada para o seu ${envio.options[envio.value].text} 
		 `;
	

	} else {
		errorMsg2.style.display = "block";
	}
}

function fechaModal2() {
	modal2.style.display = "none";
}

window.onclick = (event) => {
	if (event.target == modal2) {
		modal2.style.display = "none";
	}
};
