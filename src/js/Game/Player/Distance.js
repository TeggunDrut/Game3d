function getDistance(x1, x2, z1, z2) {
  let dist = Math.sqrt((x2 - x1) * (x2 - x1) + (z2 - z1) * (z2 - z1));
  return dist;
}
function isCloseTo(obj1, obj2, amount) {
  let dist = getDistance(
    obj1.position.x,
    obj1.position.z,
    obj2.position.x,
    obj2.position.z
  );
  if (dist < amount) {
    return true;
  } else {
    return false;
  }
}
// const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function onPointerMove(event) {
  // calculate pointer position in normalized device coordinates
  // (-1 to +1) for both components

  // pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  // pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  pointer.x = camera.position.x;
  pointer.y = camera.position.y;
}
window.addEventListener("pointermove", onPointerMove);

function cameraDistance(camera, point) {
  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(scene.children);

  for (let i = 0; i < intersects.length; i++) {
    if (intersects[0].object.name == "floor") {
      console.log(intersects[0].distance);
      return intersects[0].distance;
    }
  }
}
