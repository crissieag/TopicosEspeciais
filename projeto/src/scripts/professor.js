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


function getDataAluno() {
	let disciplinas = [];
	let aluno = null;

	var parametro = document.getElementById("matricula").value;
	var tableHeaderRowCount = 1;
	var table = document.getElementById('tableAluno');
	var rowCount = table.rows.length;
	for (var i = tableHeaderRowCount; i < rowCount; i++) {
		table.deleteRow(tableHeaderRowCount);
	}
	if(parametro != null && parametro != undefined)
	fetch("./JSON/disciplinas.json")
		.then((res) => {
			return res.json();
		}).then((res) => {
			disciplinas = res;
			fetch("./JSON/aluno.json")
				.then((res) => {
					return res.json();
				})
				.then((alunos) => {
					aluno = alunos.find(
						(a)=>a.Matricula === parametro 
					);

					for (i = 0; i < disciplinas.length; i++){
						fillTable(disciplinas[i].disciplina,aluno.notas[i].nota, aluno.faltas[i].Faltas)
					}

				});
		});
}

function fillTable(disciplina, nota, falta) {
//Procura uma tabela com a ID = "tableAluno"
var table = document.getElementById("tableAluno");

// Cria um <tr> vazio 
var row = table.insertRow();

// Adiciona novas células
var cell1 = row.insertCell(0);
var cell2 = row.insertCell(1);
var cell3 = row.insertCell(2);

// Adciona texto a tabela
cell1.innerHTML = disciplina;
cell2.innerHTML = nota;
cell3.innerHTML = falta;

}

function calculaMediaGeral(aluno) {
	let somaTotalNotas = 0;
	let qtdeNotas = 0;

	//percorre todas as notas do aluno
	aluno.notas.forEach((nota) => {
		//soma o total de notas já encontrado com o total da nota atual
		somaTotalNotas = somaTotalNotas + nota.nota;
		//conta a quantidade de notas que ele encontrar
		qtdeNotas = qtdeNotas + 1;
	});

	let mediaGeral = Number((somaTotalNotas / qtdeNotas).toFixed(1));
	return mediaGeral;
}

/**Busca o resultado de aprovação do aluno
 * @returns {string} "Aprovado!" se mediaGeral >= 6
 * @returns {string} "Reprovado!" se mediaGeral < 6
 */
function getResultado(mediaGeral) {
	return mediaGeral >= 6 ? "Aprovado!" : "Reprovado!";
}

/*Soma o total de faltas */
function getTotalFaltas(aluno) {
	let somaTotalFaltas = 0;

	//percorre todas as faltas do aluno
	aluno.faltas.forEach((falta) => {
		somaTotalFaltas = somaTotalFaltas + falta.Faltas;
	});

	return somaTotalFaltas;
}

/*Preenche qtd de faltas do aluno dinamicamente*/
function preencheFaltasDinamic(totalFaltas) {
	let alunoFaltas = document.getElementById("f1");
	alunoFaltas.innerText = totalFaltas;
}

/*Preenche disciplinas do aluno dinamicamente*/
function preencheDisciplinasDinamic(disciplinas) {
	let disciplina = document.getElementById("d1");
	disciplina.innerText = disciplinas;
}

/*Preenche media do aluno dinamicamente*/
function preencheMediaDinamic(mediaGeral) {
	let alunoMedia = document.getElementById("n1");
	alunoMedia.innerText = mediaGeral;
}

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
