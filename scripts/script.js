'use strict'
// elements

const a = document.getElementById('a');

a.addEventListener('click',()=>{
  document.querySelector('.versus').classList.toggle('versus-animation');
})