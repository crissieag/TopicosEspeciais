const database = [
    {
        alunoMatricula: "0001",
        alunoNome: "Maria Francisca",
        alunoDisciplinas: [
            {
                disciplinaNome: "Judô",
                disciplinaValor: 100
            },
            {
                disciplinaNome: "Ballet",
                disciplinaValor: 200
            }
        ]
    },

    {
        alunoMatricula: "0002",
        alunoNome: "João Victor",
        alunoDisciplinas: [
            {
                disciplinaNome: "Ballet",
                disciplinaValor: 200
            }
        ]

    },

    {
        alunoMatricula: "0003",
        alunoNome: "Mateus Garrido",
        alunoDisciplinas: [
            {
                disciplinaNome: "Judô",
                disciplinaValor: 100
            },
            {
                disciplinaNome: "Inglês",
                disciplinaValor: 300
            },
            {
                disciplinaNome: "Espanhol",
                disciplinaValor: 300
            }
        ]
        
    },
    
];




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
        for(let i = 0; i < database.length; i++){
            if(
                database[i].alunoMatricula.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
                database[i].alunoNome.toLocaleLowerCase().includes(search.toLocaleLowerCase())
            ){
                selectElement('.search-results').innerHTML +=  `
                
                <div class="containerGrid3">
                    <div class="resultadoNota">
                        <p>Matrícula:</p>
                        <h1><span class="search-item">${database[i].alunoMatricula}</span></h1>
                    </div>
                	

                    <div class="containerGrid2">
                        <div class="resultadoNota">
                            <p>Nome:</p>
                            <h1><span class="search-item">${database[i].alunoNome}</span></h1>
                        </div>
                    </div>

                    <div class="containerGrid2">
                        <div class="resultadoNota">
                            <p>Valor total:</p>
                            <h1><span class="search-item">R$ ${somarValores(database[i].alunoDisciplinas)}</span></h1>
                        </div>
                    </div>
                
                </div>
                
                <div class ="search-results-item">
                    <div class="flexCard">
                        <div class="cardsGlass">
                            <div class="containerGrid2">
                                <p class="titleGrid">Atividade Extra</p>
                                <p class="titleGrid">Valor</p>
                                ${montaDisciplina(database[i].alunoDisciplinas)}
                            </div>
                        </div>
                    </div>
                </div>`;
            }
        }
    }
}

function somarValores(disciplinas){
    let valorTotal = 0;
    for (let index = 0; index < disciplinas.length; index++) {
        valorTotal = valorTotal + disciplinas[index].disciplinaValor;
        
    }

    return valorTotal;


}

function montaDisciplina(disciplinas) {
    let htmlDisciplinas = '';
    for (let index = 0; index < disciplinas.length; index++) {
        const disciplina = disciplinas[index];
        htmlDisciplinas = htmlDisciplinas + 
        `<p>${disciplina.disciplinaNome}</p>
        <p>R$ ${disciplina.disciplinaValor}</p>`;
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
