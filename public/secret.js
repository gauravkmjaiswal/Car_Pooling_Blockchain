let menubar = document.querySelector('.move')
let mynav = document.querySelector('.navbar');

menubar.onclick = () =>{
    console.log('ss')
    menubar.classList.toggle('fa-times');
    mynav.classList.toggle('active');
}