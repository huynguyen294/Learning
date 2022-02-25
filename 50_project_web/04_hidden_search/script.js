let search = document.querySelector('.search')
let input = document.getElementById('search_input')
let btnSearch = document.querySelector('#search-icon')
let btnHidden = document.querySelector('#hidden-icon')


btnSearch.addEventListener('click', () => {
    let active = false
    search.classList.forEach(s => {if(s==='active'){active = true}})
    if(active){
        //đây là đoạn mã xử lí khi btnSearch được click trong khi đã active
        if(input.value){
            alert('Bạn đang tìm kiếm ' + input.value)
        }else{
            alert('Bạn chưa nhập nội dung tìm kiếm')
        }
    }
    search.classList.add('active')
    input.focus()
})

btnHidden.addEventListener('click', () => {
    search.classList.remove('active')
})

input.addEventListener('keyup', (ev) => {
    console.log(ev.keyCode)
    if(ev.keyCode === 13){
        if(input.value){
            alert('Bạn đang tìm kiếm ' + input.value)
        }else{
            alert('Bạn chưa nhập nội dung tìm kiếm')
        }
    }
})
/* 
input.addEventListener('focusin', () => {
    window.addEventListener('keyup', (ev) => {
        if(ev.keyCode === 13){
            alert('Bạn đang tìm kiếm ' + input.value)
        }
    })
})

input.addEventListener('focusout', () => {
    window.removeEventListener('keyup', () => {})
}) */