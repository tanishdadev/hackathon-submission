document.addEventListener("DOMContentLoaded", function() {
    const scoreElem = document.getElementById("score");
    const timerElem = document.getElementById("timer");
    const messageElem = document.getElementById("message");
    const gameArea = document.getElementById("gameArea");
    const initialScore = 0;
    const winningScore = 25;
    let score = initialScore;
    let timeLeft = 60;
    const deductionAmount = 5;
    const objectRemovalInterval = 5000;
    const initialObjectCount = 100;
    let gameInterval, timerInterval, objectRemovalIntervalId, deductionIntervalId;

    if (sessionStorage.getItem('clickChallengeCompleted')) {
        document.body.innerHTML = "<div class='content'><h1>You already completed this level🙂</h1></div>";
        return;
    }

    function updateScore(change) {
        score += change;
        scoreElem.textContent = score;
    }

    function endGame(won) {
        clearInterval(gameInterval);
        clearInterval(timerInterval);
        clearInterval(objectRemovalIntervalId);
        clearInterval(deductionIntervalId);

        if (won) {
            messageElem.textContent = "Congratulations, You Win!";
            sessionStorage.setItem('clickChallengeCompleted', true);
            setTimeout(() => {
                window.location.href = "main.html";
            }, 3000);
        } else {
            messageElem.textContent = "Try Again!";
            setTimeout(() => {
                resetGame();
            }, 3000);
        }
    }

    function spawnObject() {
        const object = document.createElement("div");
        object.className = "object";
        const gameAreaRect = gameArea.getBoundingClientRect();
        const gameAreaWidth = gameAreaRect.width;
        const gameAreaHeight = gameAreaRect.height;
        const objectSize = 50;
        const maxLeft = gameAreaWidth - objectSize;
        const maxTop = gameAreaHeight - objectSize;
        const randomLeft = Math.random() * maxLeft;
        const randomTop = Math.random() * maxTop;
        object.style.top = randomTop + "px";
        object.style.left = randomLeft + "px";
        gameArea.appendChild(object);
        object.addEventListener("click", function() {
            updateScore(1);
            gameArea.removeChild(object);
        });
    }

    function startGame() {
        score = initialScore;
        scoreElem.textContent = score;
        timeLeft = 60;

        for (let i = 0; i < initialObjectCount; i++) {
            spawnObject();
        }

        objectRemovalIntervalId = setInterval(() => {
            const objects = document.querySelectorAll('.object');
            if (objects.length > 0) {
                for (let i = 0; i < 2; i++) {
                    const randomIndex = Math.floor(Math.random() * objects.length);
                    const object = objects[randomIndex];
                    gameArea.removeChild(object);
                }
            }
        }, objectRemovalInterval);

        timerInterval = setInterval(() => {
            timeLeft -= 1;
            timerElem.textContent = timeLeft;
            if (timeLeft <= 0) {
                endGame(score >= winningScore);
            }
        }, 1000);

        deductionIntervalId = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(deductionIntervalId);
                return;
            }
            updateScore(-deductionAmount);
        }, 5000);
    }

    function resetGame() {
        gameArea.innerHTML = '';
        messageElem.textContent = '';
        startGame();
    }

    startGame();
});
