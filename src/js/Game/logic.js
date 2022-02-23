function collidingWithRect(mesh) {
  let playerX = yawObject.position.x;
  let playerZ = yawObject.position.z;
  let geom = new THREE.BoxGeometry(mesh.scaleX, mesh.scaleY, mesh.scaleZ);
  let mat = new THREE.MeshBasicMaterial({ color: mesh.color });
  let m = new THREE.Mesh(geom, mat);
  let x = floor.position.x - floorWidth / 2 + mesh.x + mesh.scaleX / 2;
  let z = (m.position.z =
    floor.position.z - floorHeight / 2 + mesh.z + mesh.scaleZ / 2);

  if (
    playerX > x - mesh.scaleX / 2 - 3 &&
    playerX < x - mesh.scaleX / 2 &&
    playerZ < z + mesh.scaleZ / 2 &&
    playerZ > z - mesh.scaleZ / 2
  )
    return "right";
  if (
    playerX < x + mesh.scaleX / 2 + 3 &&
    playerX > x  + mesh.scaleX / 2 &&
    playerZ < z + mesh.scaleZ / 2 &&
    playerZ > z - mesh.scaleZ / 2
  ) {
    return "left";
  }

  if (
    playerZ < z &&
    playerZ > z - mesh.scaleZ / 2 - 3 &&
    playerX > x - mesh.scaleX / 2 &&
    playerX < x + mesh.scaleX / 2
  ) {
    return "top";
  }
  if (
    playerZ > z &&
    playerZ < z + mesh.scaleZ / 2 + 3 &&
    playerX > x - mesh.scaleX / 2 &&
    playerX < x + mesh.scaleX / 2
  ) {
    return "bottom";
  }
}

function playerCollisionWithWallLeft() {
  let floorX = floor.position.x - floorWidth / 2;
  let floorZ = floor.position.z - floorHeight / 2;
  let x = yawObject.position.x;
  let z = yawObject.position.z;

  if (x < floorX) {
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

  if (x > floorX + floorWidth) {
    return true;
  } else {
    return false;
  }
}

function playerCollisionWithWallTop() {
  let floorX = floor.position.x - floorWidth / 2;
  let floorZ = floor.position.z - floorHeight / 2;
  let x = yawObject.position.x;
  let z = yawObject.position.z;

  if (z < floorZ) {
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

  if (z > floorZ + floorHeight) {
    return true;
  } else {
    return false;
  }
}
