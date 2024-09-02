document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const stopBtn = document.getElementById('stopBtn');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const progressBar = document.getElementById('progressBar');
    const currentTimeElem = document.getElementById('currentTime');
    const totalTimeElem = document.getElementById('totalTime');

    let isPlaying = false;

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    function updateProgress() {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progress;
        currentTimeElem.textContent = formatTime(audio.currentTime);
        totalTimeElem.textContent = formatTime(audio.duration);
    }

    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            playPauseBtn.textContent = 'Play';
        } else {
            audio.play();
            playPauseBtn.textContent = 'Pause';
        }
        isPlaying = !isPlaying;
    });

    stopBtn.addEventListener('click', () => {
        audio.pause();
        audio.currentTime = 0;
        playPauseBtn.textContent = 'Play';
        isPlaying = false;
    });

    progressBar.addEventListener('input', () => {
        const value = progressBar.value;
        audio.currentTime = (value / 100) * audio.duration;
    });

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', () => {
        totalTimeElem.textContent = formatTime(audio.duration);
    });
});
