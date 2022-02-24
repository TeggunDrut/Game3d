function collidingWithRect(mesh) {
  let playerX = yawObject.position.x;
  let playerY = yawObject.position.y - 30;
  let playerZ = yawObject.position.z;
  let geom = new THREE.BoxGeometry(mesh.scaleX, mesh.scaleY, mesh.scaleZ);
  let mat = new THREE.MeshBasicMaterial({ color: mesh.color });
  let m = new THREE.Mesh(geom, mat);
  let x = floor.position.x - floorWidth / 2 + mesh.x + mesh.scaleX / 2;
  let y = m.position.y;
  let z = (m.position.z =
    floor.position.z - floorHeight / 2 + mesh.z + mesh.scaleZ / 2);
  let s = true;
  // if (playerY < mesh.y) {
  //   s = false;
  // } else {
  //   s = true;
  // }
  if (
    playerY > y - mesh.scaleY / 2 &&
    playerY < y + mesh.scaleY &&
    // playerY + player.height < y - mesh.scaleY &&
    playerX < x + mesh.scaleX / 2 &&
    playerX > x - mesh.scaleX / 2 &&
    playerZ < z + mesh.scaleZ / 2 &&
    playerZ > z - mesh.scaleZ / 2
  ) {
    // velocity.y = 0;
    s = false;
    
    return "ontop";
  } else
    s = true;

  
  if (
    playerX > x - mesh.scaleX / 2 - 3 &&
    playerX < x - mesh.scaleX / 2 + 3 &&
    playerZ < z + mesh.scaleZ / 2 &&
    playerZ > z - mesh.scaleZ / 2 &&
    playerY < y + mesh.scaleY &&
    s
    // !(playerY > y + mesh.scaleY)
  )
    return "right";
  if (
    playerX < x + mesh.scaleX / 2 + 3 &&
    playerX > x + mesh.scaleX / 2 - 3 &&
    playerZ < z + mesh.scaleZ / 2 &&
    playerZ > z - mesh.scaleZ / 2 &&
    playerY < y + mesh.scaleY && s
    // !(playerY > y + mesh.scaleY)
  ) {
    return "left";
  }

  if (
    playerZ < z + mesh.scaleZ / 2 &&
    playerZ > z - mesh.scaleZ / 2 - 3 &&
    playerX > x - mesh.scaleX / 2 &&
    playerX < x + mesh.scaleX / 2 &&
    playerY < y + mesh.scaleY && s
    // !(playerY > y + mesh.scaleY)
  ) {
    return "top";
  }
  if (
    playerZ > z - mesh.scaleZ / 2 - 3 &&
    playerZ < z + mesh.scaleZ / 2 + 3 &&
    playerX > x - mesh.scaleX / 2 &&
    playerX < x + mesh.scaleX / 2 &&
    playerY < y + mesh.scaleY && s
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
