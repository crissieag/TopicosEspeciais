BuscarAluno();

function BuscarAluno() {
	//inicializando lista de disciplinas vazia
	let disciplinas = [];
	//inicializando lista de séries vazia
	let series = [];

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

					//Fazendo a busca do aluno.json depois de ter terminado a busca do serie.json
					fetch("./JSON/aluno.json")
						.then((res) => {
							return res.json();
						})
						.then((alunos) => {
							//pegando apenas o primeiro aluno, já que não sabemos qual responsável está logado
							const aluno = alunos[0];
							let h1resultado = document.getElementById("resultado");
							let h1mediageral = document.getElementById("mediageral");
							let h1totalfaltas = document.getElementById("totalfaltas");
							let divdisciplinas = document.getElementById("disciplinas");

							//inicializando as variáveis que serão mudadas de acordo com o conteúdo do aluno
							let somaTotalNotas = 0;
							let qtdeNotas = 0;
							let somaTotalFaltas = 0;

							//percorre todas as notas do aluno
							aluno.notas.forEach((nota) => {
								//soma o total de notas já encontrado com o total da nota atual
								somaTotalNotas = somaTotalNotas + nota.nota;
								//conta a quantidade de notas que ele encontrar
								qtdeNotas = qtdeNotas + 1;
							});

							//percorre todas as faltas do aluno
							aluno.faltas.forEach((falta) => {
								somaTotalFaltas = somaTotalFaltas + falta.Faltas;
							});

							let mediaGeral = Number((somaTotalNotas / qtdeNotas).toFixed(1));
							let resultado = mediaGeral >= 6 ? "Aprovado!" : "Reprovado!";

							//preenche os resultados no HTML
							h1mediageral.innerText = mediaGeral;
							h1resultado.innerText = resultado;
							h1totalfaltas.innerText = somaTotalFaltas;

							//Procura a série em que o aluno está matriculado
							const serieAluno = series.find((s) => s.serie === aluno.idSerie);
							//inicializa a lista de disciplinas dentro da série localizada
							const disciplinasSerie = [];

							//percorre todos os dias que estão cadastrados para a série
							serieAluno.dias.forEach((dia) => {
								//percorre todas as disciplinas que estão dentro de cada dia
								dia.disciplinas.forEach((disciplina) => {
									//se não encontrar a disciplina atual dentro da lista disciplinas, coloca ela dentro da lista
									if (
										!disciplinasSerie.some(
											(ds) => ds === disciplina.IdDisciplina
										)
									) {
										disciplinasSerie.push(disciplina.IdDisciplina);
									}
								});
							});

							//Faz o título da grid de disciplinas
							let innerHTMLdivdisciplinas = `
					<p class="titleGrid">Disciplina</p>
					<p class="titleGrid">Notas</p>
					<p class="titleGrid">Faltas</p>`;

							//preenche a div de disciplinas
							divdisciplinas.innerHTML = innerHTMLdivdisciplinas;

							//Listar Disciplinas e localizar data de provas
							let innerHTMLdivprovas = `
					<p class="titleGrid">Disciplina</p>
					<p class="titleGrid">Prova 1</p>
					<p class="titleGrid">Prova 2</p>`;

							disciplinasSerie.forEach((disciplinaSerie) => {
								innerHTMLdivprovas =
									innerHTMLdivprovas +
									//busca o nome da disciplina
									`<p>${
										disciplinas.find((d) => d.id === disciplinaSerie).disciplina
									}</p>
						<p>${disciplinas.find((d) => d.id === disciplinaSerie).provas[0].data}</p>
						<p>${disciplinas.find((d) => d.id === disciplinaSerie).provas[1].data}</p>`;
							});

							//preenche a div de provas
							divprovas.innerHTML = innerHTMLdivprovas;

							//horários de aulas
							let innerHTMLcalendarioAulas = "";
							//verifica quantos dias de aula tem na série
							let numeroDias = 0;
							//verifica quanl o dia que tem mais aulas na semana
							let numeroMaximoDisciplinas = 0;

							//percorre todos os dias de aula da série
							serieAluno.dias.forEach((dia) => {
								//preeche com o nome do dia
								innerHTMLcalendarioAulas =
									innerHTMLcalendarioAulas +
									`<p class="titleGrid">${dia.nomeDia}</p>`;
								//preecher o contador de número de dias
								numeroDias = numeroDias + 1;
								//se o dia da semana tem mais disciplinas do que o número máximo encontrado, então atualiza o número máximo
								if (dia.disciplinas.length > numeroMaximoDisciplinas) {
									numeroMaximoDisciplinas = dia.disciplinas.length;
								}
							});

							//percorre os dias da semana
							for (let i = 0; i < numeroDias; i++) {
								//percorre o número de disciplinas
								for (let j = 0; j < numeroMaximoDisciplinas; j++) {
									innerHTMLcalendarioAulas =
										innerHTMLcalendarioAulas +
										`<p>${
											disciplinas.find(
												(d) =>
													d.id ===
													serieAluno.dias[i].disciplinas[j].IdDisciplina
											).disciplina
										}</p>`;
								}
							}

							//preenche a div horários de aulas
							calendarioAulas.innerHTML = innerHTMLcalendarioAulas;
						});
				});
		});
}

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
	if (mensalidade.value > 0 && envio.value > 0) {
		modal2.style.display = "block";
		errorMsg2.style.display = "none";

		modal2Content.appendChild(novoParagrafo2);

		novoParagrafo2.innerText = `A fatura do mês ${
			mensalidade.options[mensalidade.value].text
		}
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

//Modal ano letivo
let btn3 = document.getElementById("enviaAnoLetivo");
let modal3 = document.getElementById("modal3");
let close3 = document.getElementById("close3");
let modal3Content = document.querySelector(".modal3-content");
let errorMsg3 = document.querySelector(".errorMsg3");
let anoLetivo = document.getElementById("anoLetivo");
let turmaEscolhida = document.getElementById("turmaEscolhida");
let turnoAula = document.getElementById("turnoAula");
let novoParagrafo3 = document.createElement("p");

function feedbackMatriculaAnoLetivo() {
	if (anoLetivo.value > 0 && turmaEscolhida.value > 0 && turnoAula.value > 0) {
		modal3.style.display = "block";
		errorMsg3.style.display = "none";

		modal3Content.appendChild(novoParagrafo3);

		novoParagrafo3.innerText = `A solicitação para matrícula no ano letivo de ${
			anoLetivo.options[anoLetivo.value].text
		}, no período ${turnoAula.options[turnoAula.value].text}, para a turma ${
			turmaEscolhida.options[turmaEscolhida.value].text
		} foi realizada. Aguarde confirmação da secretaria, pois somente a solicitação de matrícula não garante vaga na turma escolhida!`;
	} else {
		errorMsg3.style.display = "block";
	}
}

function fechaModal3() {
	modal3.style.display = "none";
}

window.onclick = (event) => {
	if (event.target == modal) {
		modal3.style.display = "none";
	}
};
