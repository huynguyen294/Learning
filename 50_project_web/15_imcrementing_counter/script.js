/* 
Tạo innerText cho counter bằng css
khởi tạo giá trị ban đầu là 0 khi mới load
tạo một hàm uppdate couter trong đó thực hiện:
tạo biến target và gán giá trị bằng getAttribute các datatarget của counter lúc này giá trị trả ra là các string
Ép kiểu: có thể thực hiện ép Number hoặc thêm dấu cộng trước nó để ép kiểu
tạo biến c để và lấy giá trị của counter innerText và ép kiểu number
tạo biết imcrement là tốc độ đếm target / number (200, 100)
nếu c sau < data target thì tăng lên theo imcrement và làm tròn bằng hàm math.celi
nếu lớn hơn hoặc bằng thì c = datatarget
*/

const counters = document.querySelectorAll('.counter')

counters.forEach(counter => {
    counter.innerText = '0'

    const updateCounter = () => {
        const target = +counter.getAttribute('data-target')
        const c = +counter.innerText

        let imcrement = target/200

        if(c < target){
            counter.innerText = `${Math.ceil((c + imcrement))}`
            setTimeout(updateCounter, 1)
        }else{
            counter.innerText = target
        }
    }

    updateCounter()
})

