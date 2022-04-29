const database = [
    {
        alunoMatricula: "0001",
        alunoNome: "Maria Francisca",
        alunoSerie: "2ª série",
        alunoDisciplina1: "Ballet",
        alunoDisciplina2: "Judo"
        
    },

    {
        alunoMatricula: "0002",
        alunoNome: "João Victor",
        alunoSerie: "2ª série",
        alunoDisciplina1: "Ballet",
        alunoDisciplina2: "Inglês"
        
    },

    {
        alunoMatricula: "0003",
        alunoNome: "Mateus Garrido",
        alunoSerie: "2ª série",
        alunoDisciplina1: "Ballet",
        alunoDisciplina2: "Inglês",
        alunoDisciplina3: "Espanhol"
        
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
                <div class ="search-results-item">
                <span class="search-item">${database[i].alunoMatricula}</span>
                <span class="search-item">${database[i].alunoNome}</span>
                </div>`;

            }
        }
    }
}

selectElement('.searchbar').addEventListener('keyup', buscaResultados);