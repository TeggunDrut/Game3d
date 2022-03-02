const canvas = document.getElementById("canvas");
// let ctx = canvas.getContext("2d");
let paused = true;
let keyState = {
  w: false,
  a: false,
  d: false,
  s: false,
  Space: false,
  Shift: false,
  Control: false
};
var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var canJump = false;
var run = false;
var crouching = false;

var velocity = new THREE.Vector3();
var direction = new THREE.Vector3();

var prevTime = performance.now();
let prevPlayerY = 0;

var pitchObject = new THREE.Object3D();
var yawObject = new THREE.Object3D();
yawObject.position.y = 33;
yawObject.position.z = 90;
// pitchObject.rotation.x = -70;

// floor
let floorWidth = 500;
let floorHeight = 500;
let floorDepth = 1;
var floorGeometry = new THREE.BoxBufferGeometry(
  floorWidth,
  floorHeight,
  floorDepth
);
var floorMaterial = new THREE.MeshLambertMaterial();
floorMaterial.color.setHSL(0.095, 1, 0.75);

var floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -0.5;
floor.receiveShadow = true;

let player = {
  x: 10,
  y: 10,
  z: -50,
  height: 30,
};
// let playerGeometry = new THREE.BoxGeometry(20, 20, 20);
// let playerMaterial = new THREE.MeshBasicMaterial({ color: "blue" });
// let playerMesh = new THREE.Mesh(playerGeometry, playerMaterial);
// playerMesh.castShadow = true;
// playerMesh.position.x = player.x;
// playerMesh.position.y = player.y;
// playerMesh.position.z = player.z;
let landonbox = false;
let ontop = true;
let beneath = false;
let wallDistOff = 5;
let onGround = false;

// UI

let UIState = null;

let UIs = ['options', 'exit']; // add others later

let crosshair = {
  length: 10,
  width: 5,
  offset: 20,
  color: ["red", "blue", "cyan"][Math.floor(Math.random() * 3)],
};
let boxes = {
  top: document.getElementById("topBox"),
  left: document.getElementById("leftBox"),
  right: document.getElementById("rightBox"),
  bottom: document.getElementById("bottomBox"),
};
for (box in boxes) {
  boxes[box].style.position = "absolute";
  boxes[box].style.margin = "auto";

  boxes[box].style.top = "0";
  console.log(boxes[box].style.top);
  boxes[box].style.left = "0";
  boxes[box].style.right = "0";
  boxes[box].style.bottom = "0";

  boxes[box].style.backgroundColor = crosshair.color;
}
boxes.top.style.width = crosshair.width;

boxes.top.style.width = crosshair.width + "px";
boxes.bottom.style.width = crosshair.width + "px";
boxes.top.style.height = crosshair.length + "px";
boxes.bottom.style.height = crosshair.length + "px";

boxes.left.style.width = crosshair.length + "px";
boxes.right.style.width = crosshair.length + "px";
boxes.left.style.height = crosshair.width + "px";
boxes.right.style.height = crosshair.width + "px";

boxes.top.style.top = crosshair.offset + "px";
boxes.left.style.left = crosshair.offset + "px";
boxes.right.style.right = crosshair.offset + "px";
boxes.bottom.style.bottom = crosshair.offset + "px";