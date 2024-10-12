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

// Colors for blast effects
const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink'];

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

    return div;
}

// Create blast effect with specified number of symbols
function createBlastEffect(count) {
    effects.innerHTML = ''; // Clear any existing effects
    for (let i = 0; i < count; i++) {
        const shape = createBlastShape();
        shape.style.animationDuration = `${Math.random() * 1 + 1.5}s`;
        shape.style.animationDelay = `${Math.random() * 0.5}s`;
        effects.appendChild(shape);
    }
}

// Handle image upload
document.getElementById('uploadBtn').addEventListener('change', function (event) {
    const files = event.target.files;
    if (files.length > 0) {
        const reader = new FileReader();
        reader.onload = function (e) {
            uploadedPhoto.src = e.target.result; // Correctly set image src
            greetingContainer.style.display = 'block';
            createBlastEffect(200); // Trigger effects
        };
        reader.readAsDataURL(files[0]);  // Ensure that the file is read properly
    }
});

// Clear all the effects and refresh the page
clearBtn.addEventListener('click', function () {
    location.reload(); // Refresh the page to clear everything
});

// Reveal card functionality
revealBtn.addEventListener('click', function () {
    const cover = document.getElementById('cover');
    cover.classList.add('hidden');
    setTimeout(() => {
        effects.style.display = 'block';
        happyBirthdayText.style.display = 'block';
    }, 2000);
});

// Update custom text functionality
updateTextBtn.addEventListener('click', function () {
    const customText = customTextInput.value;
    if (customText) {
        happyBirthdayText.innerHTML = customText;
    }
});

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
                width: 80%;
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
    // Event listener for Reveal Button
    document.getElementById('revealBtn').addEventListener('click', function () {
        document.getElementById('cover').classList.add('hidden');
        setTimeout(() => {
            document.getElementById('effects').style.display = 'block';
            document.getElementById('happyBirthdayText').style.display = 'block';
        }, 2000);
    });

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

    createBlastEffect(200); // Initialize the blast effect
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
