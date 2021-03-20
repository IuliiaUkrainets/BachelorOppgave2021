let shrinkButton = document.getElementById('button-shrink'),
    growButton = document.getElementById('button-grow'),
    imageContainer = document.getElementById('image-container');

let containerWidth = 50;

shrinkButton.addEventListener('click', shrink);
growButton.addEventListener('click', grow);

function shrink() {
    containerWidth += 5;
    imageContainer.style.width = containerWidth + '%';
}

function grow() {
    containerWidth -= 5;
    imageContainer.style.width = containerWidth + '%';
}
