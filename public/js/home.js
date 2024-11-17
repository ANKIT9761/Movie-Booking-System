import fetchMovieData from "./fetchMovieData.js";

let api_url = `https://movie-pass-c5a96-default-rtdb.firebaseio.com/MovieData.json`;

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
    movieGrid.innerHTML = "";  // Clear any existing movie cards

    movies.forEach(movie => {
        const movieCard = document.createElement("div");
        // Add the glass-card class to apply glassmorphism
        movieCard.classList.add("glass-card");  // This applies the custom glassmorphism class
        movieCard.classList.add("cursor-pointer"); 
        
        movieCard.addEventListener("click", () => {
            window.location.href = `movie_detail.html?movieId=${movie.movieId}`;
        });

        movieCard.innerHTML = `
            <div class="image-container">
                <img src="${movie.poster}" alt="${movie.movie_title}" class="w-full h-64 object-scale-down rounded-t-lg mb-4" />
            </div>
            <div class="flex-1">
                <p class="font-semibold text-lg text-white truncate text-center">${movie.movie_title}</p>
                <p class="text-white text-sm truncate text-center">${movie.genre} | ${movie.quality}</p>
            </div>
        `;

        movieGrid.appendChild(movieCard);  // Append the card to the grid
    });
}

fetchMovieData();  // Call the function to load the movie data
