var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r700|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
    isMobile = true;
}

let started = false; //Determines if the user has gone through the startup screen
function start() {
    initListeners();
    drawText();
    drawClock();
}

//Multiplier to scale to screen size, 
//will not be greater than 1
let mult = window.innerWidth / 1000;
if(mult > 1) mult = 1;

//Draws the lock screen text
function drawText() {
    if(isMobile) {
        document.getElementById("start").innerHTML = "Tap to Start"
    }
}

function drawClock() {
    if(!started) {
        let date = new Date();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();
        function addZero(n) {
            if(n < 10) return "0" + n;
            return n;
        }
        hour = addZero(hour);
        minute = addZero(minute);
        second = addZero(second);
        document.getElementById("clock").innerHTML = hour + " : " + minute + " : " + second;
        setTimeout(drawClock, 500);
    }

}

//stores all the animation functions for use
let animations = {
    tv: () => {
        if(!started) {
            started = true;
        }
        document.getElementById("background").style.animation = "gradient 5s ease, move 0.5s linear 1 normal forwards";
        lock = document.getElementById("lock");
        lock.style.animation = "move 0.5s linear 1 normal backwards"
        setTimeout(() => {
            lock.style.display = "none";
        }, 400);
    }
};

//Sets up any event listeners
function initListeners () {
    window.onkeypress = animations.tv;
    window.onclick = animations.tv;
    window.onresize = () => {
        if(!started) {
            drawText();
            drawClock();
        }
    };
}


//Code to keep the last window the user interacted with at the front
let windows = ["aboutWindow"];

function front(id) {
    if(windows.length > 0) {
        document.getElementById(windows[windows.length - 1] + "Button").classList.remove("primary");
    }
    button = document.getElementById(id + "Button");
    button.classList.add("primary");
    let index = windows.indexOf(id);
    if(index >= 0) {
        if(index + 1 < windows.length) {
            windows = windows.slice(0, index).concat(windows.slice(index + 1, windows.length));
        }
        else {
            windows = windows.slice(0, index);
        }
            
    }
    windows.push(id);
    for(i = 0; i < windows.length; i++) {
        document.getElementById(windows[i]).style.zIndex = i;
    }
}

//Hides the window or element with the id
function hide(id) {
    let index = windows.indexOf(id);
    let button = document.getElementById(id + "Button");
    let classList = document.getElementById(id).classList;
    if(classList.contains("hidden")) {
        front(id);
        classList.toggle("hidden");
        button.classList.toggle("selected");
    } else if(windows[windows.length - 1] == id) {
        classList.toggle("hidden");
        button.classList.remove("selected");
        button.classList.remove("primary");
        let index = windows.indexOf(id);
        if(index + 1 < windows.length) {
            windows = windows.slice(0, index).concat(windows.slice(index + 1, windows.length));
        }
        else {
            windows = windows.slice(0, index);
        }
        if(windows.length > 0) {
            document.getElementById(windows[windows.length - 1] + "Button").classList.toggle("primary");
        }
    } else {
        front(id);
    }
    
    if(windows.length > 1) {
        let lastButton = document.getElementById(windows[windows.length - 2] + "Button");
        if(lastButton.classList.contains("primary")) {
            lastButton.classList.toggle("primary");
        }
    }
}


//When the user clicks on the drag bar on the window, keeps window following the mouse until released
function startDrag(id) {
    let win = document.getElementById(id);
    let style = window.getComputedStyle(win);
    let x = event.pageX;
    let y = event.pageY;
    
    mouseDown = 1;

    window.onpointermove = (event) => {
        event.preventDefault();
        style = window.getComputedStyle(win);
        win.style.left = parseFloat(style.left.substr(0, style.left.length - 2)) + event.pageX - x + "px";
        if(parseFloat(style.top.substr(0, style.top.length - 2)) > 0 || event.pageY - y > 0) {
            win.style.top = parseFloat(style.top.substr(0, style.top.length - 2)) + event.pageY - y + "px";
        }
        x = event.pageX;
        y = event.pageY;
    }
    window.onpointerup = (event) => {
        event.preventDefault();
        window.onpointermove = null;
        mouseDown = 0;
    };
}


function relativeText(id) {
    let text = document.getElementById(id);
    text.style.width = "100%";
}

function startResize(id) {
    let win = document.getElementById(id);
    let style = window.getComputedStyle(win);
    child = null;
    
    overlays = [...document.getElementsByClassName("overlay")];
    
    overlays.forEach((o) => {
        o.classList.remove("hidden");
    });
    
    
    
    let x = event.pageX;
    let y = event.pageY;
    
    let mouseDown = 1;
    
    window.onpointermove = (event) => {
        if(mouseDown == 1) {
            style = window.getComputedStyle(win);
            deltaX = event.pageX - x;
            deltaY = event.pageY - y;
            let width = parseFloat(style.width.substr(0, style.width.length - 2));
            let height = parseFloat(style.height.substr(0, style.height.length - 2));
            if(width + deltaX > 400 || deltaX > 0) {
                width = width + deltaX;
                win.style.width = width + "px";
            }
            if(height + deltaY > 400 || deltaY > 0) {
                height = height + deltaY;
                win.style.height = height + "px";
            }
            
            
            x = event.pageX;
            y = event.pageY;
            
            
        } else {
            window.onpointermove = null;
            window.onpointerdown = null;
            overlays.forEach((o) => {
                o.classList.add("hidden");
            });
        }
    }
    
    window.onpointerup = (event) => {
        mouseDown = 0;
        overlays.forEach((o) => {
            o.classList.add("hidden");
        });
    }

}

function snapLeft(id) {
    let win = document.getElementById(id);
    win.style.width = "50%";
    win.style.height = "100%";
    win.style.top = 0;
    win.style.left = 0;
}

function snapRight(id) {
    let win = document.getElementById(id);
    win.style.width = "50%";
    win.style.height = "100%";
    win.style.top = 0;
    win.style.left = "50%";
}

function toggleProject() {
    let drone = document.getElementById("drone");
    drone.classList.toggle("hidden");
    droneButton = document.getElementById("droneButton");
    droneButton.classList.toggle("selected");
    galleryButton = document.getElementById("galleryButton");
    galleryButton.classList.toggle("selected");
    
}

function fullScreen(id) {
    win = document.getElementById(id);
    win.style.width = "100%";
    win.style.height = "100%";
    win.style.top = 0;
    win.style.left = 0;
}
