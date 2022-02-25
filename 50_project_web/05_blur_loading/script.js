const loadingText = document.querySelector('.loading-text')
const bg = document.querySelector('.bg')

console.log(loadingText, bg)

let load = 0

let int = setInterval(blurring, 30)

function blurring() {
    load ++

    if( load >= 100){
        clearInterval(int)
    }

    loadingText.innerHTML = `${load}%`
    loadingText.style.opacity = scale(load, 0, 100, 1, 0)
    bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`
}

/**
 * hàm này để chuyển dãy số từ 0-100 là load, thành dãi số từ 1 đến 0 để giảm dần opacity
 * source: https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
*/
function scale (number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}