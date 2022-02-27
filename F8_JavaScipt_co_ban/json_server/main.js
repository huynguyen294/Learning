fetch('http://localhost:3000/course')
    .then(res => res.json())
    .then(courses => courses.forEach(course => console.log(course.id)))