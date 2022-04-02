// const canvas = document.getElementById("canvas");
// // let ctx = canvas.getContext("2d");
// let paused = true;
// let keyState = {
//   w: false,
//   a: false,
//   d: false,
//   s: false,
//   Space: false,
//   Shift: false,
//   Control: false,
// };

// let gameConsole = {
//   open: false,
// };

// let worldObjects = [];

// var moveForward = false;
// var moveBackward = false;
// var moveLeft = false;
// var moveRight = false;
// var canJump = false;
// var run = false;
// var crouching = false;

// var velocity = new THREE.Vector3();
// var direction = new THREE.Vector3();

// var prevTime = performance.now();
// let prevPlayerY = 0;

// var pitchObject = new THREE.Object3D();
// var yawObject = new THREE.Object3D();
// yawObject.position.y = 33;
// yawObject.position.z = 90;
// // pitchObject.rotation.x = -70;

// // floor
// let floorWidth = 500;
// let floorHeight = 500;
// let floorDepth = 1;
// var floorGeometry = new THREE.BoxBufferGeometry(
//   floorWidth,
//   floorHeight,
//   floorDepth
// );
// var floorMaterial = new THREE.MeshLambertMaterial();
// floorMaterial.color.setHSL(0.095, 1, 0.75);

// var floor = new THREE.Mesh(floorGeometry, floorMaterial);
// floor.rotation.x = -Math.PI / 2;
// floor.position.y = -0.5;
// floor.receiveShadow = true;
// floor.name = "floor";

// let gridBoxes = [[]];
// let indexRow = 0;
// let indexCol = 0;

// // let numx = cameraDistance(camera).x;
// // let numz = cameraDistance(camera).z;

// // let newX = numx - floorWidth

// // for (let i = -floorWidth / 2; i < floorWidth / 2; i += 45 / 4) {
// //   indexRow += 1;
// //   gridBoxes.push({ x: i });
// //   for (let j = -floorWidth / 2; j < floorWidth / 2; j += 45 / 4) {
// //     indexCol++;
// //     gridBoxes.push({ x: i });
// //   }
// // }
// console.log(indexRow, indexCol);
// let player = {
//   x: 10,
//   y: 10,
//   z: -50,
//   height: 30,
//   jumpHeight: 200,
//   placeDistance: 6,
//   leftClick: function () {
//     if (firstShot && selectedSlot.selected.type == "gun") {
//       shoot(10, 10, 10);
//       firstShot = false;
//     }
//     if (!shooting && mouseDown && selectedSlot.selected.type == "gun")
//       shootLoop = setInterval(() => {
//         shoot(10, 10, 10);
//         // clearInterval(shootLoop);
//       }, 100);
//   },
//   rightClick: function () {
//     if (
//       selectedSlot.selected.type == "placeable" &&
//       cameraDistance(camera) != undefined
//     ) {
//       if (cameraDistance(camera).distance < player.placeDistance * 10) {
//         placeObject(selectedSlot.selected);
//       }
//     }
//   },
// };
// // let playerGeometry = new THREE.BoxGeometry(20, 20, 20);
// // let playerMaterial = new THREE.MeshBasicMaterial({ color: "blue" });
// // let playerMesh = new THREE.Mesh(playerGeometry, playerMaterial);
// // playerMesh.castShadow = true;
// // playerMesh.position.x = player.x;
// // playerMesh.position.y = player.y;
// // playerMesh.position.z = player.z;
// let landonbox = false;
// let ontop = true;
// let beneath = false;
// let wallDistOff = 5;
// let onGround = false;
// let availableJump = true;
// // UI
// let scene = new THREE.Scene();
// scene.background = new THREE.Color(0xffffff);
// scene.fog = new THREE.Fog(0xffffff, 0, 2000);

// let renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
// renderer.setPixelRatio(window.devicePixelRatio);
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;
// renderer.shadowMap.enabled = true;
// document.body.appendChild(renderer.domElement);
// renderer.outputEncoding = THREE.sRGBEncoding;

// let camera = new THREE.PerspectiveCamera(
//   75,
//   window.innerWidth / window.innerHeight,
//   1,
//   1000
// );
// raycaster = new THREE.Raycaster(
//   camera.getWorldPosition(new THREE.Vector3()),
//   camera.getWorldDirection(new THREE.Vector3())
// );
// let UIState = null;

// let UIs = ["options", "exit"]; // add others later

// let crosshair = {
//   length: 10,
//   width: 5,
//   offset: 20,
//   color: ["red", "blue", "cyan"][Math.floor(Math.random() * 3)],
// };
// let boxes = {
//   top: document.getElementById("topBox"),
//   left: document.getElementById("leftBox"),
//   right: document.getElementById("rightBox"),
//   bottom: document.getElementById("bottomBox"),
// };
// for (box in boxes) {
//   boxes[box].style.position = "absolute";
//   boxes[box].style.margin = "auto";

