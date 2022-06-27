let alunos = [];
let disciplinasExtras = [];
let series = [];

CarregarDados()

function CarregarDados() {
    
	fetch("./JSON/aluno.json")
    .then((resAluno1) => {
        return resAluno1.json();
    })
    .then((resAluno2) => {
        alunos = resAluno2;
      
        fetch("./JSON/disciplinaextra.json")
        .then((resDisciplinaExtra1) => {
            return resDisciplinaExtra1.json();
        })
        .then((resDisciplinaExtra2) => {
            disciplinasExtras = resDisciplinaExtra2;

            fetch("./JSON/serie.json")
            .then((resSerie1) => {
                return resSerie1.json();
            })
            .then((resSerie2) => {
                series = resSerie2;
            });
        });
    });
}

// Seleciona elemento 
function selectElement(selector){
    return document.querySelector(selector);

}

//Limpar o conteúdo dentro da div buscaResultados
function limparResultados(){
    selectElement('.search-results').innerHTML = "";
}


function buscaResultados(){
    const search = selectElement('.searchbar').value;
    
    limparResultados();

    if(search.length > 0){ 
        for(let i = 0; i < alunos.length; i++){
            if(
                alunos[i].Matricula.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
                alunos[i].nome.toLocaleLowerCase().includes(search.toLocaleLowerCase())
            ){
                selectElement('.search-results').innerHTML +=  `
                

                
                <div class="infoAluno">
				<h3 id="alunos">Informações do aluno</h3>
				 <div class="cardsGlass cardFull">
						<h4 id="aluno">Aluno: ${alunos[i].nome}</h4>
						<p class="descriptionOpt">
                            <div class="containerGrid3">
								<div class="resultadoNota">
                                    <p>Matrícula:</p>
                                    <h1>${alunos[i].Matricula}</h1>
                                </div>								
                                <div>
                                    <p>Ano letivo:</p>
                                    <h1 class="h1-centralizado">${alunos[i].idSerie} Série</h1>
                                    </p>
                                </div>

                            </div>
                        <p class="descriptionOpt">Resultado por Disciplinas:</p>
						    <div class="containerGrid3">
                                <p class="titleGrid">Disciplina</p>
                                <p class="titleGrid">Notas</p>
								<p class="titleGrid">Faltas</p>
                                <p>Português</p>
                                ${alunos[i].notas[0].nota}
                                <p>2</p>
                                
                                <p>Matemática</p>
                                ${alunos[i].notas[1].nota}
								<p>0</p> 
                                <p>Física</p>
                                ${alunos[i].notas[2].nota}
								<p>1</p> 

                                <p>Química</p>
                                ${alunos[i].notas[3].nota}
								<p>2</p> 
                                <p>Artes</p>
                                ${alunos[i].notas[4].nota}
								<p>2</p> 
                                <p>Filosofia</p>
                                ${alunos[i].notas[5].nota}
								<p>5</p> 
                                <p>Geografia</p>
                                ${alunos[i].notas[6].nota}
								<p>1</p> 
                                <p>História</p>
                                ${alunos[i].notas[7].nota}
								<p>0</p> 
                                <p>Educação Física</p>
                                ${alunos[i].notas[8].nota}
								<p>2</p> 
                                <p>Biologia</p>
                                ${alunos[i].notas[9].nota}
								<p>4</p> 
                            </div>
							
							
                            <button type="button"
                            id="Exportar"
                            onclick="exportar()"				
                        >
                            Enviar Notas e Faltas
                        </button>	
							<div class="modal" id="modal">
								<div class="modal-content">
									<span class="close-button" onclick="closeModal()">
										&times;
									</span>
									<h1>Notas enviadas com sucesso!</h1>
								</div>
							</div>

							

							
					</div> 
				<div class="cardsGlass cardFull">
					
					
						<h4 id="atividadesExtra">Atividades Extra</h4>
						<p class="descriptionOpt">
							Essas são as atividades extra que o aluno está matriculado
						</p>
						<div class="containerGrid2">
							<p class="titleGrid">Atividade</p>
							<p class="titleGrid">Dia da Semana</p>
                            ${montaDisciplina(alunos[i])}

						</div>
					
				</div>
			</div>
                `;
            }
        }
    }
}

function montaDisciplina(aluno) {
    const serie = series.find(s => s.serie === aluno.idSerie);
    let htmlDisciplinas = ``;

    for (let index = 0; index < aluno.disciplinasExtra.length; index++) {
        const disciplinaExtra = disciplinasExtras.find(de => de.id === aluno.disciplinasExtra[index].IdDisciplinaExtra);
        htmlDisciplinas = htmlDisciplinas + 
        `<p>${disciplinaExtra.disciplinaExtra}</p> Segunda-feira`;
    }
    return htmlDisciplinas;
}

selectElement('.searchbar').addEventListener('keyup', buscaResultados);



/* Modal */
let modal = document.getElementById("modal");

function exportar() {
	modal.style.display = "block";

let modal2 = document.getElementById("modal2");

}
function exportar2() {
	modal2.style.display = "block";

}

function fechaModal2() {
	modal2.style.display = "none";
}

function fechaModal() {
	modal.style.display = "none";
}

window.onclick = (event) => {
	if (event.target == modal) {
		modal.style.display = "none";
	}
};
