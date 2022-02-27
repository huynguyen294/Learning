//API các bài đăng
//https://jsonplaceholder.typicode.com/posts

fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json()) //res.json() là một promise trả về JSON.parse()
    .then(posts => console.log(posts))