//   boxes[box].style.top = "0";
//   console.log(boxes[box].style.top);
//   boxes[box].style.left = "0";
//   boxes[box].style.right = "0";
//   boxes[box].style.bottom = "0";

//   boxes[box].style.backgroundColor = crosshair.color;
// }

// changeCrosshair();

// let itemHolder = new THREE.Object3D();
// itemHolder.name = "itemHolder";
// itemHolder.position.copy(yawObject.position);

// let rep;

// let inventorySlots = [
//   {
//     id: 1,
//     selected: {
//       type: "placeable",
//       shape: "box",
//       scaleX: 10,
//       scaleY: 10,
//       scaleZ: 10,
//       blockType: "conveyor",
//       r: 0.39215686274509803,
//       g: 0.7843137254901961,
//       b: 0.39215686274509803,
//       red: 0,
//       green: 255,
//       blue: 0,
//     },
//   },
//   {
//     id: 2,
//     selected: {
//       type: "placeable",
//       shape: "box",
//       scaleX: 1,
//       scaleY: 10,
//       scaleZ: 10,
//       blockType: "conveyor",
//       r: 1,
//       g: 0,
//       b: 0,
//       red: 255,
//       green: 0,
//       blue: 0,
//     },
//   },
//   { id: 3, selected: {} },
//   { id: 4, selected: {} },
//   { id: 5, selected: {} },
//   { id: 6, selected: {} },
//   { id: 7, selected: {} },
// ];

// let selectedSlot = inventorySlots[0];

// // combat
// let mouseDown = false;
// let shooting = false;
// let bullets = [];

// function shoot(x, y, z) {
//   let bulletGeom = new THREE.BoxBufferGeometry(1, 1, 1);
//   let bulletMaterial = new THREE.MeshBasicMaterial({
//     color: "blue",
//     vertexColors: true,
//     // wireframe: true,s
//   });
//   const piece = new THREE.BoxBufferGeometry(2, 2, 2);
//   const material = new THREE.MeshBasicMaterial({
//     vertexColors: true,
//   });
//   const positionAttribute = piece.getAttribute("position");
//   const colors = [];

//   const color = new THREE.Color();

//   for (let i = 0; i < positionAttribute.count; i += 6) {
//     color.setHex(0xffffff * Math.random());

//     colors.push(color.r, color.g, color.b);
//     colors.push(color.r, color.g, color.b);
//     colors.push(color.r, color.g, color.b);

//     colors.push(color.r, color.g, color.b);
//     colors.push(color.r, color.g, color.b);
//     colors.push(color.r, color.g, color.b);
//   } // for

//   // define the new attribute
//   piece.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
//   cube = new THREE.Mesh(piece, material);
//   cube.position.y = 0;
//   // scene.add(cube);

//   let bullet = new THREE.Mesh(piece, material);
//   let distance = new THREE.Vector3();
//   // alert(bullet.position.x);
//   // bullet.position.x = yawObject.position.x;
//   // bullet.position.y = yawObject.position.y;
//   // bullet.position.z = yawObject.position.z;
//   bullet.position.copy(yawObject.getWorldPosition(distance));
//   // bullet.rotation.copy(pitchObject.rotation);s

//   bullet.rotateX(camera.rotation.x);
//   bullet.rotateY(yawObject.rotation.y);
//   bullet.rotateZ(pitchObject.rotation.z);

//   // bullet.quaternion.copy(camera.quaternion);

//   // alert(bullet.position.y)
//   bullet.castShadow = true;
//   bullet.receiveShadow = true;
//   bullet.name = "bullet";
//   scene.add(bullet);

//   bullets.push({ b: bullet, x: x, y: y, z: z });
// }
// let shootLoop;
// let firstShot = true;
// document.addEventListener("mousedown", (e) => {
//   if (!paused) {
//     mouseDown = true;
//     if (e.button == 0) {
//       player.leftClick();
//     }
//     if (e.button == 2) {
//       player.rightClick();
//     }
//   }
// });
// document.addEventListener("mouseup", (e) => {
//   mouseDown = false;
//   firstShot = true;
//   shooting = false;
//   clearInterval(shootLoop);
// });
const canvas = document.getElementById("canvas");
// let ctx = canvas.getContext("2d");

let scene;

let paused = false;
let keyState = {
  w: false,
  a: false,
  d: false,
  s: false,
  Space: false,
  Shift: false,
  Control: false,
};

