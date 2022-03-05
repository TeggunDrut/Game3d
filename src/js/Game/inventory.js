function addHeldItemToScene() {
  let heldItem = selectedSlot.selected;
  let itemName = heldItem.name;
  
  let itemGeom = new THREE.BoxBufferGeometry(2, 2, 2);
  let itemMat = new THREE.MeshBasicMaterial({ color: "yellow" });
  let item = new THREE.Mesh(itemGeom, itemMat);

  item.position.x = 3;
  item.position.y = -5;
  item.position.z = -3;

  itemHolder.add(item);
  scene.add(itemHolder);
}
function removeHeldItems() {
  scene.remove(scene.getObjectByName("itemHolder"));
}
