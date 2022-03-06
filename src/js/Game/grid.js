let points = [];
function drawGrid() {
  let x = 0 - floorWidth / 2;
  let y = 0 - floorHeight / 2;
  let off = 10;
  let xOff = 0 - floorWidth / 2;
  let yOff = 0 - floorHeight / 2;


  for (let i = 0; i < floorWidth; i += off) {
    for (let j = 0; j < floorHeight; j += off) {
      points.push(new THREE.Vector3(xOff, 10, yOff));
      points.push(new THREE.Vector3(floorWidth, 10, floorHeight));
      // points.push(new THREE.Vector3(floorWidth, 4, floorHeight));
      const material = new THREE.LineBasicMaterial({
        color: 0x0000ff,
      });
      const geometry = new THREE.BufferGeometry().setFromPoints(points);

      const line = new THREE.Line(geometry, material);
      line.name = 'gridLine';
      points = [];
      scene.add(line);
      xOff += off;
      yOff += off;
      console.log(`xOff`, xOff);
    }
  }
  for (let i = -(floorWidth / 2); i < floorWidth / 2; i += off) {
    
    points.push(new THREE.Vector3(i, 10, -floorWidth / 2));
    points.push(new THREE.Vector3(xOff, 10, floorHeight / 2));
    console.log(points);
    // points.push(new THREE.Vector3(-floorWidth / 2, 10, yOff));
    // points.push(new THREE.Vector3(floorWidth / 2, 10, yOff));
    // points.push(new THREE.Vector3(floorWidth, 4, floorHeight));
    const material = new THREE.LineBasicMaterial({
      color: 0x0000ff,
    });
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const line = new THREE.Line(geometry, material);
    line.name = "gridLine";
    // line.castShadow = true;
    // line.receiveShadow = true;
    scene.add(line)
    console.log(points);
    xOff += off;
    yOff += off;
    // points = [];
  }
  
  xOff = 0;
  yOff = 0;
  console.log(scene.children);
}
