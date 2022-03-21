function addHeldItemToScene() {
  let heldItem = selectedSlot.selected;
  let itemName = heldItem.name;
  // let itemGeom = new THREE.BoxBufferGeometry(
  //   heldItem.scaleX,
  //   heldItem.scaleY,
  //   heldItem.scaleZ
  // );
  let itemGeom = new THREE.BoxBufferGeometry(
    2,
    2,
    2
  );
  let itemMat = new THREE.MeshBasicMaterial({
    color: `rgb(${heldItem.red}, ${heldItem.green}, ${heldItem.blue})`,
  });
  let item = new THREE.Mesh(itemGeom, itemMat);
  item.name = itemName;
  console.log(item);
  if (heldItem.scaleX > 2) item.geometry.parameters.width = 2;
  if (heldItem.scaleY > 2) item.geometry.parameters.height = 2;
  if (heldItem.scaleZ > 2) item.geometry.parameters.depth = 2;
  item.position.x = (window.innerWidth / 140) - 6;
  item.position.y = -2;
  item.position.z = -4;

  itemHolder.add(item);
  scene.add(itemHolder);
}
function removeHeldItems() {
  itemHolder.children = [];
  scene.remove(scene.getObjectByName("itemHolder"));
  console.log(scene.getObjectByName("itemHolder"));
}
