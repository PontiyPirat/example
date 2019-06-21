function drawPlate(plateVec, scene) {
    let planeVec = [];
    for(let i=0;i<AllPlanes.length;i++){
        let planeVecLength = AllPlanes[i].length;
        if(AllPlanes[i][planeVecLength-1]==plateVec[0]){
            planeVec = AllPlanes[i];
        }
    }
    
    let vecLength = planeVec.length;
    let indices = [];
    let vertices = [];
    let type;
    if (vecLength == 4) {
        type = 1;
    }
    if (vecLength == 5) {
        type = 2;
    }

    let vectors = [];

    for (let i = 0; i < AllPoints.length; i++) {
        for (let j = 0; j < (vecLength - 1); j++) {
            if (planeVec[j] == AllPoints[i][3]) {
                vertices.push(AllPoints[i][0], AllPoints[i][1], AllPoints[i][2]);
                //vectors.push(new THREE.Vector3(AllPoints[i][0], AllPoints[i][1], AllPoints[i][2]));
            }
        }
    }

    indices.push(0, 1, 2);
    indices.push(1, 0, 2);
    if (type == 2) {
        indices.push(0, 1, 3);
        indices.push(1, 0, 3);
    }

    let geometry = new THREE.BufferGeometry();

    geometry.setIndex(indices);
    geometry.addAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    //geometry.addAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
    //geometry.addAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    var material = new THREE.MeshLambertMaterial({ color: 0x637da8 });
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    return mesh;
}