let video;
let poseNet;
let poses = [];

//standard p5 structure
function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on("pose", function(results) {
    poses = results;
  });
  video.hide();
}


function draw(){
    background(255)
    translate(width,0)
    scale(-1,1);
    tint(255,128)
    image(video, 0, 0, width, height);
    drawPoints();   
}


//Custom
const modelLoaded = () => {
  console.log('Model should be loaded')
}

const drawPoints = () => {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i += 1) {
    const pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j += 1) {
      const keypoint = pose.keypoints[j];
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}