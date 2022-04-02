function loop() {
  if (!signedIn) {
    document.getElementById("SignInBtn").style.display = "inline-block";
    
    document.getElementById("username").style.display = "none";
    document.getElementById("photo").style.display = "none";
  } else if (signedIn) {
    document.getElementById("SignInBtn").style.display = "none";
    document.getElementById("username").style.display = "inline-block";
    document.getElementById("photo").style.display = "inline-block";
    document.getElementById("photoImg").src = account.photoURL;
    document.getElementById("username").textContent = account.username;
  }
    
  if (player.ref)
    player.ref.set({
      responding: true,
      id: player.id,
      name: player.id,
      displayName: player.displayName,
      position: {
        x: player.x,
        y: player.y,
        z: player.z,
      },
    });
  player.x = yawObject.position.x;
  player.y = yawObject.position.y;
  player.z = yawObject.position.z;

  currentHeldModel.forEach((m) => {
    m.position.x = 0;
    m.position.y = 20;
    m.position.z = 0;
  });

  if (paused) {
    document.getElementById("options").style.display = "inline-block";
    document.getElementById("topBar").style.display = "inline-block";
  } else {
    document.getElementById("options").style.display = "none";
    document.getElementById("topBar").style.display = "none";
  
  }
  // if (window.innerWidth < 1280) {
  //   return;
  // }
  // if (
  //   (player.currentHeldItem != null) ||
  //   player.currentHeldItem != undefined
  // ) {
  //   if (player.currentHeldItem.type == "weapon") {
  //     itemHolder.getObjectByName(player.currentHeldItem.name).position.x =
  //       window.innerWidth / 140 - 6;
  //     itemHolder.getObjectByName(player.currentHeldItem.name).position.y =
  //       -2;
  //     itemHolder.getObjectByName(player.currentHeldItem.name).position.z =
  //       -4;
  //     // itemHolder.position.x
  //     // console.log(itemHolder.getObject.);
  //     // itemHolder.getObjectByName(player.currentHeldItem.name).position.x =
  //     //   yawObject.position.x + window.innerWidth / 140 - 6;
  //     // itemHolder.getObjectByName(player.currentHeldItem.name).position.y =
  //     //   yawObject.position.y - 2;
  //     // itemHolder.getObjectByName(player.currentHeldItem.name).position.z =
  //     //   yawObject.position.z - 4;
  //     // itemHolder.getObjectByName(player.currentHeldItem.name).rotation.set(itemHolder.rotation.x, itemHolder.rotation.y, itemHolder.rotation.z);
  //     // itemHolder.getObjectByName(player.currentHeldItem.name).rotation.x =
  //     //   itemHolder.rotation.x;
  //     // itemHolder.getObjectByName(player.currentHeldItem.name).rotation.y = itemHolder.rotation.y;
  //     // itemHolder.getObjectByName(player.currentHeldItem.name).rotation.z =
  //     //   itemHolder.rotation.z;

  //     //   window.innerWidth / 140 - 6;
  //     // scene.getObjectByName(player.currentHeldItem.name).position.y = -2;
  //     // scene.getObjectByName(player.currentHeldItem.name).position.z = -4;
  //     //.position.copy(itemHolder.position);
  //   }
  // }
  // alert(1)

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
    if (o.type == "Group") return;
    o.object.material.color.r = o.r;
    o.object.material.color.g = o.g;
    o.object.material.color.b = o.b;
    if (o.affectedByGravity) {
      o.object.position.y -= gravity;
    }
    o.object.position.x += o.velX;
    // o.object.position.y *= gravity;
    o.object.position.z += o.velZ;

    if (o.object.position.y - o.object.geometry.parameters.height / 2 < 0) {
      o.object.position.y = o.object.geometry.parameters.height / 2;
      o.affectedByGravity = false;
    }

    worldObjects.forEach((o2) => {
      if (o2.type == "Group") return;
      if (o == o2 || o.type == "material") return;
      let obj1 = o.object;
      let obj2 = o2.object;

      if (
        obj1.position.x >
          obj2.position.x - obj2.geometry.parameters.width / 2 &&
        obj1.position.x <
          obj2.position.x + obj2.geometry.parameters.width / 2 &&
        obj1.position.z >
          obj2.position.z - obj2.geometry.parameters.depth / 2 &&
        obj1.position.z <
          obj2.position.z + obj2.geometry.parameters.depth / 2 &&
        obj1.position.y - obj1.geometry.parameters.height / 2 <
          obj2.position.y + obj2.geometry.parameters.height / 2
        //&& keyState.g obj1.position.y > obj2.position.y
      ) {
        obj2.position.y = obj1.position.y + obj2.geometry.parameters.height;
        o2.affectedByGravity = false;
      }
    });
    // console.log(o.object.position.y);
    // scene.children.forEach((child) => {
    //   if (
    //     child.type != "AmbientLight" &&
    //     child.type != "HemisphereLight" &&
    //     child.type != "SpotLight" &&
    //     child.type != "Object3D" &&
    //     child.type != "GridHelper" &&
    //     child.type != "Gridhelper" &&
    //     child.type != "Group"
    //   ) {
    //     let x = o.object.position.x;
    //     let y = o.object.position.y;
    //     let z = o.object.position.z;
    //     let sx = o.object.geometry.parameters.width;
    //     let sy = o.object.geometry.parameters.height;
    //     let sz = o.object.geometry.parameters.depth;
    //     let wx = child.position.x;
    //     let wy = child.position.y;
    //     let wz = child.position.z;
    //     let wsx = child.geometry.parameters.width;
    //     let wsy = child.geometry.parameters.height;
    //     let wsz = child.geometry.parameters.depth;

    //     if (
    //       child.name.split(",")[0] == "conveyor" &&
    //       child.uuid != o.object.uuid
    //     ) {
    //       if (
    //         o.object.position.y -
    //           o.object.geometry.parameters.height / 2 <
    //           child.position.y &&
    //           z < wz + wsz / 2 &&
    //           z > wz - wsz / 2 &&
    //         x < wx + wsx / 2 &&
    //         x > wx - wsx / 2
    //       ) {
    //         o.object.position.y =
    //           child.position.y + o.object.geometry.parameters.height / 2;
    //       }
    //     }

    //     if (child.name == "floor") {
    //       // if (
    //       //   x < wx + wsx / 2 &&
    //       //   x > wx - wsx / 2 &&
    //       //   z < wz + wsz / 2 &&
    //       //   z > wz - wsz / 2
    //       // ) {
    //       if (
    //         o.object.position.y -
    //           o.object.geometry.parameters.height / 2 <
    //         child.position.y
    //       ) {
    //         o.object.position.y =
    //           child.position.y + o.object.geometry.parameters.height / 2;
    //       }
    //     }
    //     // }
    //   }
    //   // if (
    //   //   child.position &&
    //   //   child.geometry &&
    //   //   child.paramaters &&
    //   //   o.object !== child
    //   // ) {

    //   //   // console.log(x, y, z, sx, sy, sz, wx, wy, wz, wsx, wsy, wsz);

    //   //   // if (
    //   //   //   o.object.position.y - o.object.geometry.parameters.height / 2 <
    //   //   //   child.position.y + child.geometry.parameters.height
    //   //   // ) {
    //   //   //   // alert(child.geometry.parameters.height)
    //   //   //   alert(child.name);
    //   //   //   o.object.position.y =
    //   //   //     child.position.y + o.object.geometry.parameters.height;
    //   //   // }
    //   // }
    // });

    if (
      (!o.outlined && cameraDistance(camera) != undefined) ||
      cameraDistance(camera) != null
    ) {
      // o.material.alphaMap = "grey";

      // if (!(cameraDistance(camera).object.name == "floor")) {
      if (cameraDistance(camera).object.type != "Mesh") {
        // console.log(
        //   "Player Not Looking at Mesh -> Looking at { " +
        //     cameraDistance(camera).object.type +
        //     " }"
        // );
      }
      // console.log(cameraDistance(camera).object.type);
      let lines = [];
      const material = new THREE.LineBasicMaterial({
        color: 0x0000ff,
      });
      let outerLineOff = -0.1;

      const points = [];
      //top
      let boxOutline = [
        new THREE.Vector3(
          o.object.position.x -
            o.object.geometry.parameters.width / 2 -
            outerLineOff,
          o.object.position.y +
            o.object.geometry.parameters.height / 2 +
            outerLineOff,
          o.object.position.z -
            o.object.geometry.parameters.depth / 2 -
            outerLineOff
        ),

        new THREE.Vector3(
          o.object.position.x +
            o.object.geometry.parameters.width / 2 +
            outerLineOff,
          o.object.position.y +
            o.object.geometry.parameters.height / 2 +
            outerLineOff,
          o.object.position.z -
            o.object.geometry.parameters.depth / 2 -
            outerLineOff
        ),

        new THREE.Vector3(
          o.object.position.x +
            o.object.geometry.parameters.width / 2 +
            outerLineOff,
          o.object.position.y +
            o.object.geometry.parameters.height / 2 +
            outerLineOff,
          o.object.position.z +
            o.object.geometry.parameters.depth / 2 +
            outerLineOff
        ),

        new THREE.Vector3(
          o.object.position.x -
            o.object.geometry.parameters.width / 2 -
            outerLineOff,
          o.object.position.y +
            o.object.geometry.parameters.height / 2 +
            outerLineOff,
          o.object.position.z +
            o.object.geometry.parameters.depth / 2 +
            outerLineOff
        ),

        new THREE.Vector3(
          o.object.position.x -
            o.object.geometry.parameters.width / 2 -
            outerLineOff,
          o.object.position.y +
            o.object.geometry.parameters.height / 2 +
            outerLineOff,
          o.object.position.z -
            o.object.geometry.parameters.depth / 2 -
            outerLineOff
        ),
        //bottom

        new THREE.Vector3(
          o.object.position.x -
            o.object.geometry.parameters.width / 2 -
            outerLineOff,
          o.object.position.y -
            o.object.geometry.parameters.height / 2 -
            outerLineOff,
          o.object.position.z -
            o.object.geometry.parameters.depth / 2 -
            outerLineOff
        ),

        new THREE.Vector3(
          o.object.position.x +
            o.object.geometry.parameters.width / 2 +
            outerLineOff,
          o.object.position.y -
            o.object.geometry.parameters.height / 2 -
            outerLineOff,
          o.object.position.z -
            o.object.geometry.parameters.depth / 2 -
            outerLineOff
        ),

        new THREE.Vector3(
          o.object.position.x +
            o.object.geometry.parameters.width / 2 +
            outerLineOff,
          o.object.position.y -
            o.object.geometry.parameters.height / 2 -
            outerLineOff,
          o.object.position.z +
            o.object.geometry.parameters.depth / 2 +
            outerLineOff
        ),

        new THREE.Vector3(
          o.object.position.x -
            o.object.geometry.parameters.width / 2 -
            outerLineOff,
          o.object.position.y -
            o.object.geometry.parameters.height / 2 -
            outerLineOff,
          o.object.position.z +
            o.object.geometry.parameters.depth / 2 +
            outerLineOff
        ),

        new THREE.Vector3(
          o.object.position.x -
            o.object.geometry.parameters.width / 2 -
            outerLineOff,
          o.object.position.y -
            o.object.geometry.parameters.height / 2 -
            outerLineOff,
          o.object.position.z +
            o.object.geometry.parameters.depth / 2 +
            outerLineOff
        ),
        // other vertical lines

        new THREE.Vector3(
          o.object.position.x -
            o.object.geometry.parameters.width / 2 -
            outerLineOff,
          o.object.position.y +
            o.object.geometry.parameters.height / 2 +
            outerLineOff,
          o.object.position.z +
            o.object.geometry.parameters.depth / 2 +
            outerLineOff
        ),

        new THREE.Vector3(
          o.object.position.x +
            o.object.geometry.parameters.width / 2 +
            outerLineOff,
          o.object.position.y +
            o.object.geometry.parameters.height / 2 +
            outerLineOff,
          o.object.position.z +
            o.object.geometry.parameters.depth / 2 +
            outerLineOff
        ),

        new THREE.Vector3(
          o.object.position.x +
            o.object.geometry.parameters.width / 2 +
            outerLineOff,
          o.object.position.y -
            o.object.geometry.parameters.height / 2 -
            outerLineOff,
          o.object.position.z +
            o.object.geometry.parameters.depth / 2 +
            outerLineOff
        ),

        new THREE.Vector3(
          o.object.position.x +
            o.object.geometry.parameters.width / 2 +
            outerLineOff,
          o.object.position.y -
            o.object.geometry.parameters.height / 2 -
            outerLineOff,
          o.object.position.z -
            o.object.geometry.parameters.depth / 2 -
            outerLineOff
        ),

        new THREE.Vector3(
          o.object.position.x +
            o.object.geometry.parameters.width / 2 +
            outerLineOff,
          o.object.position.y +
            o.object.geometry.parameters.height / 2 +
            outerLineOff,
          o.object.position.z -
            o.object.geometry.parameters.depth / 2 -
            outerLineOff
        ),

        new THREE.Vector3(
          o.object.position.x -
            o.object.geometry.parameters.width / 2 -
            outerLineOff,
          o.object.position.y +
            o.object.geometry.parameters.height / 2 +
            outerLineOff,
          o.object.position.z -
            o.object.geometry.parameters.depth / 2 -
            outerLineOff
        ),

        new THREE.Vector3(
          o.object.position.x -
            o.object.geometry.parameters.width / 2 -
            outerLineOff,
          o.object.position.y -
            o.object.geometry.parameters.height / 2 -
            outerLineOff,
          o.object.position.z -
            o.object.geometry.parameters.depth / 2 -
            outerLineOff
        ),

        new THREE.Vector3(
          o.object.position.x -
            o.object.geometry.parameters.width / 2 -
            outerLineOff,
          o.object.position.y -
            o.object.geometry.parameters.height / 2 -
            outerLineOff,
          o.object.position.z +
            o.object.geometry.parameters.depth / 2 +
            outerLineOff
        ),
      ];

      boxOutline.forEach((p) => {
        points.push(p);
      });
      const geometry = new THREE.BufferGeometry().setFromPoints(points);

      const line = new THREE.Line(geometry, material);
      line.name = "outlineObjectLine" + o.id;
      // scene.add(line);
      // console.log(o.id, o.outlined);
      // }
    }
    if (
      (cameraDistance(camera).object == o.object &&
        cameraDistance(camera) != undefined) ||
      cameraDistance(camera) != null
    ) {
      o.outlined = true;
    } else {
      scene.remove(scene.getObjectByName("outlineObjectLine" + o.id));
      o.outlined = false;
    }
    if (o.type == "material") {
      let prevVelX = o.velX;
      let prevVelZ = o.velZ;
      worldObjects.forEach((wo) => {
        if (wo.type == "Group") return;
        let x = o.object.position.x;
        let y = o.object.position.y;
        let z = o.object.position.z;
        let sx = o.object.geometry.parameters.width;
        let sy = o.object.geometry.parameters.height;
        let sz = o.object.geometry.parameters.depth;

        let wx = wo.object.position.x;
        let wy = wo.object.position.y;
        let wz = wo.object.position.z;
        let wsx = wo.object.geometry.parameters.width;
        let wsy = wo.object.geometry.parameters.height;
        let wsz = wo.object.geometry.parameters.depth;

        let woName = wo.object.name.split(",")[0];

        if (woName != "MapObject" && woName != null && woName != "") {
          if (inBetweenFunc(o.object, wo.object) && y - sy / 2 < wy + wsy / 2) {
            // o.object.position.y =
            //   wo.object.position.y +
            //   wo.object.geometry.parameters.height / 2;
            if (wo.blockLogic && o.object != wo.object) {
              if (wo.blockLogic.direction) {
                if (wo.blockLogic.direction == "north") {
                  o.velZ = -wo.blockLogic.speed;
                  // worldObjects.forEach((o2) => {
                  //   if (o2.blockLogic && o2 != wo)
                  //     if (o2.blockLogic.blockType == "conveyor") {
                  //       o.onConveyor = true;
                  //       console.log('as12312d');
                  //     } else {
                  //       console.log(o.onConveyor);
                  //       o.onConveyoor = false;
                  //     }
                  // });
                } else if (wo.blockLogic.direction == "south") {
                  o.velZ = wo.blockLogic.speed;
                }
                if (wo.blockLogic.direction == "east") {
                  o.velX = -wo.blockLogic.speed;
                } else if (wo.blockLogic.direction == "west") {
                  o.velX = wo.blockLogic.speed;
                }
              }
            }
          } else {
            // o.velZ *= 0.01;
            // o.velY = -gravity;
          }
        }
      });
    }
    // if (o.blockLogic)
    //   switch (o.blockLogic.blockType) {
    //     case "conveyor":
    //       worldObjects.forEach((wo) => {
    //         console.log(wo);
    //         if (wo.type == "material") {
    //           console.log("material");
    //         }
    //       });

    //       break;
    //   }
    o.object.position.x += o.velX * delta;
    // o.object.position.y += o.velY * delta * 90; // 90 is gravity or something idk
    // o.object.position.y -= gravity;
    o.object.position.z += o.velZ * delta;
  });
  // console.log(cameraDistance(camera));
}
