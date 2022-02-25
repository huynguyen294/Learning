/**
 *Thêm sự kiện cho toogle khi click thì toggle class active 
*/

const toggle = document.getElementById('toggle')
const nav = document.getElementById('nav')

toggle.addEventListener('click', () => nav.classList.toggle('active'))