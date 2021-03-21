let shrinkButton = document.getElementById('button-shrink'),
    growButton = document.getElementById('button-grow'),
    imageContainer = document.getElementById('image-container'),
    adjustButton = document.getElementById('button-adjust'),
    imageContent = document.getElementById('content-image'),
    image = document.getElementById('image');

let containerWidth = 50,
    darkMode = true;

shrinkButton.addEventListener('click', shrink);
growButton.addEventListener('click', grow);
adjustButton.addEventListener('click', adjust);

function shrink() {
    if (containerWidth < 100) {
        containerWidth += 5;
        imageContainer.style.width = containerWidth + '%';
    }
}

function grow() {
    if (containerWidth > 0) {
        containerWidth -= 5;
        imageContainer.style.width = containerWidth + '%';
    }
}

function adjust() {
    darkMode = !darkMode;
    darkMode ? setDark() : setLight();
}

function setLight() {
    image.src = './img/image-example-light.jpg';
    imageContent.style.backgroundColor = 'white';
}

function setDark() {
    image.src = './img/image-example.jpg';
    imageContent.style.backgroundColor = 'black';
}
