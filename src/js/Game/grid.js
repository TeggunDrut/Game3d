function drawGrid() {
  let x = 0 - floorWidth / 2;
  let y = 0 - floorHeight / 2;
  let off = 16;

  let points = [];

  for (let i = 0; i < floorWidth; i += off) {
    // for (let j = 0; j < floorHeight; j += off) {
    //   points.push(new THREE.Vector3(i, 10, j));
    //   points.push(new THREE.Vector3(floorWidth, 10, floorHeight));
    //   // points.push(new THREE.Vector3(floorWidth, 4, floorHeight));
    //   const material = new THREE.LineBasicMaterial({
    //     color: 0x0000ff,
    //   });
    //   const geometry = new THREE.BufferGeometry().setFromPoints(points);

    //   const line = new THREE.Line(geometry, material);
    //   line.name = 'gridLine';
    //   scene.add(line);
    // }
  }
}
