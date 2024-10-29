// // Get references to the audio element and the play/pause button
// var song = document.getElementById("song");
// var playPauseBtn = document.getElementById("playPauseBtn");
// var card = document.getElementById("songCard");

// // Function to toggle between play and pause
// function togglePlayPause() {
//     if (song.paused) {
//         song.play();
//         playPauseBtn.textContent = "Pause";  // Change button text to 'Pause'
//     } else {
//         song.pause();
//         playPauseBtn.textContent = "Play";  // Change button text back to 'Play'
//     }
// }

// // Attach the play/pause toggle function to the card click event
// card.addEventListener("click", function(event) {
//     // Ensure the click on the button doesn't propagate and trigger twice
//     if (event.target.id === "playPauseBtn") {
//         togglePlayPause();
//     }
// });

// // Optional: Reset button when song ends
// song.addEventListener("ended", function() {
//     playPauseBtn.textContent = "Play";  // Reset button to 'Play' when song ends
// });


const audio = new Audio();
const playlist= document.getElementById("playlist");
const track=playlist.getElementsByClassName("card");
const progressBar = document.getElementById('progress-bar');
const currentTimeElem = document.querySelector('.currt');
const durationElem = document.querySelector('.timeout');
const playPauseBtn = document.getElementById('playPauseBtn');
const progressContainer = document.getElementById('progress-container');

const playIcon = './assets/player_icon3.png';   
const pauseIcon = './assets/pause_icon.png'; 


let currentIndex = 0;
const loadtrack =(index) => {
    audio.src = track[index].getAttribute("data-src");
};

const playtrack = () => {
    audio.play();
};

Array.from(track).forEach((item, index)=>{
    item.addEventListener("click", ()=>{
        currentIndex = index;
        loadtrack(currentIndex);
        playtrack();
    });
});








const updateProgress = () => {
    const currentTime = audio.currentTime;
    const duration = audio.duration;

    if (duration) {
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = `${progressPercent}%`;  // Update the width of the progress bar
    }

    // Update the current time display
    currentTimeElem.textContent = formatTime(currentTime);
};

// Format time in minutes:seconds
const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

// Update the total duration once the audio metadata is loaded
audio.addEventListener('loadedmetadata', () => {
    durationElem.textContent = formatTime(audio.duration);
});

// Update the progress bar as the song plays
audio.addEventListener('timeupdate', updateProgress);

// Allow seeking by clicking on the progress container
progressContainer.addEventListener('click', (e) => {
    const containerWidth = progressContainer.clientWidth;
    const clickX = e.offsetX;  // Get the X position where the user clicked
    const duration = audio.duration;

    // Calculate the percentage of the container that was clicked
    const progressPercent = (clickX / containerWidth) * 100;
    progressBar.style.width = `${progressPercent}%`;

    // Update the audio current time based on the percentage of the container clicked
    audio.currentTime = (progressPercent / 100) * duration;
});

// Play/Pause functionality (triggered by button clicks)
const playTrack = () => {
    audio.play();
};

const pauseTrack = () => {
    audio.pause();
};








let isPlaying = false;  // Track if the audio is playing

// Toggle play/pause on button click
playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();  // Pause the audio
        playPauseBtn.src = playIcon;  // Switch to play icon
    } else {
        audio.play();   // Play the audio
        playPauseBtn.src = pauseIcon;  // Switch to pause icon
    }
    isPlaying = !isPlaying;  // Toggle the play state
});

// Optionally, listen for the audio ending to reset the button to play icon
audio.addEventListener('ended', () => {
    playPauseBtn.src = playIcon;  // Switch back to play icon when the song ends
    isPlaying = false;  // Reset play state
});








const searchInput = document.getElementById('search-input');
        const searchResults = document.getElementById('search-results');

        const songs = ['Song One', 'Song Two', 'Song Three', 'Another Song', 'SBCC', 'HDSHB', 'HSHDUSH' ,'HDSHDSHF' ,'JASJKSJD'];

        searchInput.addEventListener('input', function () {
            const query = searchInput.value.toLowerCase();
            searchResults.innerHTML = '';
            if (query) {
                const filteredSongs = songs.filter(song => song.toLowerCase().includes(query));
                filteredSongs.forEach(song => {
                    const div = document.createElement('div');
                    div.textContent = song;
                    searchResults.appendChild(div);
                });
                // Show results if there are any
                searchResults.style.display = filteredSongs.length > 0 ? 'block' : 'none';
            } else {
                searchResults.style.display = 'none'; // Hide if input is empty
            }
        });







        
        