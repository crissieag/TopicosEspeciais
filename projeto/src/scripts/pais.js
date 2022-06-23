BuscarAluno()

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
				aluno.notas.forEach(nota => {
					//soma o total de notas já encontrado com o total da nota atual
					somaTotalNotas = somaTotalNotas + nota.nota;
					//conta a quantidade de notas que ele encontrar
					qtdeNotas = qtdeNotas + 1;
				});

				//percorre todas as faltas do aluno
				aluno.faltas.forEach(falta => {
					somaTotalFaltas = somaTotalFaltas + falta.Faltas;
				});

				let mediaGeral = Number((somaTotalNotas / qtdeNotas).toFixed(1));
				let resultado = mediaGeral >= 6 ? 'Aprovado!' : 'Reprovado!';

				//preenche os resultados no HTML
				h1mediageral.innerText = mediaGeral;
				h1resultado.innerText = resultado;
				h1totalfaltas.innerText = somaTotalFaltas;

				//Procura a série em que o aluno está matriculado
				const serieAluno = series.find(s => s.serie === aluno.idSerie);
				//inicializa a lista de disciplinas dentro da série localizada
				const disciplinasSerie = [];

				//percorre todos os dias que estão cadastrados para a série
				serieAluno.dias.forEach(dia => {
					//percorre todas as disciplinas que estão dentro de cada dia
					dia.disciplinas.forEach(disciplina => {
						//se não encontrar a disciplina atual dentro da lista disciplinas, coloca ela dentro da lista
						if (!disciplinasSerie.some(ds => ds === disciplina.IdDisciplina)) {
							disciplinasSerie.push(disciplina.IdDisciplina);
						}
					});
				});

				//Faz o título da grid de disciplinas
				let innerHTMLdivdisciplinas = `
					<p class="titleGrid">Disciplina</p>
					<p class="titleGrid">Notas</p>
					<p class="titleGrid">Faltas</p>`;
				
				//percorre todas as disciplinas encontradas para a série localizada
				disciplinasSerie.forEach(disciplinaSerie => {
					innerHTMLdivdisciplinas = innerHTMLdivdisciplinas +
						//busca o nome da disciplina
						`<p>${disciplinas.find(d => d.id === disciplinaSerie).disciplina}</p>`+
						//busca a nota que o aluno tirou para a disciplina
						`<p>${aluno.notas.find(n => n.idDisciplina === disciplinaSerie).nota}</p>`+
						//busca as faltas que o aluno teve paara a disciplina
						`<p>${aluno.faltas.find(f => f.idDisciplina === disciplinaSerie).Faltas}</p>`;
				});

				//preenche a div de disciplinas
				divdisciplinas.innerHTML = innerHTMLdivdisciplinas;
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
