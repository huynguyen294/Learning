var listCmt = document.getElementById('list-cmt')
var container = document.querySelector('.container')
listCmt.innerHTML = ``

var users = [
    {
        id: 1,
        name: 'son dang',
    },
    {
        id: 2,
        name: 'huy',
    },
    {
        id: 3,
        name: 'A',
    },
    {
        id: 4,
        name: 'B',
    },
    {
        id: 5,
        name: 'C',
    },
    {
        id: 6,
        name: 'D',
    },
]

var cmts = [
    {
        id: 1,
        user_id: 2,
        content: 'Đây là cmt 1 của user 2'
    },
    {
        id: 2,
        user_id: 4,
        content: 'Đây là cmt 2 của user 4'
    },
    {
        id: 3,
        user_id: 1,
        content: 'Đây là cmt 3 của user 1'
    },
    {
        id: 4,
        user_id: 5,
        content: 'Đây là cmt 4 của user 5'
    },
    {
        id: 5,
        user_id: 3,
        content: 'Đây là cmt 5 của user 3'
    },
]

//1. lấy cmt
//2. từ cmt lấy ra user_id
//3. từ user_id lấy ra user tương ứng

//fake API

function getCmt(){
    return new Promise(resolve => {
        const msg = document.createElement('p')
        msg.innerText = 'Các bình luận sẽ được tải sau 5s!'
        console.log(msg)
        container.appendChild(msg)
        setTimeout(() => {
            container.removeChild(msg)
            resolve(cmts)
        }, 5000)
    })
}

//các biến cmt và users là biến toàn cục.

getCmt()
    .then(cmts => {
        return cmts.map(cmt => {
            return {
                id: cmt.id,
                user_name: users[cmt.user_id-1].name,
                content: `Đây là cmt ${cmt.id} của user ${users[cmt.user_id-1].name}`,
            }
        })
    })
    .then(cmts => cmts.forEach(cmt => {
        listCmt.innerHTML += `<li>${cmt.user_name}: ${cmt.content}</li>`
    }))
