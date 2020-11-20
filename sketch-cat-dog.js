// Classifier Variable
let classifier;
let poseNet;

// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/2t9UCJWMm/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";
let pose;

// Load the model first
function preload() {
    classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function modelLoaded() {
    console.log('poseNet ready');
}

function setup() {
    createCanvas(640, 520);
    // Create the video
    video = createCapture(VIDEO);
    video.size(640, height - 20);
    video.hide();

    flippedVideo = ml5.flipImage(video);
    // Start classifying
    classifyVideo();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}



function draw() {
    background(255);
    // Draw the video
    image(flippedVideo, 0, 0);

    // Draw the label
    fill(48, 48, 48);
    textSize(16);
    textAlign(CENTER);
    text(label, width / 2, height - 4);

    if (pose) {
        if (label === "Cat") {
            drawCat();
        } else {
            drawDog();
        }
    }
}

// Get a prediction for the current video frame
function classifyVideo() {
    flippedVideo = ml5.flipImage(video)
    classifier.classify(flippedVideo, gotResult);
    flippedVideo.remove();
}

// When we get a result
function gotResult(error, results) {
    // If there is an error
    if (error) {
        console.error(error);
        return;
    }
    // The results are in an array ordered by confidence.
    // console.log(results[0]);
    label = results[0].label;
    // Classifiy again!
    classifyVideo();
}

function gotPoses(poses) {
    if (poses.length > 0) {
        pose = poses[0].pose;
    }
}

function drawCat() {
    let eyeR = pose.rightEye;
    let eyeL = pose.leftEye;
    let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);

    //Outer Eye
    fill('#ffad00');
    ellipse(eyeR.x, eyeR.y, d / 1.5, (d / 2.5));
    ellipse(eyeL.x, eyeR.y, d / 1.5, d / 2.5);

    // Inner Eye
    fill(0);
    ellipse(eyeR.x - 1, eyeR.y, d / 10, d / 4);
    ellipse(eyeL.x - 1, eyeR.y, d / 10, d / 4);

    // Nose
    fill(0);
    triangle(pose.nose.x - (d / 3), pose.nose.y - (d / 10), pose.nose.x + (d / 3), pose.nose.y - (d / 10), pose.nose.x, pose.nose.y + (d / 3));

    //Outer Ear
    triangle(pose.nose.x + d, pose.nose.y - (d * 1.2), pose.nose.x + (d / 1.2), pose.nose.y - (d * 2), pose.nose.x + (d / 5), pose.nose.y - (d * 1.5));
    triangle(pose.nose.x - d, pose.nose.y - (d * 1.2), pose.nose.x - (d / 1.2), pose.nose.y - (d * 2), pose.nose.x - (d / 5), pose.nose.y - (d * 1.5));

    // Inner Ear
    fill('#ffad00');
    triangle(pose.nose.x + (d * .9), pose.nose.y - (d * 1.3), pose.nose.x + (d / 1.3), pose.nose.y - (d * 1.8), pose.nose.x + (d / 3.33), pose.nose.y - (d * 1.5));
    triangle(pose.nose.x - (d * .9), pose.nose.y - (d * 1.3), pose.nose.x - (d / 1.3), pose.nose.y - (d * 1.8), pose.nose.x - (d / 3.33), pose.nose.y - (d * 1.5));

    // Whiskers
    line(pose.nose.x + (d / 2.5), pose.nose.y - (d / 20), pose.nose.x + (d), pose.nose.y - (d / 4));
    line(pose.nose.x + (d / 2.5), pose.nose.y + (d / 20), pose.nose.x + d, pose.nose.y + (d / 4));
    line(pose.nose.x + (d / 2.5), pose.nose.y, pose.nose.x + d, pose.nose.y);

    line(pose.nose.x - (d / 2.5), pose.nose.y - (d / 20), pose.nose.x - d, pose.nose.y - (d / 4));
    line(pose.nose.x - (d / 2.5), pose.nose.y + (d / 20), pose.nose.x - d, pose.nose.y + (d / 4));
    line(pose.nose.x - (d / 2.5), pose.nose.y, pose.nose.x - d, pose.nose.y);
}

function drawDog() {
    let eyeR = pose.rightEye;
    let eyeL = pose.leftEye;
    let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);

    //Outer Eye
    fill('#ffad00');
    ellipse(eyeR.x, eyeR.y, d / 1.5, d / 1.5);
    ellipse(eyeL.x, eyeR.y, d / 1.5, d / 1.5);

    // Inner Eye
    fill(0);
    ellipse(eyeR.x - 1, eyeR.y, d / 3, d / 3);
    ellipse(eyeL.x - 1, eyeR.y, d / 3, d / 3);

    // Nose
    fill(0);
    ellipse(pose.nose.x, pose.nose.y, d, d / 1.5);

    //Outer Ear
    triangle(pose.nose.x + (d * 1.2), pose.nose.y - (d), pose.nose.x + (d * 0.8), pose.nose.y - (d * 2), pose.nose.x + (d * 2), pose.nose.y - (d * 2));
    triangle(pose.nose.x - (d * 1.2), pose.nose.y - (d), pose.nose.x - (d * 0.8), pose.nose.y - (d * 2), pose.nose.x - (d * 2), pose.nose.y - (d * 2));
}