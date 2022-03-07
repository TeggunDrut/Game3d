function getCloser(num, num1, num2) {
  let n1 = num1 - num;
  let n2 = num2 - num;
  if (n1 < n2) {
    return true;
  } else 
    return false;
}
function placeObject(obj) {
  let numx = cameraDistance(camera).x;
  let numy = cameraDistance(camera).y;
  let numz = cameraDistance(camera).z;
  
  let newX = numx + floorWidth / 2;
  let newZ = numz + floorHeight / 2;

  let finalx = Math.ceil(newX / (45 / 4))
  let finalz = Math.ceil(newZ / (45 / 4))
  // console.log(finalx, finalz);
  
  let size = 1;
  // let geom = new THREE.BoxBufferGeometry(size, size, size);
  // let mat = new THREE.MeshBasicMaterial({ color: "yellow" });
  // let cube = new THREE.Mesh(geom, mat);

  // kinda working
  // cube.position.x = Math.ceil(-floorWidth / 2 + (finalx * (45 / 4)) + (size / 4));
  // cube.position.z = Math.ceil(-floorHeight/2 + (finalz * (45/4)) + (size / 4));
  
  // beofre one above ^
  // cube.position.z = -floorHeight/2 4a4+ (finalz * (45/4));
  // cube.position.x = (-floorWidth / 2 ) + (finalx * (45 / 4));
  
  // idk
  // cube.position.z = (-floorHeight / 2 ) + (finalz * (45 / 4));;
  
  // if (obj.shape == "box") {
  //   console.log(obj);
    
  //   console.log(box.position);
  // }
  let box = new THREE.Mesh(obj.goem, obj.mat);
  box.position.x = numx;
  box.position.y = numy;
  box.position.z = numz;
  box.receiveShadow = true;
  box.castShadow = true;
  box.name = obj.name;
  scene.add(box);
  // cube.position.x = numx;
  // cube.position.z = numz;
  console.log('asd');
  // scene.add(cube);
}
