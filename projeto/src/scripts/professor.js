let matricula = document.getElementById('matricula');

function mostraBotoes() {
    if (matricula.value == '') {
        modal("Matricula não informada!");
        matricula.focus();
    } else {
        document.getElementById('mostraBotao').style.display = '';
    }
}

function mostraModal() {
    
}
