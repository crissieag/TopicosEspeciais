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
})

$('#navIconClose').click(function(){
    $('#menuLateral').removeClass('active');
    $('.menu-btn').css("visibility", "visible");
})