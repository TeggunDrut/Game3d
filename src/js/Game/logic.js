function collidingWithRect(mesh) {
  let playerX = yawObject.position.x;
  let playerY = yawObject.position.y - 30;
  let playerZ = yawObject.position.z;
  let geom = new THREE.BoxGeometry(mesh.scaleX, mesh.scaleY, mesh.scaleZ);
  let mat = new THREE.MeshBasicMaterial({ color: mesh.color });
  let m = new THREE.Mesh(geom, mat);
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
    yawObject.position.y += (y - yawObject.position.y) - 3;
  }
  if (
    playerY > y - mesh.scaleY / 2 &&
    playerY < y + mesh.scaleY &&
    // playerY + player.height < y - mesh.scaleY &&
    playerX - wallDistOff + 3< x + mesh.scaleX / 2 &&
    playerX + wallDistOff - 3> x - mesh.scaleX / 2 &&
    playerZ - wallDistOff + 3< z + mesh.scaleZ / 2 &&
    playerZ + wallDistOff - 3> z - mesh.scaleZ / 2
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
    console.log('asd');
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
