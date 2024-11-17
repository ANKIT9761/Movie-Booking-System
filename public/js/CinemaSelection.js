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


// Parse movieId from the URL
const params = new URLSearchParams(window.location.search);
const movieId = params.get('movieId');

const movieData = moviesData.find(movie => movie.movieId == movieId);
console.log(movieData);
if (movieData && movieData.theatres) {
    const theatres = movieData.theatres;
    displayTheatres(theatres);
} else {
    console.error("No theaters found for the movie.");
}


// Function to display theaters
function displayTheatres(theatres) {
    const theatreContainer = document.getElementById("theater-container");
    theatreContainer.innerHTML = "";
    const slots = ["09:00 AM", "2:00 PM", "9:00 PM"];

    theatres.forEach((theatre, theaterIndex) => {
        const theatreElement = document.createElement("div");
        theatreElement.classList.add("cinema");

        // Create time slots dynamically
        const timeSlotsContainer = document.createElement("div");
        timeSlotsContainer.classList.add("time-slots");

        slots.forEach((slot, slotIndex) => {
            const slotElement = document.createElement("div");
            slotElement.classList.add("time-slot");
            slotElement.textContent = slot;

            // Attach click event listener to each time slot
            slotElement.addEventListener("click", () => {
                redirectToBookingPage(theaterIndex, slotIndex);
            });

            timeSlotsContainer.appendChild(slotElement);
        });

        theatreElement.innerHTML = `
            <div class="cinema-info">
                <div class="cinema-name">${theatre.name} - ${theatre.location}</div>
                <button class="select-btn">
                    Select Cinema
                </button>
            </div>
            <div class="cinema-options">
                <span>Parking Available</span>
                <span>Dolby Surround Sound</span>
                <span>Online Booking</span>
            </div>
        `;

        // Attach click event listener to the "Select Cinema" button
        const selectCinemaButton = theatreElement.querySelector(".select-btn");
        selectCinemaButton.addEventListener("click", () => {
            redirectToBookingPage(theaterIndex, null);
        });

        theatreElement.appendChild(timeSlotsContainer);
        theatreContainer.appendChild(theatreElement);
    });
}

// Function to handle redirection
const redirectToBookingPage = (theaterId, showId) => {
    const bookingUrl = `SeatSelection.html?theaterId=${theaterId}&showId=${showId}&movieId=${movieId}`;
    window.location.href = bookingUrl;
};

// Fetch theater data on page load
// fetchTheatreData();
