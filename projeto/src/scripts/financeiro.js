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
                
                <div class="containerGrid3">
                    <div class="resultadoNota">
                        <p>Matrícula:</p>
                        <h1><span class="search-item">${alunos[i].Matricula}</span></h1>
                    </div>
                	

                    <div class="containerGrid2">
                        <div class="resultadoNota">
                            <p>Nome:</p>
                            <h1><span class="search-item">${alunos[i].nome}</span></h1>
                        </div>
                    </div>

                    <div class="containerGrid2">
                        <div class="resultadoNota">
                            <p>Valor total:</p>
                            <h1><span class="search-item">R$ ${somarValores(alunos[i])}</span></h1>
                        </div>
                    </div>
                
                </div>
                
                <div class ="search-results-item">
                    <div class="flexCard">
                        <div class="cardsGlass">
                            <div class="containerGrid2">
                                <p class="titleGrid">Atividade Extra</p>
                                <p class="titleGrid">Valor</p>
                                ${montaDisciplina(alunos[i])}
                            </div>
                        </div>
                    </div>
                </div>`;
            }
        }
    }
}

function somarValores(aluno){
    let valorTotal = 0;

    for (let index = 0; index < aluno.disciplinasExtra.length; index++) {
        valorTotal = valorTotal + disciplinasExtras.find(de => de.id === aluno.disciplinasExtra[index].IdDisciplinaExtra).preco;
    }

    valorTotal = valorTotal + series.find(s => s.serie === aluno.idSerie).preco;

    return valorTotal;
}

function montaDisciplina(aluno) {
    const serie = series.find(s => s.serie === aluno.idSerie);
    let htmlDisciplinas = `<p>${serie?.serie}ª Série</p><p>R$ ${serie.preco}</p>`;

    for (let index = 0; index < aluno.disciplinasExtra.length; index++) {
        const disciplinaExtra = disciplinasExtras.find(de => de.id === aluno.disciplinasExtra[index].IdDisciplinaExtra);
        htmlDisciplinas = htmlDisciplinas + 
        `<p>${disciplinaExtra.disciplinaExtra}</p>
        <p>R$ ${disciplinaExtra.preco}</p>`;
    }
    return htmlDisciplinas;
}

selectElement('.searchbar').addEventListener('keyup', buscaResultados);



/* Modal */
let modal = document.getElementById("modal");

function exportar() {
	modal.style.display = "block";

}

function fechaModal() {
	modal.style.display = "none";
}

window.onclick = (event) => {
	if (event.target == modal) {
		modal.style.display = "none";
	}
};
