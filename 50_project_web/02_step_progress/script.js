let prev = document.getElementById('prev')
let next = document.getElementById('next')
let progress = document.getElementById('progress')
let circles = document.querySelectorAll('.circle')

let currActive = 1

next.addEventListener('click', () => {
    currActive ++

    if(currActive > circles.length){
        currActive = circles.length
    }

    update()
})

prev.addEventListener('click', () => {
    currActive --

    if(currActive < 1){
        currActive = 1
    }

    update()
})

function update() {
    circles.forEach((circle, idx) => {
        if(idx+1 === currActive){
            circle.classList.add('circle--active')
        }else if(idx+1 > currActive){
            circle.classList.remove('circle--active')
        }
    })

    progress.style.width = (currActive - 1)/(circles.length-1)*100 + '%'

    if(currActive === 1){
        prev.disabled = true
    }else if(currActive === circles.length){
        next.disabled = true
    }else{
        prev.disabled = false
        next.disabled = false
    }
}
