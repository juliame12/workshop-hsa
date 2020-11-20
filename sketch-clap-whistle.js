// Global variable to store the classifier
let classifier;

// Label
let label;
let labelDiv;

let confidence;
let confidenceDiv;

let balloon = false;
let count = 0;

let magenta;

// Teachable Machine model URL:
let soundModel = 'https://teachablemachine.withgoogle.com/models/9bLStBUUZ/';


function preload() {
    // Load the Teachable Machine model
    classifier = ml5.soundClassifier(soundModel + 'model.json');
}

function setup() {
    createCanvas(windowWidth * 0.66, windowHeight * 0.66);
    // Create 'label' and 'confidence' div to hold results
    labelDiv = createDiv('Listening');
    confidenceDiv = createDiv('...');
    // Start classifying
    // The sound model will continuously listen to the microphone
    classifier.classify(gotResult);
}

function draw() {
    // Draw the label in the canvas
    //textSize(32);
    //textAlign(CENTER, CENTER);
    //text(label, width / 2, height / 2);
    magenta = getRandomBlue();
    fill(color(magenta));
    noStroke();

    if (label === "Whistles" && confidence > 0.9) {
        balloon = true;
    }

    if (balloon) {
        let d = getRandomInt(50, 100);
        ellipse(getRandomInt(0, width), getRandomInt(0, height), d, d);
    }

    if (label === "Claps" && confidence > 0.9) {
        clear();
        background(255);
    }

    balloon = false;
}


// The model recognizing a sound will trigger this event
function gotResult(error, results) {
    if (error) {
        console.error(error);
        return;
    }
    // The results are in an array ordered by confidence.
    // console.log(results[0]);

    // Show the first label and confidence
    label = results[0].label;
    confidence = results[0].confidence;

    if (label === "Hintergrundgeräusche") {
        labelDiv.html('Listening');
        confidenceDiv.html('...');
    } else {
        labelDiv.html('' + label);
        confidenceDiv.html('' + nf(confidence, 0, 2)); // Round the confidence to 0.01
    }
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomBlue() {
    let saturation = getRandomInt(60, 100);
    let lightness = getRandomInt(20, 60);
    let randomColor = `hsla( 207, ${saturation}%, ${lightness}%, 0.9 )`;
    return randomColor;
}