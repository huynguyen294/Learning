/* 
- cần tương tác
- list-cupsmall
- liters
- percentage
- remained
Khi click vào một small cup => thực hiện hàm highlightCups
=> hàm này highlight tất cả các cups có idx2 bé hơn idx cup đã click => add class full và remove các cups còn lại
kiểm tra click lần thứ 2 khi đã fill full nếu đối tượng đang click đã có classfull(check bằng hàm contains => hàm này check trong một mảng và trả về giá trị boolean) và đối tượng trước nó (nextElementSibling)
không có class full thì cho idx--, tức xóa fill phần tử đang click
sử dụng hàm updateBigCup khi lần đầu load và mỗi lần click
trong đó get fullCups = tất cả các phần tử có full
sẽ lấy ra được số lượng cup full
totalCups = số lượng small cup
=> lấy được % cups full
sử dụng thuộc tính visibility để cho percentage hidden(ẩn) hoặc visible(bth) 
-> heiht khi ẩn bằng 0 và khi hiện thì bằng % * 330px(chiều cao ban đầu của cup)
Thay đổi innerText bằng %
khi fullCup === total cup thì ẩn remained đi
ngược lại thì visible => và set text cho nó
*/

const smallCups = document.querySelectorAll('.cup-small')
const liters = document.getElementById('liters')
const percentage = document.getElementById('percentage')
const remained = document.getElementById('remained')

updateBigCups()

smallCups.forEach((cup, idx) => {
    cup.addEventListener('click', () => highlightCups(idx))
})

function highlightCups(idx){

    if(smallCups[idx].classList.contains('full') &&
    !smallCups[idx].nextElementSibling.classList.contains('full')){
        idx--
    }
    
    smallCups.forEach((cup, idx2) => {
        if(idx2 <= idx){
            cup.classList.add('full')
        }else{
            cup.classList.remove('full')
        }
    })

    updateBigCups()
}

function updateBigCups(){
    const fullCups = document.querySelectorAll('.full').length
    const totalCups = document.querySelectorAll('.cup-small').length

    const percent = fullCups / totalCups
    
    if(fullCups === 0){
        percentage.style.visibility = 'hidden'
        percentage.style.height = 0
    }else{
        percentage.style.visibility = 'visible'
        percentage.style.height = `${percent*330}px`
    }

    if(percent === 1){
        remained.style.visibility = 'hidden'
        remained.style.height = 0
    }else{
        remained.style.visibility = 'visible'
        liters.innerText = `${2 - percent*2}L`
    }
}