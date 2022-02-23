// canvas.requestPointerLock =
//   canvas.requestPointerLock || canvas.mozRequestPointerLock;

// document.exitPointerLock =
//   document.exitPointerLock || document.mozExitPointerLock;

// canvas.onclick = function () {
//   canvas.requestPointerLock();
// };

// // pointer lock event listeners

// // Hook pointer lock state change events for different browsers
// document.addEventListener("pointerlockchange", lockChangeAlert, false);
// document.addEventListener("mozpointerlockchange", lockChangeAlert, false);

// function updatePosition(e) {
//   mouseX = prevPositionX;
//   mouseY = prevPositionY;
//   newPosX = e.clientX - prevPositionX;
//   newPosY = prevPositionY - e.clientY;
//   // let diff = (newPosX - prevX) / 1000;
//   let diffX = e.movementX / -1000;
//   let diffY = e.movementY / -1000;

//   let movementX = e.movementX || e.mozMovementX || e.webkitMovementX || 0;
//   let movementY = e.movementY || e.mozMovementY || e.webkitMovementY || 0;

//   camera.rotation.x -= movementY / 500;
//   camera.rotation.y -= movementX / 500;

//   // camera.rotateY(diffX); // left and right
//   // console.log(newPosX, newPosY, prevX, prevY);
//   // if (newPosX > prevX) {
//   //   camera.rotateY(-diffX)
//   // }
//   // if (newPosX < prevX) {
//   //   camera.rotateY(-diffX)
//   // }
//   // if (newPosY > prevY) {
//   //   camera.rotateX(-diffY)
//   // }
//   // if (newPosY < prevY) {
//   //   camera.rotateX(diffY)
//   // }
//   prevX = newPosX;
//   prevY = newPosY;
// }

// function lockChangeAlert() {
//   if (
//     document.pointerLockElement === canvas ||
//     document.mozPointerLockElement === canvas
//   ) {
//     console.log("The pointer lock status is now locked");
//     document.addEventListener("mousemove", updatePosition, false);
//   } else {
//     console.log("The pointer lock status is now unlocked");
//     document.removeEventListener("mousemove", updatePosition, false);
//   }
// }
