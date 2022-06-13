const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&&api_key=41c50c604a355932b65a445ebae71826'

getMovies(API_URL)

async function getMovies(url){
    const res = await fetch(url)
    const data = await res.json()

    console.log(data)
}