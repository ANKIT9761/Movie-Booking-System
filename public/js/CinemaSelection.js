import fetchMovieData from "./fetchMovieData.js";

let api_url = `https://movie-pass-c5a96-default-rtdb.firebaseio.com/`;

let moviesData;
// Check localStorage for cached movie data
if (localStorage.getItem("moviesData")) {
    moviesData = JSON.parse(localStorage.getItem("moviesData"));
} else {
    moviesData = await fetchMovieData(api_url);
    localStorage.setItem("moviesData", JSON.stringify(moviesData));
}

// Parse movieId from the URL
const params = new URLSearchParams(window.location.search);
const movieId = params.get("movieId");

const movieData = moviesData.find(movie => movie.movieId === movieId);


if (movieData && movieData.theatres) {
    const theatres = movieData.theatres;
    displayTheatres(theatres);
} else {
    console.error("No theaters found for the movie.");
}

function getCurrentDateFormatted() {
    const today = new Date();

    // Get weekday name
    const options = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
    const formattedDate = today.toLocaleDateString("en-US", options);

    return formattedDate;
}

// Example usage
const currentDate = getCurrentDateFormatted();

document.querySelector(".movie-title").textContent = movieData.movie_title;
document.querySelector(".movie-details").textContent = `${movieData.duration} mins • ${movieData.genre} • ${movieData.language} • ${movieData.release_date}`;;

document.querySelector(".movie-poster").src=movieData.poster;
document.querySelector(".movie-date").textContent = currentDate;
// Function to display theaters
function displayTheatres(theatres) {
    const theatreContainer = document.getElementById("theater-container");
    const slots = ["09:00 AM", "14:00 PM", "23:00 PM"];

    theatres.forEach((theatre, theaterIndex) => {
        // Create theater card
        const theatreElement = document.createElement("div");
        theatreElement.classList.add(
            "bg-gray-700",
            "p-4",
            "rounded-lg",
            "shadow-md",
            "space-y-4"
        );

        // Theater info
        const theaterInfo = `
            <div>
                <h3 class="text-xl font-semibold">${theatre.name} - ${theatre.location}</h3>
            </div>
            <div class="flex gap-4 text-sm text-gray-400">
                <span>Parking Available</span>
                <span>Dolby Surround Sound</span>
                <span>Online Booking</span>
            </div>
        `;
        theatreElement.innerHTML = theaterInfo;

        // Time slots
        const timeSlotsContainer = document.createElement("div");
        timeSlotsContainer.classList.add("flex", "flex-wrap", "gap-2");
        const now = new Date();
        const currentTime = now.toTimeString().slice(0, 5);
        slots.forEach((slot, slotIndex) => {
            const slotElement = document.createElement("button");
            slotElement.classList.add(
                "bg-gray-600",
                "hover:bg-blue-500",
                "text-white",
                "px-4",
                "py-2",
                "rounded-lg",
                "cursor-pointer",
                "text-sm",
                "font-medium"
            );
            slotElement.textContent = slot;
            let slotTime = slot.slice(0, 5);
            console.log(currentTime,slotTime);
            if(slotTime < currentTime){
                console.log("disabled");
                slotElement.disabled = true;
            }

            // Event listener for time slot click
            slotElement.addEventListener("click", () => {
                redirectToBookingPage(theaterIndex, slotIndex);
            });

            timeSlotsContainer.appendChild(slotElement);
        });

        theatreElement.appendChild(timeSlotsContainer);
        theatreContainer.appendChild(theatreElement);
    });
}

// Function to handle redirection
function redirectToBookingPage(theaterId, showId) {
    const bookingUrl = `SeatSelection.html?theaterId=${theaterId}&showId=${showId}&movieId=${movieId}`;
    window.location.href = bookingUrl;
}
