let classifier;
let video;
let label = '';

function modelReady() {
    console.log('Model is ready!!!');
    classifier.predict(gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        //console.log(results);
        //label = results[0].className;
        label = results[0].label;
        classifier.predict(gotResults);
    }
}

// function imageReady() {
//   image(puffin, 0, 0, width, height);
// }

function setup() {
    createCanvas(640, 520);
    video = createCapture(VIDEO);
    video.hide();
    background(0);
    classifier = ml5.imageClassifier('MobileNet', video, modelReady);
}

function draw() {
    background(255);
    image(video, 0, 0);
    fill(48, 48, 48);
    textSize(24);
    text(label, 10, height - 12);
}