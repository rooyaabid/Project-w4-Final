const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");

searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value.trim();

    if (searchTerm !== "") {
        searchMovies(searchTerm);
    }
});

function searchMovies(title) {
    const apiKey = '42075aaa'; // Replace with your actual OMDb API key
    const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(title)}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const moviesContainer = document.querySelector(".movies__container");
            moviesContainer.innerHTML = "";

            if (data.Search) {
                data.Search.forEach(movie => {
                    moviesContainer.innerHTML += moviesHTML(movie, false);
                });
            } else {
                moviesContainer.innerHTML = `<p>No results found for "${title}"</p>`;
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}

function moviesHTML(movie, isFeatured) {
    if (movie.Poster === "N/A") {
        movie.Poster = "./assets/img_not_found.jpg";
    }

    const rating = `- ${movie.imdbRating}/10`;

    return `<div class="movie" data-hidden-data="${movie.imdbID}">
                <div class="poster__half no-cursor">
                    <img src="${movie.Poster}" alt="" />
                </div>
                <div class="text__half">
                    <h1 class="movie__title">${movie.Title}</h1>
                    <h3 class="year">${movie.Year} ${(rating === "- undefined/10" || isFeatured === true) ? "" : rating}</h3>
                </div>
            </div>`;
}
