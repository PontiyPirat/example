function drawTriangle(pointsVec, scene) {
    let localPointsVec = [];
    for(let i=0;i<pointsVec.length;i++){
        localPointsVec.push([pointsVec[i][0],pointsVec[i][1]]);
    }
    localPointsVec.push([pointsVec[0][0],pointsVec[0][1]]);
    console.log(localPointsVec);
    let triangleShape = new THREE.Shape(localPointsVec);

    //let geometry = new THREE.Geometry();
    let geometry =new THREE.ShapeBufferGeometry( triangleShape );
    let material = new THREE.MeshLambertMaterial({
        color: 0x0000ff
    });
    // //let length = pointsVec.length*3;
    // //var vertices = new Float32Array(length);
    // for (let i = 0; i < pointsVec.length; i++) {
    //    // for(let j=0;j<3;j++){
    //     //    vertices[i*pointsVec.length+j]=pointsVec[i][j];
    //    // }
    //     geometry.vertices.push(new THREE.Vector3(pointsVec[i][0],pointsVec[i][1],pointsVec[i][2]));
    // }
    
    // //console.log(vertices);
    // //geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    // geometry.faces.push( new THREE.Face3( 0, 1, 2) );
    // geometry.computeFaceNormals();
    var color = 0xf08000;
    var mesh = new THREE.Line(geometry, new THREE.MeshPhongMaterial( { color: color, side: THREE.DoubleSide } ));
    scene.add(mesh);
    return mesh;
}