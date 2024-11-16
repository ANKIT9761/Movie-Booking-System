

// const fetchTheatreData = async () => {
//     try {
//         const response = await fetch("https://movie-pass-c5a96-default-rtdb.firebaseio.com/theatres.json");
//         const theatres = await response.json();
//         displayTheatres(theatres);
//     } catch (error) {
//         console.error("Error fetching theatre data:", error);
//     }
// };

// const displayTheatres = (theatres) => {
//     const theatreContainer = document.getElementById("theater-container");
//     theatreContainer.innerHTML = "";
//     const slots = ["09:00 AM","2:00 PM","9:00 PM"];

//     theatres.forEach((theatre,theaterIndex) => {
//         const theatreElement = document.createElement("div");
//         theatreElement.classList.add("cinema");

//         const timeSlotsHTML =  slots.map((slot,
//             slotIndex) => `<div class="time-slot">${slot}</div>`).join("")

//         theatreElement.innerHTML = `
//             <div class="cinema-info">
//                 <div class="cinema-name">${theatre.name} - ${theatre.location}</div>
//                 <button class="select-btn">Select Cinema</button>
//             </div>
//             <div class="cinema-options">
//                 <span>Parking Available</span>
//                 <span>Dolby Surround Sound</span>
//                 <span>Online Booking</span>
//             </div>
//             <div class="time-slots">
//                 ${timeSlotsHTML}
//             </div>
//         `;

//         theatreContainer.appendChild(theatreElement);
//     });
// };

// fetchTheatreData();
const params = new URLSearchParams(window.location.search)
const movieId = params.get('movieId');



const fetchTheatreData = async () => {
    try {
        const response = await fetch("https://movie-pass-c5a96-default-rtdb.firebaseio.com/theatres.json");
        const theatres = await response.json();
        displayTheatres(theatres);
    } catch (error) {
        console.error("Error fetching theatre data:", error);
    }
};

const displayTheatres = (theatres) => {
    const theatreContainer = document.getElementById("theater-container");
    theatreContainer.innerHTML = "";
    const slots = ["09:00 AM", "2:00 PM", "9:00 PM"];

    theatres.forEach((theatre, theaterIndex) => {
        const theatreElement = document.createElement("div");
        theatreElement.classList.add("cinema");

        const timeSlotsHTML = slots.map((slot, slotIndex) => `
            <div 
                class="time-slot" 
                onclick="redirectToBookingPage(${theaterIndex}, ${slotIndex})"
            >
                ${slot}
            </div>
        `).join("");

        theatreElement.innerHTML = `
            <div class="cinema-info">
                <div class="cinema-name">${theatre.name} - ${theatre.location}</div>
                <button 
                    class="select-btn" 
                    onclick="redirectToBookingPage(${theaterIndex}, null)"
                >
                    Select Cinema
                </button>
            </div>
            <div class="cinema-options">
                <span>Parking Available</span>
                <span>Dolby Surround Sound</span>
                <span>Online Booking</span>
            </div>
            <div class="time-slots">
                ${timeSlotsHTML}
            </div>
        `;

        theatreContainer.appendChild(theatreElement);
    });
};

const redirectToBookingPage = (theaterId, showId) => {
    const bookingUrl = `SeatSelection.html?theaterId=${theaterId}&showId=${showId}`;
    window.location.href = `SeatSelection.html?theaterId=${theaterId}&showId=${showId}&movieId=${movieId}`;
};

fetchTheatreData();

