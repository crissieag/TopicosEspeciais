let main = document.getElementById("main");

// $(document).ready(function(){
//     //jQuery para ativar submenus
//     $('.sub-btn').click(function(){
//         $(this).next('.sub-menu').slideToggle();
//         $(this).find('.dropdown').toggleClass('rotate');
//     })
// })

//jQuery para abrir e fechar menu lateral
$('.menu-btn').click(function(){
    $('#menuLateral').addClass('active');
    $('.menu-btn').css("visibility", "hidden");
    main.style.filter = "blur(1.5px)";
})

$('#navIconClose').click(function(){
    $('#menuLateral').removeClass('active');
    $('.menu-btn').css("visibility", "visible");
    main.style.filter = "blur(0)";
})