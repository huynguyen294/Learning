const percent = document.getElementById('percent')
const waters = document.querySelectorAll('.water-container .water')
const BigCupLiter = document.querySelector('.remain .num-liter')
const drank = document.querySelector('.drank')
const nonDrank = document.querySelector('.non-drank')

waters.forEach((water, idx) => {
    water.addEventListener('click', () => {
        updateActive(idx)

        percent.innerText = `${(idx + 1) / waters.length * 100}%`
        
        drank.style.height = `${(idx + 1) / waters.length * 100}%`
        nonDrank.style.height = `${ 100 - ((idx + 1) / waters.length) * 100}%`

        BigCupLiter.innerText = `${2-(((idx + 1) / waters.length * 100)/100)*2}L`
    })
})

function updateActive(idx) {
    for(let i = 0; i<=idx ; i++){
        waters[i].classList.add('active')
    }

    for(let i = idx+1; i<waters.length ; i++){
        if(waters[i].classList.length > 1){
            waters[i].classList.remove('active')
        }
    }
}