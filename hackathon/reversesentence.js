document.addEventListener("DOMContentLoaded", function() {
    if (sessionStorage.getItem('reverseSentenceCompleted')) {
        document.body.innerHTML = "<div class='content'><h1>You already completed this level 🙂</h1></div>";
        return;
    }

    const correctAnswer = "It may be surmised that James hath been afflicted with pneumonoultramicroscopicsilicovolcanoconiosis."; // The reversed sentence and words
    const submitBtn = document.getElementById("submitBtn");
    const userInput = document.getElementById("userInput");
    const message = document.getElementById("message");

    submitBtn.addEventListener("click", function() {
        if (userInput.value.trim() === correctAnswer) {
            sessionStorage.setItem('reverseSentenceCompleted', true);
            document.body.innerHTML = "<div class='content'><h1>You Win! 🎉</h1></div>";
            setTimeout(function() {
                window.location.href = "main.html";
            }, 3000);
        } else {
            message.textContent = "Incorrect, try again!";
        }
    });
});