function drawForceBound(forceVec, scene) {
    let pointBegin, dir;
    for (let i = 0; i < AllPoints.length; i++) {
        if (AllPoints[i][3] == forceVec[3]) {
            pointBegin = new THREE.Vector3(AllPoints[i][0], AllPoints[i][1], AllPoints[i][2]);
        }
    }
    let color = 0xff0000;
    let length = Math.sqrt(forceVec[0]*forceVec[0]+forceVec[1]*forceVec[1]+forceVec[2]*forceVec[2]);
    dir = new THREE.Vector3(forceVec[0], forceVec[1], forceVec[2]);
    dir = dir.normalize();
    var forceBoundMesh = new THREE.ArrowHelper(dir, pointBegin, length, color);
    scene.add(forceBoundMesh);
    return forceBoundMesh;
}

function drawKinBound(kinVec, scene) {
    let point;
    for (let i = 0; i < AllPoints.length; i++) {
        if (AllPoints[i][3] == kinVec[3]) {
            point = new THREE.Vector3(AllPoints[i][0], AllPoints[i][1], AllPoints[i][2]);
        }
    }
    let geometry = new THREE.Geometry();
    let material = new THREE.PointsMaterial({ size: 15 });
    geometry.vertices.push(point);
    let pointMesh = new THREE.Points(geometry, material);
    scene.add(pointMesh);
    return pointMesh;
}