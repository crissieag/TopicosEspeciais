/*Interação Botão 1 */ 

// Get the modal
var modal1 = document.getElementById("modal1");

// Get the button that opens the modal
var btn1 = document.getElementById("botao1");

// When the user clicks the button, open the modal 

btn1.onclick = function() {
    modal1.style.display = "block";
}


/*Interação Botão 2 */ 

var modal2 = document.getElementById("modal2");
var btn2 = document.getElementById("botao2");
btn2.onclick = function() {
    modal2.style.display = "block";
}


/*Usado em ambos*/ 
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal1.style.display = "none";
  modal2.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal1) {
    modal1.style.display = "none";
  }
  
  if (event.target == modal2) {
    modal2.style.display = "none";
  }

}