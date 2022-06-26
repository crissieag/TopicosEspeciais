let btn = document.getElementById("enviaMatricula");
let modal = document.getElementById("modal");

let modalContent = document.querySelector(".modal-content");
let errorMsg = document.querySelector(".errorMsg");

let atividade = document.getElementById("atividade");
let diaSemana = document.getElementById("diaSemana");
let horarioAtividade = document.getElementById("horarioAtividade");

let novoParagrafo = document.createElement("p");

BuscarAluno();

function BuscarAluno() {
	//inicializando lista de disciplinas vazia
	let disciplinas = [];
	//inicializando lista de séries vazia
	let series = [];

	let disciplinasExtra = [];

	//Fazendo a busca do disciplinas.json
	fetch("./JSON/disciplinas.json")
		.then((res) => {
			return res.json();
		})
		.then((res) => {
			//preenchendo a lista de disciplinas com o que encontrou no disciplinas.json
			disciplinas = res;

			//Fazendo a busca do serie.json depois de ter terminado a busca do disciplinas.json
			fetch("./JSON/serie.json")
				.then((res) => {
					return res.json();
				})
				.then((res) => {
					//preenchendo a lista de series com o que encontrou no serie.json
					series = res;
					fetch("./JSON/disciplinaextra.json")
						.then((res) => {
							return res.json();
						})
						//Fazendo a busca das disciplinaextra.json depois de ter terminado a busca do serie.json
						.then((res) => {
							disciplinasExtra = res;
							//Fazendo a busca do aluno.json depois de ter terminado a busca das disciplinasextra.json
							fetch("./JSON/aluno.json")
								.then((res) => {
									return res.json();
								})
								.then((alunos) => {
									//pegando apenas o primeiro aluno, já que não sabemos qual responsável está logado
									const aluno = alunos[0];
									//Procura a série em que o aluno está matriculado
									const serieAluno = series.find(
										(s) => s.serie === aluno.idSerie
									);

									const mediaGeral = calculaMediaGeral(aluno);
									const resultado = getResultado(mediaGeral);
									const totalFaltas = getTotalFaltas(aluno);

									//inicializa a lista de disciplinas dentro da série localizada
									const disciplinasSerie = getDisciplinasSerie(
										disciplinas,
										serieAluno
									);

									const atividadesExtra = getAtividadesExtra(
										disciplinasExtra,
										aluno
									);

									const gradeHoraria = getGradeHoraria(disciplinas, serieAluno);

									//invoca funções específicas para cada informação do aluno
									preencheResultado(resultado);
									preencheMedia(mediaGeral);
									preencheFaltas(totalFaltas);
									preencheResultadosPorDisciplina(disciplinasSerie, aluno);
									preencheAgendaProvas(disciplinasSerie);
									preencheListaAtividadesExtra(atividadesExtra);
									preencheGradeHorariaAluno(gradeHoraria);
								});
						});
				});
		});
}

/**Busca as disciplinas percorrendo todos os dias cadastrados para a série
 * e encontrando a disciplina correspondente na lista de disciplinas */
function getDisciplinasSerie(disciplinas, serieAluno) {
	const disciplinasSerie = [];
	//percorre todos os dias que estão cadastrados para a série
	serieAluno.dias.forEach((dia) => {
		//percorre todas as disciplinas que estão dentro de cada dia
		dia.disciplinas.forEach((disciplinaDia) => {
			//se não encontrar a disciplina atual dentro da lista disciplinas, coloca ela dentro da lista
			if (
				!disciplinasSerie.some((ds) => ds.id === disciplinaDia.IdDisciplina)
			) {
				disciplinasSerie.push(
					disciplinas.find((d) => d.id === disciplinaDia.IdDisciplina)
				);
			}
		});
	});
	return disciplinasSerie;
}

