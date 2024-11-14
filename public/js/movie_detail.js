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
    document.querySelector(".container").style.backgroundImage = `url(${movie.banner_image})`;
    document.querySelector(".poster img").src = movie.poster;
    document.querySelector(".movie-title").textContent = movie.movie_title;
    document.querySelector(".movie-rating").textContent = `${movie.rating}/10`;
    document.querySelector(".quality").textContent = `${movie.quality}`;
    document.querySelector(".movie-language").textContent = `${movie.language}`;
    document.querySelector(".movie-details").textContent = `${movie.duration} mins • ${movie.genre} • ${movie.language} • ${movie.release_date}`;
    document.querySelector(".movie-synopsis").textContent = movie.synopsis;

    const castContainer = document.querySelector(".cast-section");
    castContainer.innerHTML = ""; 
    movie.cast.forEach(cast => {
        const castHTML = `
            <div class="text-center">
                <img src="${cast.image}" alt="${cast.actor}" class="w-24 h-24 rounded-full mx-auto shadow-lg">
                <p class="text-lg font-semibold text-gray-800 mt-2">${cast.actor}</p>
                <p class="text-gray-500">${cast.role}</p>
            </div>
        `;
        castContainer.insertAdjacentHTML("beforeend", castHTML);
    });

    const crewContainer = document.querySelector(".crew-section");
    crewContainer.innerHTML = ""; 
    movie.crew.forEach(crew => {
        const crewHTML = `
            <div class="text-center">
                <img src="${crew.image}" alt="${crew.name}" class="w-24 h-24 rounded-full mx-auto shadow-lg">
                <p class="text-lg font-semibold text-gray-800 mt-2">${crew.name}</p>
                <p class="text-gray-500">${crew.role}</p>
            </div>
        `;
        crewContainer.insertAdjacentHTML("beforeend", crewHTML);
    });
}


document.getElementById("book_ticket").addEventListener("click", ()=>{
    alert(movieId)
})

fetchMovieData();
