fetch('http://localhost:3000/search')
  .then((res) => res.json())
  .then((data) => console.log(data));
