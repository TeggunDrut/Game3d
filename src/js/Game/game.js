let clock = new THREE.Clock();
let delta = 0;
function loop() {
  delta = clock.getDelta();
  if (playerCollisionWithWallTop()) {
    yawObject.position.z = floor.position.z - floorHeight / 2 + wallDistOff;
    // velocity.x -= direction.x * currentSpeed * delta;
  } else if (playerCollisionWithWallBottom()) {
    yawObject.position.z = floor.position.z + floorHeight / 2 - wallDistOff;
    // velocity.x -= direction.x * currentSpeed * delta;
  }
  if (playerCollisionWithWallLeft()) {
    yawObject.position.x = floor.position.x - floorWidth / 2 + wallDistOff;
    // velocity.x -= direction.x * currentSpeed * delta;
  } else if (playerCollisionWithWallRight()) {
    yawObject.position.x = floor.position.x + floorWidth / 2 - wallDistOff;
    // velocity.x -= direction.x * currentSpeed * delta;
  }
  currentMap.forEach((box) => {
    let geom = new THREE.BoxGeometry(box.scaleX, box.scaleY, box.scaleZ);
    let mat = new THREE.MeshBasicMaterial({ color: box.color });
    let m = new THREE.Mesh(geom, mat);
    m.position.x = floor.position.x - floorWidth / 2 + box.x + box.scaleX / 2;
    m.position.y = box.y + box.scaleY / 2;
    m.position.z = floor.position.z - floorHeight / 2 + box.z + box.scaleZ / 2;
    if (collidingWithRect(box) == "ontop") {
      velocity.y = 0;
      canJump = true;
      yawObject.position.y = box.y + box.scaleY + player.height;
      // pitchObject.position.y = box.y + player.height / 2w;
    } else {
      if (collidingWithRect(box) == "right") {
        yawObject.position.x = m.position.x - box.scaleX / 2 - wallDistOff;
      }
      if (collidingWithRect(box) == "left") {
        yawObject.position.x = m.position.x + box.scaleX / 2 + wallDistOff;
      }
      if (collidingWithRect(box) == "top") {
        yawObject.position.z = m.position.z - box.scaleZ / 2 - wallDistOff;
      }
      if (collidingWithRect(box) == "bottom") {
        yawObject.position.z = m.position.z + box.scaleZ / 2 + wallDistOff;
      }
    }
  });
  prevPlayerY = yawObject.position.y;
  // ui
  if (paused) document.getElementById("options").style.display = "inline-block";
  else document.getElementById("options").style.display = "none";

  // combat
  // alert(pitchObject.rotation.x + " " + pitchObject.rotation.y + " " + pitchObject.rotation.z );
  // if (yawObject.rotation.y > .14) {
  //   alert(1);
  // }
  let slots = [];
  let slot1 = document.getElementById("slot1");
  let slot2 = document.getElementById("slot2");
  let slot3 = document.getElementById("slot3");
  let slot4 = document.getElementById("slot4");
  let slot5 = document.getElementById("slot5");
  let slot6 = document.getElementById("slot6");
  let slot7 = document.getElementById("slot7");

  slots.push(slot1, slot2, slot3, slot4, slot5, slot6, slot7);
  if(!paused)
    switch (selectedSlot.id) {
      case 1:
        slots.forEach((slot) => {
          slot.classList.remove("selected");
        });
        slot1.classList.add("selected");

        // alert(1)
        break;
      case 2:
        slots.forEach((slot) => {
          slot.classList.remove("selected");
        });
        slot2.classList.add("selected");
        // alert(1)
        break;
      case 3:
        slots.forEach((slot) => {
          slot.classList.remove("selected");
        });
        slot3.classList.add("selected");
        // alert(1)
        break;
      case 4:
        slots.forEach((slot) => {
          slot.classList.remove("selected");
        });
        slot4.classList.add("selected");
        // alert(1)
        break;
      case 5:
        slots.forEach((slot) => {
          slot.classList.remove("selected");
        });
        slot5.classList.add("selected");
        // alert(1)
        break;
      case 6:
        slots.forEach((slot) => {
          slot.classList.remove("selected");
        });
        slot6.classList.add("selected");
        // alert(1)
        break;
      case 7:
        slots.forEach((slot) => {
          slot.classList.remove("selected");
        });
        slot7.classList.add("selected");
        // alert(1)
        break;
  }

  bullets.forEach((bullet) => {
    // bullet.b.position.copy(yawObject.getWorldPosition(distance));
    // bullet.b.quaternion.copy(camera.quaternion);
    // bullet.b.position.add(distance.multiplyScalar(10));
    bullet.b.translateZ(-100 * delta);
    // console.log(camera.getWorldPosition(distance));
  });
  itemHolder.position.x = yawObject.position.x;
  itemHolder.position.z = yawObject.position.z;
  itemHolder.position.y = yawObject.position.y;

  if (isCloseTo(yawObject, { position: { x: 0, z: 0 } }, 100)) {
    
  }
  if (cameraDistance(camera) < player.placeDistance*10) {
    player.placeable = true;
  }
  // console.log(cameraDistance(camera));
}
