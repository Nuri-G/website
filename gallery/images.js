//Controlls the image gallery

//The image index
let i = -1;

let current = document.getElementById("gImage");

//Image src file directories
let imageSrcs = ["images/build.png", "images/ship1.png", "images/ship2.png", "images/tree1.png", "images/tree2.png"];

//Changes the image to the next one in imageSrcs, and goes back to first element if index > range
function nextImage() {
    "use strict";
    
    if (i < imageSrcs.length - 1) {
        i++;
    } else {
        i = 0;
    }
    current.src = imageSrcs[i];
}

//Changes the image to the previous one in imageSrcs, and goes back to last element if index < 0
function previousImage() {
    "use strict";
    
    if (i > 0) {
        i--;
    } else {
        i = imageSrcs.length - 1;
    }
    current.src = imageSrcs[i];
}

//Sets a new image every 3 seconds
nextImage();
let interval = setInterval(nextImage, 3000);
let cleared = false;

function clearInt() {
    "use strict";
    if (!cleared) {
        clearInterval(interval);
        cleared = true;
    }
    
}