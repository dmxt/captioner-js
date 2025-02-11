// app.js

// Check for browser support
if (!('webkitSpeechRecognition' in window)) {
    alert('Your browser does not support speech recognition. Please use Chrome.');
} else {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = true; // Keep listening until stopped
    recognition.interimResults = true; // Show interim results

    const startButton = document.getElementById('start-btn');
    const stopButton = document.getElementById('stop-btn');

    startButton.addEventListener('click', () => {
        recognition.start();
        startButton.disabled = true;
        stopButton.disabled = false;
        console.log('Listening...');
    });

    stopButton.addEventListener('click', () => {
        recognition.stop();
        startButton.disabled = false;
        stopButton.disabled = true;
        console.log('Stopped listening.');
    });

    recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
            .map(result => result[0].transcript)
            .join('');
        console.log('Transcript:', transcript);
    };
    recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript;
        console.log('Transcript:', transcript)
    };

    recognition.onerror = (event) => {
        console.error('Error occurred in recognition: ' + event.error);
    };

    recognition.onend = () => {
        console.log('Speech recognition service disconnected');
        startButton.disabled = false;
        stopButton.disabled = true;
    };
}
