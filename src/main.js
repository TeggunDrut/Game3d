const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdddddd);
scene.add(new THREE.AxesHelper(500));

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.y = player.height + 3;

const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 2.3;


document.body.appendChild(renderer.domElement);

camera.rotation.order = "YXZ";
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0xff0090ff });

var groundGeometry = new THREE.BoxGeometry();
var groundMaterial = new THREE.MeshBasicMaterial({ color: "green" });
var cube = new THREE.Mesh(boxGeometry, boxMaterial);
var ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.scale.x = 10;
ground.scale.z = 10;
ground.position.y = -2;

var hemlight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 4);
scene.add(hemlight);

let spotlight = new THREE.SpotLight(0xffa95c, 4);
spotlight.castShadow = true;
scene.add(spotlight);

var direction = new THREE.Vector3();
let distance = 0.1;

scene.add(cube);
scene.add(ground);
camera.position.z = 5;

ground.receiveShadow = true;
cube.castShadow = true;

function animate() {
  requestAnimationFrame(animate);

  spotlight.position.set(camera.position.x + 10, camera.position.y + 10, camera.position.z + 10)

  // camera.rotation.x = 12.5;
  camera.getWorldDirection(direction);
  if (keyState.a || keyState.A) {
    camera.translateX(-distance);
  }
  if (keyState.d || keyState.D) {
    camera.translateX(distance);
  }
  if (keyState.w || keyState.W) {
    camera.translateZ(-distance);
  }
  if (keyState.s || keyState.S) {
    camera.translateZ(distance);
  }
  if (keyState.Space) {
    camera.position.y += distance;
  }
  if (keyState.Shift) {
    camera.position.y -= 0.1;
  }

  // if (keyState.e) {
  //   camera.rotateY(0.01);
  // }
  // if (keyState.q) {
  //   camera.rotateY(-0.01);
  // }
  // if (keyState.r) {
  //   camera.rotateX(0.01);
  // }
  // if (keyState.f) {
  //   camera.rotateX(-0.01);
  // }
  renderer.render(scene, camera);
}
animate();
