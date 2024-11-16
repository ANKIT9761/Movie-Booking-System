const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('movieId');

async function fetchMovieData() {
    const api_url = `https://movie-pass-cbe6a-default-rtdb.firebaseio.com/MovieData.json`;

    try {
        const response = await fetch(api_url);
        const data = await response.json();

        const movie = data.find(movie => movie.movieId == movieId);
        if (movie) {
            displayMovies(movie);
        } else {
            console.log("Movie not found");
        }

    } catch (error) {
        console.log("Something went wrong with fetching API", error.message);
    }
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

fetchMovieData();