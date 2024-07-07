document.addEventListener('DOMContentLoaded', () => {
    AOS.init();
    VanillaTilt.init(document.querySelectorAll(".current-track"), {
        max: 25,
        speed: 400,
        glare: true,
        "max-glare": 0.5,
    });

    const searchInput = document.getElementById('search');
    const searchResults = document.getElementById('search-results');
    const loader = document.getElementById('loader');
    const trackInfo = document.getElementById('track-info');
    const trackTitle = trackInfo.querySelector('h2');
    const trackArtist = trackInfo.querySelector('p');
    const albumArt = trackInfo.querySelector('img');
    const trackDuration = document.getElementById('track-duration');
    const playButton = document.getElementById('play');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const volumeSlider = document.getElementById('volume-slider');
    const playlistContainer = document.getElementById('playlist-container');
    const playlist = document.getElementById('playlist');
    const favoriteButton = document.getElementById('favorite');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginButton = document.getElementById('login');
    const logoutButton = document.getElementById('logout');

    let currentTrackIndex = 0;
    let tracks = [];
    let audio = new Audio();
    let isAuthenticated = false;
    let favorites = [];

    searchInput.addEventListener('keyup', async (event) => {
        const query = event.target.value;
        if (query.length > 2) {
            loader.style.display = 'block';
            const results = await searchMusic(query);
            loader.style.display = 'none';
            displayResults(results);
        }
    });

    async function searchMusic(query) {
        const apiKey = 'YOUR_SPOTIFY_API_KEY';
        const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=10`, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });
        const data = await response.json();
        return data.tracks.items;
    }

    function displayResults(trackList) {
        searchResults.innerHTML = '';
        tracks = trackList;
        tracks.forEach((track, index) => {
            const trackDiv = document.createElement('div');
            trackDiv.innerHTML = `
                <h3>${track.name}</h3>
                <p>${track.artists.map(artist => artist.name).join(', ')}</p>
            `;
            trackDiv.addEventListener('click', () => {
                currentTrackIndex = index;
                playTrack(track);
                addToPlaylist(track);
            });
            searchResults.appendChild(trackDiv);
        });
    }

    function playTrack(track) {
        trackTitle.textContent = track.name;
        trackArtist.textContent = track.artists.map(artist => artist.name).join(', ');
        albumArt.src = track.album.images[0].url;
        trackDuration.textContent = formatDuration(track.duration_ms);
        audio.src = track.preview_url;
        audio.play();
        playButton.textContent = 'Pause';
    }

    function formatDuration(ms) {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    playButton.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playButton.textContent = 'Pause';
        } else {
            audio.pause();
            playButton.textContent = 'Play';
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentTrackIndex > 0) {
            currentTrackIndex--;
            playTrack(tracks[currentTrackIndex]);
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentTrackIndex < tracks.length - 1) {
            currentTrackIndex++;
            playTrack(tracks[currentTrackIndex]);
        }
    });

    volumeSlider.addEventListener('input', (event) => {
        audio.volume = event.target.value / 100;
    });

    favoriteButton.addEventListener('click', () => {
        if (isAuthenticated) {
            const currentTrack = tracks[currentTrackIndex];
            if (!favorites.some(track => track.id === currentTrack.id)) {
                favorites.push(currentTrack);
                alert('Track added to favorites!');
                updateFavorites();
            } else {
                alert('Track is already in favorites!');
            }
        } else {
            alert('Please login to add to favorites');
        }
    });

    function updateFavorites() {
        playlist.innerHTML = '';
        favorites.forEach(track => {
            const trackDiv = document.createElement('div');
            trackDiv.innerHTML = `
                <h3>${track.name}</h3>
                <p>${track.artists.map(artist => artist.name).join(', ')}</p>
            `;
            playlist.appendChild(trackDiv);
        });
    }

    loginButton.addEventListener('click', () => {
        const username = usernameInput.value;
        const password = passwordInput.value;
        if (username === 'user' && password === 'password') {
            isAuthenticated = true;
            alert('Login successful');
            usernameInput.style.display = 'none';
            passwordInput.style.display = 'none';
            loginButton.style.display = 'none';
            logoutButton.style.display = 'inline-block';
        } else {
            alert('Invalid credentials');
        }
    });

    logoutButton.addEventListener('click', () => {
        isAuthenticated = false;
        alert('Logout successful');
        usernameInput.style.display = 'inline-block';
        passwordInput.style.display = 'inline-block';
        loginButton.style.display = 'inline-block';
        logoutButton.style.display = 'none';
    });
});
