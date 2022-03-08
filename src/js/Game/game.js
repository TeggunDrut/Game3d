let clock = new THREE.Clock();
let delta = 0;
function loop() {
  
  if (window.innerWidth < 1280) {
    return;
  }
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
  if (!paused)
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

  if (gameConsole.open) {
    document.getElementById("console").style.display = "inline-block";
  } else {
    document.getElementById("console").style.display = "none";
  }

  worldObjects.forEach((o) => {
    if (cameraDistance(camera) == undefined)
      return;
    // console.log(o);
    // console.log(o.object.material.color.r, o.r);
    o.object.material.color.r = o.r;
    o.object.material.color.g = o.g;
    o.object.material.color.b = o.b;
    if (!o.outlined && cameraDistance(camera) != undefined || cameraDistance(camera) != null) {
      // o.material.alphaMap = "grey";
      
      
      // if (!(cameraDistance(camera).object.name == "floor")) {
      if (cameraDistance(camera).object.type != "Mesh") {
        console.log("Player Not Looking at Mesh -> Looking at { " + cameraDistance(camera).object.type + " }");
      }
      // console.log(cameraDistance(camera).object.type);
      let lines = [];
      const material = new THREE.LineBasicMaterial({
        color: 0x0000ff,
      });
      let outerLineOff = -0.10;

      const points = [];
      //top
      let boxOutline = [
        new THREE.Vector3(
          o.object.position.x -
            o.object.geometry.parameters.width / 2 -
            outerLineOff,
          o.object.position.y + o.object.geometry.parameters.height / 2 + outerLineOff,
          o.object.position.z -
            o.object.geometry.parameters.depth / 2 -
            outerLineOff
        ),

        new THREE.Vector3(
          o.object.position.x +
            o.object.geometry.parameters.width / 2 +
            outerLineOff,
          o.object.position.y + o.object.geometry.parameters.height / 2 + outerLineOff,
          o.object.position.z -
            o.object.geometry.parameters.depth / 2 -
            outerLineOff
        ),

        new THREE.Vector3(
          o.object.position.x +
            o.object.geometry.parameters.width / 2 +
            outerLineOff,
          o.object.position.y + o.object.geometry.parameters.height / 2 + outerLineOff,
          o.object.position.z +
            o.object.geometry.parameters.depth / 2 +
            outerLineOff
        ),

        new THREE.Vector3(
          o.object.position.x -
            o.object.geometry.parameters.width / 2 -
            outerLineOff,
          o.object.position.y + o.object.geometry.parameters.height / 2 + outerLineOff,
          o.object.position.z +
            o.object.geometry.parameters.depth / 2 +
            outerLineOff
        ),

        new THREE.Vector3(
          o.object.position.x -
            o.object.geometry.parameters.width / 2 -
            outerLineOff,
          o.object.position.y + o.object.geometry.parameters.height / 2 + outerLineOff,
          o.object.position.z -
            o.object.geometry.parameters.depth / 2 -
            outerLineOff
        ),
        //bottom

        new THREE.Vector3(
          o.object.position.x -
            o.object.geometry.parameters.width / 2 -
            outerLineOff,
          o.object.position.y - o.object.geometry.parameters.height / 2 - outerLineOff,
          o.object.position.z -
            o.object.geometry.parameters.depth / 2 -
            outerLineOff
        ),

        new THREE.Vector3(
          o.object.position.x +
            o.object.geometry.parameters.width / 2 +
            outerLineOff,
          o.object.position.y - o.object.geometry.parameters.height / 2 - outerLineOff,
          o.object.position.z -
            o.object.geometry.parameters.depth / 2 -
            outerLineOff
        ),

        new THREE.Vector3(
          o.object.position.x +
            o.object.geometry.parameters.width / 2 +
            outerLineOff,
          o.object.position.y - o.object.geometry.parameters.height / 2 - outerLineOff,
          o.object.position.z +
            o.object.geometry.parameters.depth / 2 +
            outerLineOff
        ),

        new THREE.Vector3(
          o.object.position.x -
            o.object.geometry.parameters.width / 2 -
            outerLineOff,
          o.object.position.y - o.object.geometry.parameters.height / 2 - outerLineOff,
          o.object.position.z +
            o.object.geometry.parameters.depth / 2 +
            outerLineOff
        ),

        new THREE.Vector3(
          o.object.position.x -
            o.object.geometry.parameters.width / 2 -
            outerLineOff,
          o.object.position.y - o.object.geometry.parameters.height / 2 - outerLineOff,
          o.object.position.z +
            o.object.geometry.parameters.depth / 2 +
            outerLineOff
        ),
        // other vertical lines

        new THREE.Vector3(
          o.object.position.x -
            o.object.geometry.parameters.width / 2 -
            outerLineOff,
          o.object.position.y + o.object.geometry.parameters.height / 2 + outerLineOff,
          o.object.position.z +
            o.object.geometry.parameters.depth / 2 +
            outerLineOff
        ),

        new THREE.Vector3(
          o.object.position.x +
            o.object.geometry.parameters.width / 2 +
            outerLineOff,
          o.object.position.y + o.object.geometry.parameters.height / 2 + outerLineOff,
          o.object.position.z +
            o.object.geometry.parameters.depth / 2 +
            outerLineOff
        ),

        new THREE.Vector3(
          o.object.position.x +
            o.object.geometry.parameters.width / 2 +
            outerLineOff,
          o.object.position.y - o.object.geometry.parameters.height / 2 - outerLineOff,
          o.object.position.z +
            o.object.geometry.parameters.depth / 2 +
            outerLineOff
        ),

        new THREE.Vector3(
          o.object.position.x +
            o.object.geometry.parameters.width / 2 +
            outerLineOff,
          o.object.position.y - o.object.geometry.parameters.height / 2 - outerLineOff,
          o.object.position.z -
            o.object.geometry.parameters.depth / 2 -
            outerLineOff
        ),

        new THREE.Vector3(
          o.object.position.x +
            o.object.geometry.parameters.width / 2 +
            outerLineOff,
          o.object.position.y + o.object.geometry.parameters.height / 2 + outerLineOff,
          o.object.position.z -
            o.object.geometry.parameters.depth / 2 -
            outerLineOff
        ),

        new THREE.Vector3(
          o.object.position.x -
            o.object.geometry.parameters.width / 2 -
            outerLineOff,
          o.object.position.y + o.object.geometry.parameters.height / 2 + outerLineOff,
          o.object.position.z -
            o.object.geometry.parameters.depth / 2 -
            outerLineOff
        ),

        new THREE.Vector3(
          o.object.position.x -
            o.object.geometry.parameters.width / 2 -
            outerLineOff,
          o.object.position.y - o.object.geometry.parameters.height / 2 - outerLineOff,
          o.object.position.z -
            o.object.geometry.parameters.depth / 2 -
            outerLineOff
        ),

        new THREE.Vector3(
          o.object.position.x -
            o.object.geometry.parameters.width / 2 -
            outerLineOff,
          o.object.position.y - o.object.geometry.parameters.height / 2 - outerLineOff,
          o.object.position.z +
            o.object.geometry.parameters.depth / 2 +
            outerLineOff
        ),
      ];

      boxOutline.forEach(p => {
        points.push(p);
      })
      const geometry = new THREE.BufferGeometry().setFromPoints(points);

      const line = new THREE.Line(geometry, material);
      line.name = "outlineObjectLine" + o.id;
      // scene.add(line);
      // console.log(o.id, o.outlined);
      // }
    }
    if (cameraDistance(camera).object == o.object && cameraDistance(camera) != undefined || cameraDistance(camera) != null) {
      o.outlined = true;
    } else {
      scene.remove(scene.getObjectByName("outlineObjectLine" + o.id));
      o.outlined = false;
    }
  });

  // console.log(cameraDistance(camera));
}
