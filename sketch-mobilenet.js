let mobilenet; // image classifier
let puffin;

function modelReady() {
    console.log('Model is ready!!!');
    mobilenet.predict(puffin, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        let label = results[0].label;
        let confidence = results[0].confidence;
        //fill(255);
        //textSize(64);
        //text(label, 10, height - 50);
        createP(label);
        createP(confidence);
    }
}

function imageReady() {
    image(puffin, 0, 0, width, height);
}

//standard p5 structure
function setup() {
    createCanvas(640, 480);

    puffin = createImg('img/puffin.jpg', imageReady);
    puffin.hide();

    mobilenet = ml5.imageClassifier('MobileNet', modelReady); // image classifier
}


function draw() {

}


//Custom