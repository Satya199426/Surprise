// Select DOM elements
const uploadedPhoto = document.getElementById('uploadedPhoto');
const effects = document.getElementById('effects');
const clearBtn = document.getElementById('clearBtn');
const downloadBtn = document.getElementById('downloadBtn');
const revealBtn = document.getElementById('revealBtn');
const greetingContainer = document.getElementById('greetingContainer');
const happyBirthdayText = document.getElementById('happyBirthdayText');
const updateTextBtn = document.getElementById('updateTextBtn');
const customTextInput = document.getElementById('customText');
const audio = new Audio('Devara Release Trailer Bgm Ringtone Download - MobCup.Com.Co.mp3');

// Colors for blast effects
const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink'];

// Handle image upload
document.getElementById('uploadBtn').addEventListener('change', function (event) {
    const files = event.target.files;
    if (files.length > 0) {
        const reader = new FileReader();
        reader.onload = function (e) {
            uploadedPhoto.src = e.target.result; // Set image source
            greetingContainer.style.display = 'block'; // Show greeting container
            createBlastEffect(600); // Trigger effects
        };
        reader.readAsDataURL(files[0]);
    }
});

// Clear all the effects and refresh the page
clearBtn.addEventListener('click', function () {
    location.reload(); // Refresh the page
});

// Reveal card functionality with text-to-speech and music
revealBtn.addEventListener('click', function () {
    const cover = document.getElementById('cover');
    cover.classList.add('hidden');
    
    setTimeout(() => {
        effects.style.display = 'block'; // Show effects
        happyBirthdayText.style.display = 'block'; // Show text
        
        // Play the audio
        audio.currentTime = 0; // Reset to the beginning
    setTimeout(() => {
        audio.play(); // Play background music
    }, 3000); // 3 seconds delay

        
        // Play the voice for the greeting text
        const customGreeting = customTextInput.value || "Happy Birthday!";
        speakGreeting(customGreeting); // Call the text-to-speech function

    }, 2000);
});

// Update custom text functionality
updateTextBtn.addEventListener('click', function () {
    const customText = customTextInput.value;
    if (customText) {
        happyBirthdayText.innerHTML = customText; // Update greeting text
    }
});

// Create a random blast shape (star or heart)
function createBlastShape() {
    const div = document.createElement('div');
    const size = Math.random() * 20 + 10; // Size of the shape

    const shapeType = Math.floor(Math.random() * 2);
    if (shapeType === 0) {
        div.classList.add('blast', 'star');
        div.innerHTML = '★';
        div.style.color = colors[Math.floor(Math.random() * colors.length)];
        div.style.fontSize = `${size}px`;
    } else {
        div.classList.add('blast', 'heart');
        div.innerHTML = '❤';
        div.style.color = colors[Math.floor(Math.random() * colors.length)];
        div.style.fontSize = `${size}px`;
    }

    const containerWidth = greetingContainer.clientWidth; // Get dynamic width of container
    const startFromLeft = Math.random() < 0.5;
    div.style.left = startFromLeft 
        ? `${Math.random() * (containerWidth / 2)}px` 
        : `${(containerWidth / 2) + Math.random() * (containerWidth / 2)}px`;
    div.style.bottom = '0px';

    return div; // Return the created shape
}

// Create blast effect with specified number of symbols
function createBlastEffect(count) {
    effects.innerHTML = ''; // Clear any existing effects
    for (let i = 0; i < count; i++) {
        const shape = createBlastShape(); // Create the shape
        shape.style.animationDuration = `${Math.random() * 1 + 1.5}s`;
        shape.style.animationDelay = `${Math.random() * 0.5}s`;
        effects.appendChild(shape); // Append shape to effects
    }
}

// Text-to-Speech function
function speakGreeting(text) {
    if ('speechSynthesis' in window) { // Check if the Web Speech API is supported
        const speech = new SpeechSynthesisUtterance(text); // Create speech object
        speech.lang = 'en-US'; // Set language
        speech.rate = 1; // Set speech rate
        speech.pitch = 1; // Set pitch
        window.speechSynthesis.speak(speech); // Speak text
    } else {
        alert("Sorry, your browser doesn't support speech synthesis.");
    }
}

