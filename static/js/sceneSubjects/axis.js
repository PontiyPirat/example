function drawAxis(size, scene) {
    let startPoint = new THREE.Vector3(0, 0, 0);
    let length = size;
    let hex = 0x0000ff;
    let arrowsMeshes = [];
    for (let i = 0; i < 3; i++) {
        let endPoint = new THREE.Vector3(0, 0, 0);
        endPoint.setComponent(i, size);
        arrowsMeshes.push(new THREE.ArrowHelper(endPoint, startPoint, length, hex));
        scene.add(arrowsMeshes[i]);
    }
    return arrowsMeshes;
}

function drawAxisText(sizeAxis, font, scene){
    var mesh1, mesh2, mesh3;
    var geometry = new THREE.TextGeometry('X', {
      font: font,
      size: 0.5,
      height: 0.1,
    });

    var material = new THREE.MeshLambertMaterial({
      color: 0x0000ff
    });
    mesh1 = new THREE.Mesh(geometry, material);
    mesh1.position.set(sizeAxis, 0, 0);

    scene.add(mesh1);

    geometry = new THREE.TextGeometry('Y', {
      font: font,
      size: 0.5,
      height: 0.1,
    });
    mesh2 = new THREE.Mesh(geometry, material);
    mesh2.position.set(0, sizeAxis, 0);

    scene.add(mesh2);

    geometry = new THREE.TextGeometry('Z', {
      font: font,
      size: 0.5,
      height: 0.1,
    });
    mesh3 = new THREE.Mesh(geometry, material);
    mesh3.position.set(0, 0, sizeAxis);

    scene.add(mesh3);

    return [mesh1, mesh2, mesh3];
}