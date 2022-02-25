const boxs = document.querySelectorAll('.box')

window.addEventListener('scroll', checkBoxs)

checkBoxs()

function checkBoxs() {
    /**
     * lấy 4/5 height trang web
     * khi các box có trong đoạn này thì show
     */
    const triggerBottom = window.innerHeight / 5 * 4
    boxs.forEach(box => {
        /**
         * getBoundingClientRect().top
         * để lấy độ dài từ top của box lên trên
         * Nếu độ dài đó ngắn hơn triggerBottom thì show
         * Nếu box nằm ngoài khoảng triggerBottom thì remove show
         */
        const boxTop = box.getBoundingClientRect().top
        
        if(boxTop < triggerBottom){
            box.classList.add('show')
        }else{
            box.classList.remove('show')
        }
    });
}