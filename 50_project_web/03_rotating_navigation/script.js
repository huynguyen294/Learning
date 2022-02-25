let open = document.getElementById('open')
let close = document.getElementById('close')
let container = document.querySelector('.container')

console.log(open, close, container)

open.addEventListener('click', () => 
    container.classList.add('show-nav')
)

close.addEventListener('click', () => {
    container.classList.remove('show-nav')
})