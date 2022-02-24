
function loop() {
  if (playerCollisionWithWallTop()) {
    yawObject.position.z = floor.position.z - floorHeight / 2;
    // velocity.x -= direction.x * currentSpeed * delta;
  } else if (playerCollisionWithWallBottom()) {
    yawObject.position.z = floor.position.z + floorHeight / 2;
    // velocity.x -= direction.x * currentSpeed * delta;
  }
  if (playerCollisionWithWallLeft()) {
    yawObject.position.x = floor.position.x - floorWidth / 2;
    // velocity.x -= direction.x * currentSpeed * delta;
  } else if (playerCollisionWithWallRight()) {
    yawObject.position.x = floor.position.x + floorWidth / 2;
    // velocity.x -= direction.x * currentSpeed * delta;
  }
  map1.forEach((box) => {
    let geom = new THREE.BoxGeometry(box.scaleX, box.scaleY, box.scaleZ);
    let mat = new THREE.MeshBasicMaterial({ color: box.color });
    let m = new THREE.Mesh(geom, mat);
    m.position.x = floor.position.x - floorWidth / 2 + box.x + box.scaleX / 2;
    m.position.y = box.y + box.scaleY / 2;
    m.position.z = floor.position.z - floorHeight / 2 + box.z + box.scaleZ / 2;
    if (collidingWithRect(box) == "ontop") {
      velocity.y = 0;
      console.log(canJump);
      canJump = true;
      console.log(box.scaleY,  box.y, player.height);
      yawObject.position.y = box.y + box.scaleY + player.height;
    } else {
      if (collidingWithRect(box) == "right") {
        yawObject.position.x = m.position.x - box.scaleX / 2 - 3;
      }
      if (collidingWithRect(box) == "left") {
        yawObject.position.x = m.position.x + box.scaleX / 2 + 3;
      }
      if (collidingWithRect(box) == "top") {
        yawObject.position.z = m.position.z - box.scaleZ / 2 - 3;
      }
      if (collidingWithRect(box) == "bottom") {
        yawObject.position.z = m.position.z + box.scaleZ / 2 + 3;
      }
    }
  });
}
