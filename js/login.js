document.addEventListener("DOMContentLoaded", function(e){
const loginForm = document.getElementById('loginForm');
//definir un evento por cuando se envie el formulario
loginForm.onsubmit= function(e) {
    e.preventDefault();
    //guardar el email en localstorash
    let userEmail= document.getElementById('userEmail').value;
    // console.log(userEmail)
    localStorage.setItem('email', userEmail);
    //redireccionando a la ruta principal
    window.location.href = '/portada.html';
};
    
});