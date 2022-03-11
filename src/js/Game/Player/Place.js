function getCloser(num, num1, num2) {
  let n1 = num1 - num;
  let n2 = num2 - num;
  if (n1 < n2) {
    return true;
  } else return false;
}
function placeObject(obj) {
  let names = cameraDistance(camera).object.name.split(",");

  let numx = cameraDistance(camera).point.x;
  let numy = cameraDistance(camera).point.y;
  let numz = cameraDistance(camera).point.z;

  let newX = numx + floorWidth / 2;
  let newZ = numz + floorHeight / 2;

  let finalx = Math.ceil(newX / (45 / 4));
  let finalz = Math.ceil(newZ / (45 / 4));
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
  let geom = new THREE.BoxBufferGeometry(obj.scaleX, obj.scaleY, obj.scaleZ);
  console.log(obj);
  let mat = new THREE.MeshBasicMaterial({color: `rgb(${obj.red}, ${obj.green}, ${obj.blue})`});

  let box = new THREE.Mesh(geom, mat);
  box.position.x = numx;
  box.position.y = numy + obj.scaleY / 2;
  box.position.z = numz;
  box.receiveShadow = true;
  box.castShadow = true;
  let id = Math.ceil(Math.random() * 1721272);
  worldObjects.forEach((o) => {
    console.log(o.id, o);
    if (o.id == id) {
      console.log("asd");
      id = Math.ceil(Math.random() * 1721272);
    }
  });
  box.name = obj.blockType + "," + id;

  let cameraObject = cameraDistance(camera).object;
  if (cameraObject.name !== "floor") {
    if (
      numy ==
      cameraObject.position.y + cameraObject.geometry.parameters.height / 2
    ) {
      box.position.x = cameraObject.position.x;
      box.position.y =
        cameraObject.position.y + cameraObject.geometry.parameters.height;
      box.position.z = cameraObject.position.z;
      worldObjects.push({
        object: box,
        outlined: false,
        id: id,
        r: box.material.color.r,
        g: box.material.color.g,
        b: box.material.color.b,
      });
      scene.add(box);
    }
    if (
      numy ==
      cameraObject.position.y - cameraObject.geometry.parameters.height / 2
    ) {
      box.position.x = cameraObject.position.x;
      box.position.y =
        cameraObject.position.y - cameraObject.geometry.parameters.height;
      box.position.z = cameraObject.position.z;
      worldObjects.push({
        object: box,
        outlined: false,
        id: id,
        r: box.material.color.r,
        g: box.material.color.g,
        b: box.material.color.b,
      });
      scene.add(box);
    }
    if (
      numx ==
      cameraObject.position.x + cameraObject.geometry.parameters.width / 2
    ) {
      box.position.x =
        cameraObject.position.x + cameraObject.geometry.parameters.width;
      box.position.y = cameraObject.position.y;
      box.position.z = cameraObject.position.z;
      worldObjects.push({
        object: box,
        outlined: false,
        id: id,
        r: box.material.color.r,
        g: box.material.color.g,
        b: box.material.color.b,
      });
      scene.add(box);
    }
    if (
      numx ==
      cameraObject.position.x - cameraObject.geometry.parameters.width / 2
    ) {
      box.position.x =
        cameraObject.position.x - cameraObject.geometry.parameters.width;
      box.position.y = cameraObject.position.y;
      box.position.z = cameraObject.position.z;
      worldObjects.push({
        object: box,
        outlined: false,
        id: id,
        r: box.material.color.r,
        g: box.material.color.g,
        b: box.material.color.b,
      });
      scene.add(box);
    }
    if (
      numz ==
      cameraObject.position.z - cameraObject.geometry.parameters.depth / 2
    ) {
      box.position.x = cameraObject.position.x;
      box.position.y = cameraObject.position.y;
      box.position.z =
        cameraObject.position.z - cameraObject.geometry.parameters.depth;
      worldObjects.push({
        object: box,
        outlined: false,
        id: id,
        r: box.material.color.r,
        g: box.material.color.g,
        b: box.material.color.b,
      });
      scene.add(box);
    }
    if (
      numz ==
      cameraObject.position.z + cameraObject.geometry.parameters.depth / 2
    ) {
      box.position.x = cameraObject.position.x;
      box.position.y = cameraObject.position.y;
      box.position.z =
        cameraObject.position.z + cameraObject.geometry.parameters.depth;
      worldObjects.push({
        object: box,
        outlined: false,
        id: id,
        r: box.material.color.r,
        g: box.material.color.g,
        b: box.material.color.b,
      });
      scene.add(box);
    }
    // alert(cameraObject.scale.x + " " + cameraObject.scale.y + " " + cameraObject.scale.z)
    // alert(numz + " " + cameraObject.position.z + cameraObject.scale.z);
  } else {
    worldObjects.push({
      object: box,
      outlined: false,
      id: id,
      r: box.material.color.r,
      g: box.material.color.g,
      b: box.material.color.b,
    });
    scene.add(box);
  }

  // cube.position.x = numx;
  // cube.position.z = numz;
  // scene.add(cube);
}
