import fetchMovieData from "./fetchMovieData.js";

let api_url = `https://movie-pass-c5a96-default-rtdb.firebaseio.com/`;

let moviesData;
if(localStorage.getItem("moviesData")) {
    moviesData = JSON.parse(localStorage.getItem("moviesData"));
}
else{
    moviesData = await fetchMovieData(api_url);
    localStorage.setItem("moviesData", JSON.stringify(moviesData));
}
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('movieId');

const movie = moviesData.find(movie => movie.movieId == movieId);
console.log(movie.trailer)
if (movie) {
    displayMovies(movie);
} else {
    console.log("Movie not found");
}

function displayMovies(movie) {
    document.querySelector(".trailer-section iframe").src = `${movie.trailer}`;
    document.querySelector(".poster img").src = movie.poster;
    document.querySelector(".movie-title").textContent = movie.movie_title;
    document.querySelector(".movie-rating").textContent = `${movie.rating}/10`;
    document.querySelector(".quality").textContent = `${movie.quality}`;
    document.querySelector(".movie-language").textContent = `${movie.language}`;
    document.querySelector(".movie-details").textContent = `${movie.duration} mins • ${movie.genre} • ${movie.language} • ${movie.release_date}`;
    document.querySelector(".movie-synopsis").textContent = movie.synopsis;
    document.querySelector(".movie-storyLine").textContent = movie.storyline;
}

let btn1 = document.getElementById("book_ticket")
// let btn2 = document.getElementById("book_ticket1")

btn1.addEventListener("click", SeatSelection)
// btn2.addEventListener("click", SeatSelection)

function SeatSelection()
{
    window.location.href = `CinemaSelection.html?movieId=${movieId}`
}