let gameConsole = {
  open: false,
};

let worldObjects = [];

var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var canJump = false;
var run = false;
var crouching = false;
let prevPlayerY = 0;
let floorWidth = 500;
let floorHeight = 500;
let floorDepth = 1;
let landonbox = false;
let ontop = true;
let beneath = false;
let wallDistOff = 5;
let onGround = false;
let availableJump = true;
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
let rep;

let inventorySlots = [
  {
    id: 1,
    selected: {
      type: "placeable",
      shape: "box",
      scaleX: 10,
      scaleY: 10,
      scaleZ: 10,
      blockType: "conveyor",
      r: 0.39215686274509803,
      g: 0.7843137254901961,
      b: 0.39215686274509803,
      red: 0,
      green: 255,
      blue: 0,
    },
  },
  {
    id: 2,
    selected: {
      type: "placeable",
      shape: "box",
      scaleX: 1,
      scaleY: 10,
      scaleZ: 10,
      blockType: "conveyor",
      r: 1,
      g: 0,
      b: 0,
      red: 255,
      green: 0,
      blue: 0,
    },
  },
  {
    id: 3,
    selected: {
      type: "placeable",
      shape: "model",
      modelName: "./models/m4 Supressor.gltf",
      scaleX: 10,
      scaleY: 10,
      scaleZ: 10,
      blockType: "box",
      r: 0,
      g: 0,
      b: 0,
      red: 0,
      green: 0,
      blue: 0,
    },
  },
  { id: 4, selected: {} },
  { id: 5, selected: {} },
  { id: 6, selected: {} },
  { id: 7, selected: {} },
];

let selectedSlot = inventorySlots[0];
let mouseDown = false;
let shooting = false;
let bullets = [];
let shootLoop;
let firstShot = true;
var prevTime = performance.now();
var time = performance.now();
var delta = (time - prevTime) / 1000;
let gravity = 6.8 * 100.0 * delta + 1;
function inBetweenFunc(obj1, obj2) {
  if (
    obj1.position.x > obj2.position.x - obj2.geometry.parameters.width / 2 &&
    obj1.position.x < obj2.position.x + obj2.geometry.parameters.width / 2 &&
    obj1.position.z > obj2.position.z - obj2.geometry.parameters.depth / 2 &&
    obj1.position.z < obj2.position.z + obj2.geometry.parameters.depth / 2
  ) {
    return true;
  } else {
    return false;
  }
}
let yawObject;
let pitchObject;
let camera;
let itemHolder;
let placeHolder;
let player;
let playerList = [];
let currentHeldModel = [];
let clock;

let floor;

function playerCollisionWithWallTop() {
  let floorX = floor.position.x - floorWidth / 2;
  let floorZ = floor.position.z - floorHeight / 2;
  let x = yawObject.position.x;
  let z = yawObject.position.z;

  if (z < floorZ + wallDistOff) {
    return true;
  } else {
    return false;
  }
}
function playerCollisionWithWallBottom() {
  let floorX = floor.position.x - floorWidth / 2;
  let floorZ = floor.position.z - floorHeight / 2;
  let x = yawObject.position.x;
  let z = yawObject.position.z;

  if (z > floorZ + floorHeight - wallDistOff) {
    return true;
  } else {
    return false;
  }
}
function playerCollisionWithWallLeft() {
  let floorX = floor.position.x - floorWidth / 2;
  let floorZ = floor.position.z - floorHeight / 2;
  let x = yawObject.position.x;
  let z = yawObject.position.z;

  if (x < floorX + wallDistOff) {
    return true;
  } else {
    return false;
  }
}

function playerCollisionWithWallRight() {
  let floorX = floor.position.x - floorWidth / 2;
  let floorZ = floor.position.z - floorHeight / 2;
  let x = yawObject.position.x;
  let z = yawObject.position.z;

  if (x > floorX + floorWidth - wallDistOff) {
    return true;
  } else {
    return false;
  }
}

let currentMap;

