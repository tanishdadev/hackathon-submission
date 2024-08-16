document.addEventListener("DOMContentLoaded", function() {
    const level2 = document.getElementById("level2");
    const level3 = document.getElementById("level3");
    const level4 = document.getElementById("level4");

    // Check if the levels are completed and update their status
    if (sessionStorage.getItem('calculatorCompleted')) {
        level2.classList.remove("locked");
        level2.classList.add("unlocked");
    }
    
    if (sessionStorage.getItem('reverseSentenceCompleted')) {
        level3.classList.remove("locked");
        level3.classList.add("unlocked");
    }
    
    if (sessionStorage.getItem('clickChallengeCompleted')) {
        level4.classList.remove("locked");
        level4.classList.add("unlocked");
    }

    // Prevent access to completed levels
    document.querySelectorAll(".locked").forEach(level => {
        level.addEventListener("click", function() {
            if (!level.classList.contains("unlocked")) {
                alert("This level is locked.");
            }
        });
    });
});
