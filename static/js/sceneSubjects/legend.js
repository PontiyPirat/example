function drawLegendRec(height, width, scene) {
    let geometry = new THREE.BufferGeometry();
    let indices = [];
    let vertices = [];
    let colors = [];

    //6 вершин, по которым будет построено четыре треугольника для перехода между тремя цветами
    vertices.push(0, 0, 0);
    vertices.push(width, 0, 0);
    vertices.push(0, height/2, 0);
    vertices.push(width, height/2, 0);
    vertices.push(0, height, 0);
    vertices.push(width, height, 0);

    colors.push(0, 0, 1);
    colors.push(0, 0, 1);
    colors.push(1, 1, 1);
    colors.push(1, 1, 1);
    colors.push(1, 0, 0);
    colors.push(1, 0, 0);


    indices.push(0, 1, 2);
    indices.push(2, 1, 3);
    indices.push(2, 3, 4);
    indices.push(5, 4, 3);

    geometry.setIndex(indices);
    geometry.addAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.addAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    let material = new THREE.MeshBasicMaterial({
        vertexColors: THREE.VertexColors
    });
    let mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    return mesh;
}

function drawLegendTicks(height,width,numTicks,scene){
    let geometry = new THREE.BufferGeometry();
    let indices = [];
    let vertices = [];

    let deltaHeight = height/(numTicks-1);

    let index=0;
    for(let i=0;i<numTicks;i++){
        vertices.push(0,i*deltaHeight-0.1,0.1);
        vertices.push(0,i*deltaHeight+0.1,0.1);
        vertices.push(width+0.1,i*deltaHeight,0.1);
        indices.push(index+1,index,index+2);
        index+=3;
    }

    geometry.setIndex(indices);
    geometry.addAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    let material = new THREE.MeshLambertMaterial({
        color: 0x000000
    });

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    return mesh;
}

function drawLegendText(minVal, maxVal, height, width, numTicks, font, fontSize, scene) {
    let deltaVal, deltaHeight;
    deltaVal = (maxVal-minVal)/(numTicks-1);
    deltaHeight = height/(numTicks-1);
    let textMeshes = [];
    let material = new THREE.MeshBasicMaterial({
        color: 0x0000ff
    });
    for(let i=0;i<numTicks;i++){
        let val = minVal+i*deltaVal;
        val = val.toExponential(2);
        let geometry = new THREE.TextGeometry(val.toString(), {
            font: font,
            size: fontSize,
            height: 0.1,
        });
        let mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(width+0.3,i*deltaHeight,0);
        scene.add(mesh);
        textMeshes.push(mesh);
    }

    return textMeshes;
}