function collidingWithRect(mesh) {
  let playerX = yawObject.position.x;
  let playerY = yawObject.position.y - 30;
  let playerZ = yawObject.position.z;
  let geom = new THREE.BoxGeometry(mesh.scaleX, mesh.scaleY, mesh.scaleZ);
  let mat = new THREE.MeshBasicMaterial({ color: mesh.color });
  let m = new THREE.Mesh(geom, mat);
  m.name = "block";
  m.position.x = mesh.x;
  m.position.y = mesh.y;
  m.position.z = mesh.z;
  let x = floor.position.x - floorWidth / 2 + mesh.x + mesh.scaleX / 2;
  let y = m.position.y;
  let z = (m.position.z =
    floor.position.z - floorHeight / 2 + mesh.z + mesh.scaleZ / 2);
  let s = false;

  if (playerY < mesh.y) {
    s = false;
  } else {
    s = true;
  }
  if (
    playerY - player.height / 2 > mesh.y - mesh.scaleY &&
    playerY - player.height / 2 < mesh.y &&
    playerX < x + mesh.scaleX / 2 &&
    playerX > x - mesh.scaleX / 2 &&
    playerZ < z + mesh.scaleZ / 2 &&
    playerZ > z - mesh.scaleZ / 2 &&
    !(prevPlayerY > yawObject.position.y)
  ) {
    // if (!ontop) {
    //   beneath = true;
    // }
    velocity.y = -velocity.y;
    // alert(yawObject.position.y + " " + mesh.y + " " + prevPlayerY);
    yawObject.position.y += y - yawObject.position.y - 3;
  }
  if (
    playerY > y - mesh.scaleY / 2 &&
    playerY < y + mesh.scaleY &&
    // playerY + player.height < y - mesh.scaleY &&
    playerX - wallDistOff + 3 < x + mesh.scaleX / 2 &&
    playerX + wallDistOff - 3 > x - mesh.scaleX / 2 &&
    playerZ - wallDistOff + 3 < z + mesh.scaleZ / 2 &&
    playerZ + wallDistOff - 3 > z - mesh.scaleZ / 2
  ) {
    velocity.y = 0;
    s = false;
    ontop = true;
    return "ontop";
  }

  if (
    playerX > x - mesh.scaleX / 2 - wallDistOff &&
    playerX < x - mesh.scaleX / 2 + wallDistOff &&
    playerZ < z + mesh.scaleZ / 2 &&
    playerZ > z - mesh.scaleZ / 2 &&
    playerY < y + mesh.scaleY &&
    s
    // !(playerY > y + mesh.scaleY)
  )
    return "right";
  if (
    playerX < x + mesh.scaleX / 2 + wallDistOff &&
    playerX > x + mesh.scaleX / 2 - wallDistOff &&
    playerZ < z + mesh.scaleZ / 2 &&
    playerZ > z - mesh.scaleZ / 2 &&
    playerY < y + mesh.scaleY &&
    s
    // !(playerY > y + mesh.scaleY)
  ) {
    return "left";
  }

  if (
    playerZ < z + mesh.scaleZ / 2 &&
    playerZ > z - mesh.scaleZ / 2 - wallDistOff &&
    playerX > x - mesh.scaleX / 2 &&
    playerX < x + mesh.scaleX / 2 &&
    playerY < y + mesh.scaleY &&
    s
    // !(playerY > y + mesh.scaleY)
  ) {
    return "top";
  }
  if (
    playerZ > z - mesh.scaleZ / 2 - wallDistOff &&
    playerZ < z + mesh.scaleZ / 2 + wallDistOff &&
    playerX > x - mesh.scaleX / 2 &&
    playerX < x + mesh.scaleX / 2 &&
    playerY < y + mesh.scaleY &&
    s
  ) {
    return "bottom";
  }
}
function cameraDistance(camera) {
  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(scene.children);

  // scene.children.forEach((c) => {
  //   if (c.type == "Group" && c.name == "Scene") {
  //     console.log(c);
  //   }
  // });

  if (intersects[0] == undefined) {
    return {
      distance: 0,
      point: {
        x: 0,
        y: 0,
        z: 0,
      },
      object: {
        type: "null",
        name: "null",
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
        geometry: {
          parameters: {
            width: 0,
            height: 0,
            depth: 0,
          },
        },
      },
    };
  }
  for (let i = 0; i < intersects.length; i++) {
    let names = intersects[0].object.name.split(",");
    // names.forEach((name) => {
    //   if (name == "floor") {
    //     // console.log(intersects[0].point.x, intersects[0].point.z);
    //     return {
    //       dist: intersects[0].distance,
    //       x: intersects[0].point.x,
    //       y: intersects[0].point.y,
    //       z: intersects[0].point.z,
    //     };
    //   } else if (name == "conveyor") {
    //     console.log('asdadasd');
    //   }
    // });
    // console.log(intersects[0].object.type);
    return intersects[0];
  }
}
let raycaster;
let pointer;

let velocity;
let direction;

let signedIn = false;
let account = {
  username: "",
  email: "",
  password: "",
}
function login() {
  let g = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(g)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log(user);
      account.username = user.displayName;
      account.email = user.email;
      account.photoURL = user.photoURL;
      signedIn = true;
      return user;
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.log("Error", errorCode, errorMessage);

      // ...
      return "Error", errorCode, errorMessage;
    });
    
}