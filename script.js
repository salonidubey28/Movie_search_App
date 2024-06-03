const apiKey = 'ff2897ab'; 

document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const searchQuery = document.getElementById('search-input').value.trim();
    if (searchQuery) {
        searchMovies(searchQuery);
    }
});

async function searchMovies(query) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=ff2897ab`);
        const data = await response.json();
        if (data.Response === "True") {
            displaySearchResults(data.Search);
        } else {
            displaySearchResults([]);
            console.error(`Error: ${data.Error}`);
        }
    } catch (error) {
        console.error('Failed to fetch search results:', error);
    }
}

function displaySearchResults(movies) {
    const searchResultsContainer = document.getElementById('search-results-container');
    searchResultsContainer.innerHTML = '';
    if (movies.length > 0) {
        movies.forEach(movie => {
            const movieCard = createMovieCard(movie);
            searchResultsContainer.appendChild(movieCard);
        });
    } else {
        searchResultsContainer.innerHTML = '<p>No results found.</p>';
    }
}

function createMovieCard(movie) {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');
    movieCard.innerHTML = `
        <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.png'}" alt="${movie.Title}">
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
    `;
    return movieCard;
}

document.addEventListener('DOMContentLoaded', function() {
    fetchFeaturedMovies();
});

async function fetchFeaturedMovies() {
    try {
        const response = await fetch(`https://www.omdbapi.com/?s=star&apikey=ff2897ab`);
        const data = await response.json();
        if (data.Response === "True") {
            displayFeaturedMovies(data.Search);
        } else {
            displayFeaturedMovies([]);
            console.error(`Error: ${data.Error}`);
        }
    } catch (error) {
        console.error('Failed to fetch featured movies:', error);
    }
}

function displayFeaturedMovies(movies) {
    const featuredMoviesContainer = document.getElementById('featured-movies-container');
    featuredMoviesContainer.innerHTML = '';
    if (movies.length > 0) {
        movies.forEach(movie => {
            const movieCard = createMovieCard(movie);
            featuredMoviesContainer.appendChild(movieCard);
        });
    } else {
        featuredMoviesContainer.innerHTML = '<p>No featured movies available.</p>';
    }
    
}
