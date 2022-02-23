const canvas = document.getElementById("canvas");
// let ctx = canvas.getContext("2d");
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

var pitchObject = new THREE.Object3D();
var yawObject = new THREE.Object3D();
yawObject.position.y = 190;
yawObject.position.z = 90;
pitchObject.rotation.x = -70;

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
};
let playerGeometry = new THREE.BoxGeometry(20, 20, 20);
let playerMaterial = new THREE.MeshBasicMaterial({ color: "blue" });
let playerMesh = new THREE.Mesh(playerGeometry, playerMaterial);
playerMesh.castShadow = true;
playerMesh.position.x = player.x;
playerMesh.position.y = player.y;
playerMesh.position.z = player.z;