// Download the greeting card without header text and with a reveal card option
downloadBtn.addEventListener('click', function downloadGreetingCard() {
    const customText = happyBirthdayText.innerHTML; // Capture the current text

    const cardHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Birthday Greeting</title>
        <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet">
        <style>
            body {
                font-family: Arial, sans-serif;
                text-align: center;
                padding: 20px;
                background-color: #f0f0f0;
            }

            #greetingContainer {
                position: relative;
                width: 100%;
                height: 400px;
                margin: 0 auto;
                background-color: #fff;
                border: 2px solid #ddd;
                overflow: hidden;
            }

            #cover {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: #FFD700;
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 2;
                transition: all 2s ease-in-out;
            }

            #cover.hidden {
                transform: translateY(-100%);
            }

            #uploadedPhoto {
                width: 100%;
                height: auto; 
                max-height: 100%;
                object-fit: contain; 
                display: block;
            }

            #effects {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 3;
            }

            /* Firecracker blast animation */
            @keyframes blastAnimation {
                0% {
                    transform: translateY(0) scale(0.5);
                    opacity: 1;
                }
                100% {
                    transform: translateY(-200px) scale(1);
                    opacity: 0;
                }
            }

            .blast {
                position: absolute;
                animation: blastAnimation 2s ease-out infinite;
                border-radius: 50%;
                opacity: 1;
            }

            .star {
                color: yellow;
                font-size: 25px;
            }

            .heart {
                color: red;
                font-size: 20px;
            }

            #happyBirthdayText {
            position: absolute;
            font-weight:bold;
            font-family: 'Pacifico', cursive;
            font-size: 30px;
            color: red;
            text-shadow: 4px 4px 0px rgba(0, 0, 0, 0.2), 8px 8px 0px rgba(0, 0, 0, 0.15);
            bottom: 20px;
            width: 100%;
            
            display: none;
        }


            button {
                padding: 10px 20px;
                background-color: #28a745;
                color: white;
                border: none;
                font-size: 16px;
                cursor: pointer;
                margin-top: 20px;
            }

            button:hover {
                background-color: #218838;
            }
        </style>
    </head>
    <body>

    <div id="greetingContainer">
        <div id="cover">
            <h2 style="font-size:20px;">Open to Reveal Your Surprise!</h2>
        </div>
        <img id="uploadedPhoto" src="${uploadedPhoto.src}" class="uploaded-image">
        <div id="effects">
            ${effects.innerHTML}
        </div>
        <div id="happyBirthdayText">${customText}</div> <!-- Insert custom text here -->
    </div>

    <button id="revealBtn" style="text-align:center;">Reveal Card</button>

    <script>
    const audio = new Audio('https://github.com/Satya199426/Surprise/blob/main/Devara%20Release%20Trailer%20Bgm%20Ringtone%20Download%20-%20MobCup.Com.Co.mp3');
    
    // Reveal card functionality with text-to-speech and music
    document.getElementById('revealBtn').addEventListener('click', function () {
        const cover = document.getElementById('cover');
        cover.classList.add('hidden');

        setTimeout(() => {
            document.getElementById('effects').style.display = 'block';
            document.getElementById('happyBirthdayText').style.display = 'block';
            audio.currentTime = 0; // Reset to the beginning
            setTimeout(() => {
                audio.play(); // Play background music
            }, 3000); // 3 seconds delay

            // Play the voice for the greeting text
            const customGreeting = "${customText}"; // Use custom text
            speakGreeting(customGreeting);
        }, 2000);
    });

    // Text-to-Speech function
    function speakGreeting(text) {
        if ('speechSynthesis' in window) { 
            const speech = new SpeechSynthesisUtterance(text);
            speech.lang = 'en-US';
            speech.rate = 1; 
            speech.pitch = 1; 
            window.speechSynthesis.speak(speech);
        } else {
            alert("Sorry, your browser doesn't support speech synthesis.");
        }
    }

    // Create a random blast shape
    function createBlastShape() {
        const div = document.createElement('div');
        const size = Math.random() * 20 + 10;
        const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink'];
        const shapeType = Math.floor(Math.random() * 2);
        if (shapeType === 0) {
            div.classList.add('blast', 'star');
            div.innerHTML = '★';
            div.style.color = colors[Math.floor(Math.random() * colors.length)];
            div.style.fontSize = \`\${size}px\`;
        } else {
            div.classList.add('blast', 'heart');
            div.innerHTML = '❤';
            div.style.color = colors[Math.floor(Math.random() * colors.length)];
            div.style.fontSize = \`\${size}px\`;
        }
        const containerWidth = document.getElementById('greetingContainer').clientWidth;
        div.style.left = Math.random() * containerWidth + 'px';
        div.style.bottom = '0px';
        return div;
    }

    // Create blast effect
    function createBlastEffect(count) {
        const effects = document.getElementById('effects');
        effects.innerHTML = '';
        for (let i = 0; i < count; i++) {
            const shape = createBlastShape();
            shape.style.animationDuration = \`\${Math.random() * 1 + 1.5}s\`;
            shape.style.animationDelay = \`\${Math.random() * 0.5}s\`;
            effects.appendChild(shape);
        }
    }

    createBlastEffect(600);
    
    
    // Initialize the blast effect
    </script>

    </body>
    </html>
    `;

    const blob = new Blob([cardHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Surprise_Gift.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});
