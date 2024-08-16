document.addEventListener("DOMContentLoaded", function() {
    // Check if the Calculator level is already completed
    if (sessionStorage.getItem('calculatorCompleted')) {
        document.body.innerHTML = "<div class='completed-message'><h1>You already completed this level 🙂</h1></div>";
        return;
    }

    const display = document.getElementById("display");
    const buttons = document.querySelectorAll(".btn");
    const targetValue = 127 * 48;
    let input = "";

    const randomValueMap = {
        "1": "8",
        "2": "7",
        "3": "2",
        "4": "=",
        "5": "4",
        "6": "1",
        "7": "5",
        "8": "6",
        "9": "0",
        "0": "9",
        "+": "-",
        "-": "+",
        "*": "/",
        "/": "*",
        "C": "C",
        "=": "3"
    };

    buttons.forEach(button => {
        button.addEventListener("click", function() {
            const value = button.getAttribute("data-value");
            if (value === "C") {
                input = "";
                display.value = "";
                return;
            }
            if (value === "4") {
                try {
                    const result = eval(input);
                    if (result === targetValue) {
                        display.value = "Correct!";
                        setTimeout(() => {
                            completeCalculatorLevel(); // Trigger the unlocking process
                        }, 2000);
                    } else {
                        display.value = "Incorrect, try again!";
                        setTimeout(() => {
                            input = "";
                            display.value = "";
                        }, 2000);
                    }
                } catch (error) {
                    display.value = "Error!";
                    setTimeout(() => {
                        input = "";
                        display.value = "";
                    }, 2000);
                }
                return;
            }
            const randomValue = randomValueMap[value];
            input += randomValue;
            display.value += randomValue;
        });
    });
});

function completeCalculatorLevel() {
    sessionStorage.setItem('calculatorCompleted', true);

    // Display win message
    document.body.innerHTML = "<div class='completed-message'><h1>You Win! 🎉</h1></div>";

    // Redirect after 3 seconds
    setTimeout(function() {
        window.location.href = "main.html"; // Redirect to main.html
    }, 3000);
}
