const tagsEl = document.getElementById('tags')
const textarea = document.getElementById('textarea')

textarea.focus()

textarea.addEventListener('keyup', (ev) => {
    /*ev.target.value sự kiện keyup đó đang target đến element nào
    và lấy value của element đó
    trong trường hợp này lấy value của textarea*/
    createTag(ev.target.value)

    /* 
    sử dụng hàm setTimeout để reset ev.target.value = '' (reset value của textarea)trong 0.001s sau khi người dùng bấm enter
    vì mỗi lần có sự kiện keyup ev.target.value
    Bắt đầu randomSelect => randomaSelect() 
    => tạo ra biến times là thời gian muốn chạy random
    => tạo ra biến interval = setInterval để có thể clearInterval
    => sử dụng setInterval để pickRandomTag sau đó highlight
    sau đó tự động unHighlight sau một khoảng thời gian bằng với thời gian highlight bằng hàm setTimeout (tạo ra biến randomTag = pickRandomTag() -> trong hàm pickRandomTag lấy mảng các tag bằng class ('.tag') sau đó math.random() để trả về một số từ 0 đến 1 và nhân với độ dài mảng các tag để lấy một phần tử bất kì)
    -> setTimeout, sau một khoảng tg times thì clear interval và sau đó pick một tag bất kì bằng hàm pickRandomTag sau đó hightlight nó
    */
    if(ev.key === 'Enter'){
       setTimeout(() => {
        ev.target.value = ''
       }, 10)

       randomSelect()
    }
})

function createTag(input){
    /**
     * sử dụng hàm split để tách các choices ra 
     * sau đó chỉ lấy các choices thỏa điều kiện là khác rỗng ( tức là choices không được rỗng) 
     * sau đó trả về các choice đã được trim bằng hàm map
     */ 
    const tags = input.split(',').filter(tag => tag.trim() !== '').map(tag => tag.trim())
    
    //sử dụng hàm map để tạo ra các thẻ tag
    tagsEl.innerHTML = tags.map(tag => `<span class="tag">${tag}</span>`).join('')
    

    //sử dụng các thuộc tính của element để tạo các thẻ tag
    /* tagsEl.innerHTML = ''
    tags.forEach(tag => {
        const tagEl = document.createElement('span')
        tagEl.classList.add('tag')
        tagEl.innerText = tag
        tagsEl.appendChild(tagEl)
    }) */
    
}

function randomSelect(){
    times = 3

    const interval = setInterval(() => {
        const randomTag = pickRandomTag()

        highlightTag(randomTag)

        setTimeout(() => {
            unHighlightTag(randomTag)
        }, 100)
    }, 100)

    setTimeout(() => {
        clearInterval(interval)

        const randomTag = pickRandomTag()

        highlightTag(randomTag)
    }, times * 1000)
}

function pickRandomTag(){
    const tags = document.querySelectorAll('.tag')
    return tags[Math.floor(Math.random() * tags.length)]
}

function highlightTag(tag){
    tag.classList.add('highlight')
}

function unHighlightTag(tag){
    tag.classList.remove('highlight')
}