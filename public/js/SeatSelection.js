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
const theaterId = params.get('theaterId');
const showId = params.get('showId');
const movieIndex = parseInt(movieId.slice(1), 10)-1;

const movieData = moviesData.find(movie => movie.movieId == movieId);

const seats=movieData.theatres[theaterId].shows[showId].seats;
console.log(seats);

document.querySelector(".movie-title").textContent = movieData.movie_title;
document.querySelector(".movie-details").textContent = `${movieData.duration} mins • ${movieData.genre} • ${movieData.language} • ${movieData.release_date}`;;
document.querySelector(".show-timing").textContent = movieData.theatres[theaterId].shows[showId].time;

document.querySelector(".movie-poster").src=movieData.poster;


const pathUri=`https://movie-pass-c5a96-default-rtdb.firebaseio.com/MovieData/${movieIndex}/theatres/${theaterId}/shows/${showId}.json`;
console.log(pathUri);

const seatsContainer = document.getElementById('seats');
    const selectedSeats = new Set();

    for (let i = 0; i <5; i++) {
      for(let j=0;j<10;j++){
        const seat = document.createElement('button');
        seat.className =
          'w-8 h-8 bg-gray-800 rounded-md hover:bg-blue-500 focus:ring focus:ring-blue-300';
        let seatNo=i*10+j+1;
        seat.innerText = seatNo;
        let seatAvailable=seats[i][j];
        if(!seatAvailable){
          seat.classList.remove('bg-gray-800');
          seat.classList.add('bg-red-600');
          seat.disabled=true;
        }
        seat.onclick = () => {
          if (selectedSeats.has(seatNo)) {
            selectedSeats.delete(seatNo);
            seat.classList.remove('bg-green-600');
            seat.classList.add('bg-gray-800');
          } else {
            selectedSeats.add(seatNo);
            seat.classList.remove('bg-gray-800');
            seat.classList.add('bg-green-600');
          }
        };
        seatsContainer.appendChild(seat);
      }
    }

    // Book button action
    document.getElementById('bookBtn').onclick = async () => {
      if (selectedSeats.size > 0) {
        // alert(`You have booked the following seats: ${[...selectedSeats].join(', ')}`);
        selectedSeats.forEach(seat => {
        let row=Math.floor((seat-1)/10);
        let col=(seat-1)%10;
        seats[row][col]=false;
        });
        console.log(seats);
        await fetch(pathUri, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({seats:seats})
        });
        new Notify({
          title: "Tickets Booked Successfully",
          text: "Thanks for Booking. See you in the Theatres 🎉.",
          status: "success",
          effect: "fade",
          speed: 300,
          customClass: null,
          customIcon: null,
          showIcon: true,
          showCloseButton: true,
          autoclose: true,
          autotimeout: 3000,
          gap: 20,
          distance: 20,
          type: "outline",
          position: "right top",
        });
        
        localStorage.clear();
        setTimeout(() => {
          window.location.href = "../pages/Home.html";
        },4000);
      } else {
        alert('Please select at least one seat to proceed.');
      }
    };