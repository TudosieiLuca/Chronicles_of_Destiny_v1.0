// static/main.js
document.addEventListener('DOMContentLoaded', function () {
    const narrationText = document.querySelector('.narration-text');
    const optionsContainer = document.getElementById('options');
    const yesButton = document.getElementById('yes-button');
    const noButton = document.getElementById('no-button');
    const yesButton2 = document.getElementById('yes-button-2');
    const noButton2 = document.getElementById('no-button-2');

    const introText = "Welcome, young adventurer, I have a quest for you, are you interested?";
    const chooseYes = "So you choose to continue, very good then!";
    const chooseNo = "Then why did you even bother to come here..?";
    const secondNoText = "Are you sure you don't want to join?";
    const joinOptionText = "Ok, I will join.";
    const stayOptionText = "No, I would prefer to stay.";

    const fakeIPs = [
        "117.25.16.57",
        "69.225.125.23",
        "243.34.151.135",
        "42.45.195.57",
        "132.196.92.187",
        "195.32.224.219",
        "137.0.231.157",
        "145.46.115.182",
        "203.240.185.167",
        "127.242.100.84"
    ];

    let currentStoryIndex = 0;

    function typeText(text, index) {
        if (index < text.length) {
            narrationText.innerHTML += text.charAt(index);
            index++;
            setTimeout(function () {
                typeText(text, index);
            }, 100); // Adjust the delay between letters (in milliseconds)
        } else {
            // Display options after typing the text
            showOptions();
        }
    }

    function showOptions() {
        optionsContainer.style.display = 'flex';

        // Show the buttons after the specific text
        if (currentStoryIndex === 0) {
            yesButton.style.display = 'inline-block';
            noButton.style.display = 'inline-block';
            yesButton2.style.display = 'none';
            noButton2.style.display = 'none';
        } else if (currentStoryIndex === 2) {
            yesButton.style.display = 'none';
            noButton.style.display = 'none';
            yesButton2.style.display = 'inline-block';
            noButton2.style.display = 'inline-block';
        }
    }

    function chooseOption(isYes) {
        optionsContainer.style.display = 'none';

        if (isYes) {
            // Move to the next part of the story
            currentStoryIndex++;
            if (currentStoryIndex === 1) {
                narrationText.innerHTML = ''; // Clear the previous text
                typeText(chooseYes, 0);
            } else if (currentStoryIndex === 3) {
                // If the user chooses "Ok, I will join."
                narrationText.innerHTML = ''; // Clear the previous text
                typeText("Great! Let the adventure begin!", 0);
            }
        } else {
            // The site crashes for the first "No" option
            if (currentStoryIndex === 0) {
                narrationText.innerHTML = ''; // Clear the previous text
                typeText(chooseNo, 0);
                currentStoryIndex = 2;  // Set the index for the second set of buttons
            } else if (currentStoryIndex === 2) {
                // Ask again if the user is sure they don't want to join
                narrationText.innerHTML = ''; // Clear the previous text
                typeText(secondNoText, 0);
            } else if (currentStoryIndex === 4) {
                // If the user chooses "No, I would prefer to stay."
                scareUser();
            }
        }
    }

    function scareUser() {
        // Display a fake IP address to scare the user
        const randomIP = fakeIPs[Math.floor(Math.random() * fakeIPs.length)];
        alert(`I will come over!\nYour location is being tracked from IP Address ${randomIP}`);
    }

    // Event listeners for the buttons
    yesButton.addEventListener('click', function () {
        chooseOption(true);
    });

    noButton.addEventListener('click', function () {
        chooseOption(false);
    });

    yesButton2.addEventListener('click', function () {
        chooseOption(true);
    });

    noButton2.addEventListener('click', function () {
        // The alert should be displayed when the user chooses "No, I would prefer to stay."
        if (currentStoryIndex === 2) {
            scareUser();
        } else {
            chooseOption(false);
        }
    });

    // Start typing the introduction
    typeText(introText, 0);
});
