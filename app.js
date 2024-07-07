document.addEventListener('DOMContentLoaded', () => {
    AOS.init();

    VanillaTilt.init(document.querySelector(".current-track"), {
        max: 25,
        speed: 400,
        glare: true,
        "max-glare": 0.5,
    });

    let playlists = [
        { title: 'Awesome Mix Vol. 1', artist: 'Various Artists', duration: '1:23' },
        { title: 'Best of 90s', artist: 'Various Artists', duration: '1:45' },
        { title: 'Chill Vibes', artist: 'Relaxation Experts', duration: '0:59' }
    ];

    let favorites = [
        { title: 'Favorite Song 1', artist: 'Favorite Artist', duration: '2:30' },
        { title: 'Favorite Song 2', artist: 'Favorite Artist', duration: '3:15' }
    ];

    function displayPlaylists() {
        const playlistContainer = document.getElementById('playlist');
        playlistContainer.innerHTML = '';
        playlists.forEach(song => {
            const songElement = document.createElement('div');
            songElement.classList.add('playlist-song');
            songElement.innerHTML = `<p>${song.title} - ${song.artist} (${song.duration})</p>`;
            playlistContainer.appendChild(songElement);
        });
    }

    function displayFavorites() {
        const favoritesContainer = document.getElementById('favorites');
        favoritesContainer.innerHTML = '';
        favorites.forEach(song => {
            const songElement = document.createElement('div');
            songElement.classList.add('favorite-song');
            songElement.innerHTML = `<p>${song.title} - ${song.artist} (${song.duration})</p>`;
            favoritesContainer.appendChild(songElement);
        });
    }

    displayPlaylists();
    displayFavorites();

    const addToFavoritesButton = document.getElementById('favorite');
    addToFavoritesButton.addEventListener('click', () => {
        const currentTrack = {
            title: 'Track Title',
            artist: 'Artist Name',
            duration: '3:30'
        };
        favorites.push(currentTrack);
        displayFavorites();
    });

    const loginButton = document.getElementById('login');
    const logoutButton = document.getElementById('logout');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    loginButton.addEventListener('click', () => {
        const username = usernameInput.value;
        const password = passwordInput.value;
        if (username === 'user' && password === 'password') {
            alert('Login successful!');
            loginButton.style.display = 'none';
            logoutButton.style.display = 'inline-block';
            usernameInput.value = '';
            passwordInput.value = '';
        } else {
            alert('Invalid credentials. Please try again.');
            usernameInput.value = '';
            passwordInput.value = '';
        }
    });

    logoutButton.addEventListener('click', () => {
        alert('Logged out successfully!');
        logoutButton.style.display = 'none';
        loginButton.style.display = 'inline-block';
    });

    const playButton = document.getElementById('play');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');

    playButton.addEventListener('click', () => {
        playButton.classList.toggle('playing');
        const isPlaying = playButton.classList.contains('playing');
        playButton.textContent = isPlaying ? 'Pause' : 'Play';
    });

    prevButton.addEventListener('click', () => {
        alert('Playing previous track.');
    });

    nextButton.addEventListener('click', () => {
        alert('Playing next track.');
    });

    const volumeSlider = document.getElementById('volume-slider');
    volumeSlider.addEventListener('input', () => {
        const volumeValue = volumeSlider.value;
        alert(`Volume set to ${volumeValue}%`);
    });

    const searchInput = document.getElementById('search');
    const searchResults = document.getElementById('search-results');

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const filteredResults = playlists.filter(song => {
            return song.title.toLowerCase().includes(query) || song.artist.toLowerCase().includes(query);
        });
        displaySearchResults(filteredResults);
    });

    function displaySearchResults(results) {
        searchResults.innerHTML = '';
        results.forEach(song => {
            const resultElement = document.createElement('div');
            resultElement.classList.add('search-result');
            resultElement.innerHTML = `<p>${song.title} - ${song.artist} (${song.duration})</p>`;
            searchResults.appendChild(resultElement);
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {

    const shuffleButton = document.getElementById('shuffle');
    const repeatButton = document.getElementById('repeat');

    shuffleButton.addEventListener('click', () => {
        alert('Shuffling playlist.');
    });

    repeatButton.addEventListener('click', () => {
        alert('Repeat mode toggled.');
    });

    const shareButton = document.getElementById('share');
    const socialMediaIcons = document.querySelectorAll('.social-media-icon');

    shareButton.addEventListener('click', () => {
        socialMediaIcons.forEach(icon => {
            icon.classList.toggle('visible');
        });
    });

    const themeSwitch = document.getElementById('theme-switch');
    const body = document.body;

    themeSwitch.addEventListener('change', () => {
        if (themeSwitch.checked) {
            body.classList.add('dark-theme');
        } else {
            body.classList.remove('dark-theme');
        }
    });

    const lyricsButton = document.getElementById('lyrics');
    const lyricsContainer = document.getElementById('lyrics-container');

    lyricsButton.addEventListener('click', () => {
        if (lyricsContainer.classList.contains('hidden')) {
            lyricsContainer.classList.remove('hidden');
        } else {
            lyricsContainer.classList.add('hidden');
        }
    });

    const settingsButton = document.getElementById('settings');
    const settingsPanel = document.getElementById('settings-panel');

    settingsButton.addEventListener('click', () => {
        settingsPanel.classList.toggle('visible');
    });

    const clearButton = document.getElementById('clear');
    const searchInput = document.getElementById('search');
    const searchResults = document.getElementById('search-results');

    clearButton.addEventListener('click', () => {
        searchInput.value = '';
        searchResults.innerHTML = '';
    });

    const alarmButton = document.getElementById('set-alarm');
    const alarmTime = document.getElementById('alarm-time');

    alarmButton.addEventListener('click', () => {
        const time = alarmTime.value;
        alert(`Alarm set for ${time}`);
    });

    const feedbackForm = document.getElementById('feedback-form');

    feedbackForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(feedbackForm);
        const feedbackMessage = formData.get('feedback-message');
        alert(`Feedback received: ${feedbackMessage}`);
        feedbackForm.reset();
    });

    const notificationButton = document.getElementById('notifications');

    notificationButton.addEventListener('click', () => {
        const notification = new Notification('New Notification', {
            body: 'You have a new message!',
            icon: 'path-to-notification-icon.png'
        });
    });

    const donateButton = document.getElementById('donate');

    donateButton.addEventListener('click', () => {
        alert('Thank you for your donation!');
    });

    const timerButton = document.getElementById('start-timer');
    const timerDisplay = document.getElementById('timer-display');

    timerButton.addEventListener('click', () => {
        let seconds = 0;
        const timerInterval = setInterval(() => {
            seconds++;
            timerDisplay.textContent = `${Math.floor(seconds / 60)}:${seconds % 60}`;
        }, 1000);

        setTimeout(() => {
            clearInterval(timerInterval);
            timerDisplay.textContent = 'Timer Complete!';
        }, 5000); // Example timer for 5 seconds
    });

    const shareLink = document.getElementById('share-link');

    shareLink.addEventListener('click', () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
    });

    const emojiButton = document.getElementById('emoji-picker');
    const emojiContainer = document.getElementById('emoji-container');

    emojiButton.addEventListener('click', () => {
        emojiContainer.classList.toggle('visible');
    });

    const changeLanguageButton = document.getElementById('change-language');
    const languageSelector = document.getElementById('language-selector');

    changeLanguageButton.addEventListener('click', () => {
        languageSelector.classList.toggle('visible');
    });

    const themeSelector = document.getElementById('theme-selector');

    themeSelector.addEventListener('change', () => {
        const selectedTheme = themeSelector.value;
        body.classList.remove('theme-light', 'theme-dark');
        body.classList.add(`theme-${selectedTheme}`);
    });

    const contactButton = document.getElementById('contact-support');

    contactButton.addEventListener('click', () => {
        alert('Contact support for assistance.');
    });

});
