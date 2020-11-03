/*jslint es6 */
//Initializes the audio conext when called
let ctx;
function initialize() {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
}

//Unchecks all the checkboxes of a class
function clearBoxes(className) {
    //Clearing the checkboxes
    Array.from(document.getElementsByClassName(className)).forEach((element) => element.classList.remove("active"));
}

function toggleSharp() {
    toggleAll();
    document.getElementById("sharpContainer").classList.toggle("hidden");
    document.getElementById("flatContainer").classList.toggle("hidden");
}

let just = false;
let root = 0;

function toggleJust(element) {
    just = !just;
    root = -1;
    toggleAll();
    element.classList.toggle("active");
    document.getElementById("justContainer").classList.toggle("hidden");
}

//Value equal tempered notes are based on (A4)
let base = 440;
//Slider information for base value
let slider = document.getElementById("base");
let A4 = document.getElementById("A4Freq");
A4.innerHTML = slider.value;

//Creating custom waveform
let imag = new Float32Array([0.0,1.0,1.0,1.0,1.0,1.0]);
let real = new Float32Array(imag.length);
let organ;

//Updates the frequency of A4
slider.oninput = function() {
    clearBoxes("equalCheckbox");
    toggleAll();
    base = this.value;
    A4.innerHTML = base;
};

//Number to multiply base note to get octaves with 4 being the original
function octaveMultiplier(octave) {
    return 2 ** (octave - 4);
}

//Frequency for equal tempered note based on semitones away from base returns -1 in just mode
function equalNote(octave, semitones) {
    let equalMultiplier = 2 ** (1/12);
    let note = base * octaveMultiplier(octave) * equalMultiplier ** semitones;
    if (just) {
        toggleAll();
        root = note;
        return -1;
    }
    return note;
}

function justNote(ratio) {
    return root * ratio;
}

//Stores notes that are playing in [oscillator, frequency] array pairs
let notes = [];

//returns index of a frequency of -1 if not found
function indexOf(frequency) {
    for (let i = 0; i < notes.length; i++) {
        if (notes[i][1] === frequency) {
            return i;
        }
    }
    return -1;
}

//Adds a note to be played or removes if exists
function toggleNote(element, frequency) {
    if (typeof ctx === "undefined") {
        initialize();
    }
    if (frequency != -1) {
        let index = indexOf(frequency);
        if(index == -1) {
            let oscillator = ctx.createOscillator();
            organ = ctx.createPeriodicWave(real, imag);
            oscillator.setPeriodicWave(organ);
            oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
            oscillator.start();
            oscillator.connect(ctx.destination);
            notes.push([oscillator, frequency]);
        } else {
            notes[index][0].disconnect();
            notes.splice(index, 1);
        }
    }
    element.classList.toggle("active");
}

//Toggles the sound for the current frequency
function toggleAll() {
    //Removes all sounds
    notes.forEach(function(note) {
        note[0].disconnect();
    });
    clearBoxes("note");
    clearBoxes("just");
    root = 0;
    notes.length = 0;
}




//Controlling the octave that is displayed when the screen is too thing for all
let currentOctave = 3;
let sharps = document.getElementsByClassName("sharp");
let flats = document.getElementsByClassName("flat");

function previous() {
    sharps[currentOctave].classList.toggle("active");
    flats[currentOctave].classList.toggle("active");
    if(currentOctave > 0) {
        currentOctave--;
    } else {
        currentOctave = 5;
    }
    sharps[currentOctave].classList.toggle("active");
    flats[currentOctave].classList.toggle("active");
}

function next() {
    sharps[currentOctave].classList.toggle("active");
    flats[currentOctave].classList.toggle("active");
    if(currentOctave < 5) {
        currentOctave++;
    } else {
        currentOctave = 0;
    }
    sharps[currentOctave].classList.toggle("active");
    flats[currentOctave].classList.toggle("active");
}