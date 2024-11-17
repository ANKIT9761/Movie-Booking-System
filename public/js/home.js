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
console.log(moviesData);
console.log(moviesData.length);
console.log(moviesData[0].theatres);
displayMovies(moviesData);
// async function fetchMovieData() {
//     try {
//         const response = await fetch(api_url);
//         const movies = await response.json();

//         displayMovies(movies);
//     } catch (error) {
//         console.log("Something went wrong with fetching API", error.message);
//     }
// }

function displayMovies(movies) {
    const movieGrid = document.getElementById("movieGrid");
    movieGrid.innerHTML = "";

    movies.forEach(movie => {
        const movieCard = document.createElement("div");
        movieCard.classList = "bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer";
        
        movieCard.addEventListener("click", () => {
            window.location.href = `movie_detail.html?movieId=${movie.movieId}`;
        });

        movieCard.innerHTML = `
            <img src="${movie.poster}" alt="${movie.movie_title}" class="w-full h-48 object-cover rounded-t-lg mb-4" />
            <p class="font-semibold text-lg">${movie.movie_title}</p>
            <p class="text-gray-600">${movie.genre} | ${movie.quality}</p>
        `;

        movieGrid.appendChild(movieCard);
    });
}

