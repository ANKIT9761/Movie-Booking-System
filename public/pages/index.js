import data from './data/movies.json'; 
const apiUrl = ''
const getData = async ()=>{
    try {
      const res = await fetch(apiUrl);
      const data = JSON.parse(res) 
      return data 
    } catch (error) {
        console.log(error);
    }
}

const displayData = (movies) => {
    // Loop through each movie
    movies.forEach((movie, index) => {
      // Target each movie card based on its data-id
      const card = document.getElementById(`movie-card-${index + 1}`);
      const title = document.getElementById(`movie-title-${index + 1}`);
      const genre = document.getElementById(`movie-genre-${index + 1}`);
      const img = document.getElementById(`movie-img-${index + 1}`);
      
      // Update the content of the card
      title.textContent = movie.Title;
      genre.textContent = `${movie.Genre} | ${movie.Language}`;
      img.src = movie.Poster; // Assuming each movie has a "Poster" URL
        
    
      // Additional properties if you need to display them
      // card.setAttribute("data-id", movie.imdbID); // Add IMDb ID as a unique identifier if needed
    });
  }

  const genreFilter = async () => {
    const value = document.getElementById('genre-select').value; // Assuming a select element for genre
    const newData = data.filter((movie) => {
      return movie.Genre.includes(value);
    });
    displayData(newData);
  };
  
// const formatFilter = async ()=>{
//     const movies = await getData()
//     const value = document.getElementById('format-select')
//     filterMovie(movies, 'format', value )
// }

// const filterMovie = (data, type, value)=>{
//     const newData = data.filter((elem)=>{
//         return elem.type === type && elem.value === value
//     })
//     return newData
// }

