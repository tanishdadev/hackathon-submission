document.addEventListener("DOMContentLoaded", function() {
    const greetingContainer = document.getElementById("greetingContainer");
    const continueButton = document.getElementById("continueButton");
    const gameContainer = document.getElementById("gameContainer");
    const button = document.getElementById("hiddenButton");
    const soundElement = document.getElementById("buttonSound");
    const infoText = document.getElementById("infoText");
    const countdownText = document.createElement("div");
    countdownText.id = "countdownText";
    document.body.appendChild(countdownText);
    let isButtonFound = false;
    let audioContext;
    let panner;
    let sourceNode;
    let isAudioInitialized = false;
    let soundInterval;

    function initAudio() {
        if (!isAudioInitialized) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            sourceNode = audioContext.createMediaElementSource(soundElement);
            panner = audioContext.createPanner();
            sourceNode.connect(panner).connect(audioContext.destination);
            isAudioInitialized = true;
        }
    }

    function resumeAudioContext() {
        if (audioContext && audioContext.state === 'suspended') {
            audioContext.resume().then(() => {
                console.log('Audio context resumed');
            }).catch(err => {
                console.error('Error resuming audio context:', err);
            });
        }
    }

    function moveButton() {
        const maxX = window.innerWidth - button.offsetWidth;
        const maxY = window.innerHeight - button.offsetHeight;
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        button.style.left = `${randomX}px`;
        button.style.top = `${randomY}px`;
        updatePannerPosition(randomX, randomY);
    }

    // Function to update the panner's position
    function updatePannerPosition(x, y) {
        const pannerX = (x / window.innerWidth) * 2 - 1;
        const pannerY = ((y / window.innerHeight) * 2 - 1) * -1;
        if (panner) {
            panner.setPosition(pannerX, pannerY, 0);
        }
    }

    function playSound() {
        initAudio();
        resumeAudioContext();
        soundElement.currentTime = 0;
        soundElement.play().catch((error) => {
            console.error('Error playing sound:', error);
        });
    }

    function startCountdown() {
        let countdown = 10;
        countdownText.style.position = "absolute";
        countdownText.style.top = "20px";
        countdownText.style.left = "20px";
        countdownText.style.backgroundColor = "white";
        countdownText.style.padding = "10px";
        countdownText.style.border = "1px solid black";
        countdownText.style.zIndex = "1000";
        countdownText.innerHTML = `Sound starts in ${countdown} seconds`;

        const countdownInterval = setInterval(() => {
            countdown--;
            countdownText.innerHTML = `Sound starts in ${countdown} seconds`;

            if (countdown <= 0) {
                clearInterval(countdownInterval);
                countdownText.style.display = "none";
                startGame();
            }
        }, 1000);
    }

    function startGame() {
        showAndMoveButton();
        soundInterval = setInterval(showAndMoveButton, 10000);
    }

    function showAndMoveButton() {
        if (!isButtonFound) {
            moveButton();
            playSound();
        }
    }

    button.addEventListener("click", function() {
        if (!isButtonFound) {
            isButtonFound = true;
            button.style.opacity = "1";
            button.style.position = "relative";
            button.style.left = "0";
            button.style.top = "0";
            button.style.marginTop = "50px";
            button.style.marginBottom = "20px";
            button.style.marginLeft = "215px"
            button.style.display = "block";
            infoText.innerHTML = "Congratulations! Now you can proceed to the website!";
            infoText.style.textAlign = "center";
            infoText.insertAdjacentElement('afterend', button);
            clearInterval(soundInterval);
        } else {
            window.location.href = "main.html";
        }
    });

    continueButton.addEventListener('click', () => {
        greetingContainer.style.display = "none";
        gameContainer.style.display = "block";
        startCountdown();
    });

    document.addEventListener('click', () => {
        initAudio();
        resumeAudioContext();
    }, { once: true });
});