function getGradeHoraria(disciplinas, serieAluno) {
	const grade = [];
	serieAluno.dias.forEach((dia, indexDia) => {
		grade.push({
			dia: dia.nomeDia,
			disciplinas: dia.disciplinas.map(
				(d) =>
					disciplinas.find((disciplina) => disciplina.id == d.IdDisciplina)
						.disciplina
			),
		});
	});
	return grade;
}

/**Calcula média geral do aluno
 * @returns {number} a divisão da soma das notas pela quantidade de notas
 */
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

/**Soma o total de faltas */
function getTotalFaltas(aluno) {
	let somaTotalFaltas = 0;

	//percorre todas as faltas do aluno
	aluno.faltas.forEach((falta) => {
		somaTotalFaltas = somaTotalFaltas + falta.Faltas;
	});

	return somaTotalFaltas;
}

/**Preenche resultado de aprovação do aluno */
function preencheResultado(resultado) {
	let resultadoAluno = document.getElementById("alunoResultado");
	resultadoAluno.innerText = resultado;
}

/**Preenche resultado de aprovação do aluno */
function preencheMedia(mediaGeral) {
	let alunoMedia = document.getElementById("alunoMedia");
	alunoMedia.innerText = mediaGeral;
}

/**Preenche faltas do aluno */
function preencheFaltas(totalFaltas) {
	let alunoFaltas = document.getElementById("alunoFaltas");
	alunoFaltas.innerText = totalFaltas;
}

/**Preenche resultados por disciplina */
function preencheResultadosPorDisciplina(disciplinas, aluno) {
	let resultadoPorDisciplina = document.getElementById(
		"resultadoPorDisciplina"
	);
	disciplinas.forEach((disciplina) => {
		resultadoPorDisciplina.innerHTML += createDisciplinaResultadosElement(
			disciplina,
			aluno
		);
	});
}

/**Cria elemento de resultados de disciplinas */
function createDisciplinaResultadosElement(disciplina, aluno) {
	return (
		//busca o nome da disciplina
		`<p>${disciplina.disciplina}</p>` +
		//busca a nota que o aluno tirou para a disciplina
		`<p>${aluno.notas.find((n) => n.idDisciplina === disciplina.id).nota}</p>` +
		//busca as faltas que o aluno teve paara a disciplina
		`<p>${
			aluno.faltas.find((f) => f.idDisciplina === disciplina.id).Faltas
		}</p>`
	);
}

/**Preenche agenda de provas */
function preencheAgendaProvas(disciplinas) {
	let agendaProvas = document.getElementById("agendaProvas");
	disciplinas.forEach((disciplina) => {
		agendaProvas.innerHTML += createDisciplinaProvasElement(disciplina);
	});
}

/**Cria elemento da disciplina para agenda de provas */
function createDisciplinaProvasElement(disciplina) {
	return (
		`<p>${disciplina.disciplina}</p>` +
		`<p>${disciplina.provas[0].data}</p>` +
		`<p>${disciplina.provas[1].data}</p>`
	);
}

function getAtividadesExtra(disciplinasExtra, aluno) {
	const atividades = [];
	aluno.disciplinasExtra.forEach((atividade) => {
		atividades.push(
			disciplinasExtra.find((d) => d.id == atividade.IdDisciplinaExtra)
		);
	});
	return atividades;
}

/**Preenche atividades extras do aluno */
function preencheListaAtividadesExtra(atividades) {
	let listaAtividadesExtra = document.getElementById("listaAtividadesExtra");
	atividades.forEach((atividade) => {
		listaAtividadesExtra.innerHTML += `<p>${atividade.disciplinaExtra}</p> <p>${atividade.dias[0].nome} | ${atividade.dias[1].nome}</p>`;
	});
}

/**Preenche grade horária do aluno */
function preencheGradeHorariaAluno(gradeHoraria) {
	let gradeHorariaElement = document.getElementById("gradeHorariaAluno");
	for (let i = 0; i < 5; i++) {
		for (let j = 0; j < gradeHoraria.length; j++) {
			gradeHorariaElement.innerHTML += `<p>${gradeHoraria[j].disciplinas[i]}</p>`;
		}
	}
}

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
