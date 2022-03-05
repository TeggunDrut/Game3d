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
  Control: false,
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
  jumpHeight: 200,
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
let availableJump = true;
// UI

let UIState = null;

let UIs = ["options", "exit"]; // add others later

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
function changeCrosshair() {
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
}
changeCrosshair();

let itemHolder = new THREE.Object3D();
itemHolder.position.copy(yawObject.position);


let inventorySlots = [
  { id: 1, selected: {}},
  { id: 2, selected: {}},
  { id: 3, selected: {}},
  { id: 4, selected: {}},
  { id: 5, selected: {}},
  { id: 6, selected: {}},
  { id: 7, selected: {}},
]

let selectedSlot = inventorySlots[0];

// combat
let mouseDown = false;
let shooting = false;
let bullets = [];

function shoot(x, y, z) {
  let bulletGeom = new THREE.BoxBufferGeometry(1, 1, 1);
  let bulletMaterial = new THREE.MeshBasicMaterial({
    color: "blue",
    vertexColors: true,
    // wireframe: true,s
  });
  const piece = new THREE.BoxBufferGeometry(2, 2, 2);
  const material = new THREE.MeshBasicMaterial({
    vertexColors: true,
  });
  const positionAttribute = piece.getAttribute("position");
  const colors = [];

  const color = new THREE.Color();

  for (let i = 0; i < positionAttribute.count; i += 6) {
    color.setHex(0xffffff * Math.random());

    colors.push(color.r, color.g, color.b);
    colors.push(color.r, color.g, color.b);
    colors.push(color.r, color.g, color.b);

    colors.push(color.r, color.g, color.b);
    colors.push(color.r, color.g, color.b);
    colors.push(color.r, color.g, color.b);
  } // for

  // define the new attribute
  piece.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  cube = new THREE.Mesh(piece, material);
  cube.position.y = 0;
scene.add(cube)

  let bullet = new THREE.Mesh(piece, material);
  let distance = new THREE.Vector3();
  // alert(bullet.position.x);
  // bullet.position.x = yawObject.position.x;
  // bullet.position.y = yawObject.position.y;
  // bullet.position.z = yawObject.position.z;
  bullet.position.copy(yawObject.getWorldPosition(distance));
  // bullet.rotation.copy(pitchObject.rotation);s

  bullet.rotateX(pitchObject.rotation.x);
  bullet.rotateY(yawObject.rotation.y);
  bullet.rotateZ(yawObject.rotation.z);

  // bullet.quaternion.copy(camera.quaternion);

  // alert(bullet.position.y)
  bullet.castShadow = true;
  bullet.receiveShadow = true;
  scene.add(bullet);

  bullets.push({ b: bullet, x: x, y: y, z: z });
}
let shootLoop;
document.addEventListener("mousedown", (e) => {
  mouseDown = true;
  if (!shooting && mouseDown)
    shootLoop = setInterval(() => {
      shoot(10, 10, 10);
      // clearInterval(shootLoop);
    }, 100);
});
document.addEventListener("mouseup", (e) => {
  mouseDown = false;
  shooting = false;
  clearInterval(shootLoop);
});
