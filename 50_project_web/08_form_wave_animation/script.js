const labels = document.querySelectorAll('.form_group label')

labels.forEach(label => {
    label.innerHTML = label.innerText
        .split('') // tách label thành các kí tự
        .map((letter, idx) => `<span 
    style = "transition-delay:${idx * 50}ms">${letter}</span>`) //chuyển từng kí tự thành 1 thẻ span
        .join('') //hàm map cho ra các thẻ span bị ngăn cách bởi dấu ',' dùng join để loại bỏ nó
    console.log(label.innerHTML)
})