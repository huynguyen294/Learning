let btn_success = document.querySelector('.btn-success')
let btn_danger = document.querySelector('.btn-danger')
let toast_success = document.querySelector('.toast-success')
let toast_danger = document.querySelector('.toast-danger')
let btn_check_success = document.querySelector('.toast-success .fa-times-circle')
let check_danger = document.querySelector('.toast-danger .fa-times-circle')

btn_success.addEventListener('click', () => {
    let clicked = false
    let check_clicked = false
    toast_success.classList.forEach(i => {
        if(i == 'toast-clicked'){
            clicked = true
        }
    })
    if(!clicked){
        toast_success.classList.add('toast-clicked')
        btn_check_success.addEventListener('click', () => {
            toast_success.classList.remove('toast-clicked')
            toast_success.classList.add('toast-hidden')
        })
        setTimeout(() => {
            toast_success.classList.forEach(i => {
                if(i == 'toast-hidden'){
                    check_clicked = true
                }
            })
            if(!check_clicked){
                toast_success.classList.remove('toast-clicked')
                toast_success.classList.add('toast-hidden')
                setTimeout(() => {
                    toast_success.classList.remove('toast-hidden')
                }, 500)
            }else{
                toast_success.classList.remove('toast-hidden')
            }
        }, 2000)
    }else{
        alert('đừng click nhiều quá cmm')
    }
})

btn_danger.addEventListener('click', () => {
    var clicked = false
    let check_clicked = false
    toast_danger.classList.forEach(i => {
        if(i == 'toast-clicked'){
            clicked = true
        }
    })
    if(!clicked){
        toast_danger.classList.add('toast-clicked')
        check_danger.addEventListener('click', () => {
            toast_danger.classList.remove('toast-clicked')
            toast_danger.classList.add('toast-hidden')
        })
        setTimeout(() => {
            toast_danger.classList.forEach(i => {
                if(i == 'toast-hidden'){
                    check_clicked = true
                }
            })
            if(!check_clicked){
                toast_danger.classList.remove('toast-clicked')
                toast_danger.classList.add('toast-hidden')
                setTimeout(() => {
                    toast_danger.classList.remove('toast-hidden')
                }, 500)
            }else{
                toast_danger.classList.remove('toast-hidden')
            }
        }, 3000)
    }else{
        alert('đừng click nhiều quá cmm')
    }
})
