function drawLine(lineVec, scene) {
    let point1;
    let point2;
    for (let i = 0; i < AllPoints.length; i++) {
        if (lineVec[0] == AllPoints[i][3]) {
            point1 = new THREE.Vector3(AllPoints[i][0], AllPoints[i][1], AllPoints[i][2])
        }
        if (lineVec[1] == AllPoints[i][3]) {
            point2 = new THREE.Vector3(AllPoints[i][0], AllPoints[i][1], AllPoints[i][2])
        }
    }
    let lineGeom = new THREE.Geometry();
    let lineMaterial = new THREE.MeshLambertMaterial({
        color: 0x0000ff
    });
    lineGeom.vertices.push(point1);
    lineGeom.vertices.push(point2);
    var lineMesh = new THREE.Line(lineGeom, lineMaterial);
    scene.add(lineMesh);
    return lineMesh;
}

function drawLineColor(lineVec, scene) {
    let point1;
    let point2;
    let indexPoint1, indexPoint2;
    for (let i = 0; i < AllPoints.length; i++) {
        if (lineVec[0] == AllPoints[i][3]) {
            point1 = new THREE.Vector3(AllPoints[i][0], AllPoints[i][1], AllPoints[i][2]);
            indexPoint1 = i;
        }
        if (lineVec[1] == AllPoints[i][3]) {
            point2 = new THREE.Vector3(AllPoints[i][0], AllPoints[i][1], AllPoints[i][2]);
            indexPoint2 = i;
        }
    }
    let lineGeom = new THREE.Geometry();
    let lineMaterial = new THREE.MeshBasicMaterial({ vertexColors: THREE.VertexColors });

    lineGeom.vertices.push(point1);
    lineGeom.vertices.push(point2);
    let color1 = [0, 0, 0];
    let color2 = [0, 0, 0];
    for (let i = 0; i < 3; i++) {
        color1[i] = scaleFuncToRGB(AllFuncValues[indexPoint1][i], i);
        color2[i] = scaleFuncToRGB(AllFuncValues[indexPoint2][i], i);
    }
    lineGeom.colors.push(new THREE.Color('rgb(' + color1[0] + ',' + color1[1] + ',' + color1[2] + ')'));
    lineGeom.colors.push(new THREE.Color('rgb(' + color2[0] + ',' + color2[1] + ',' + color2[2] + ')'));
    var lineMesh = new THREE.Line(lineGeom, lineMaterial);
    scene.add(lineMesh);
    return lineMesh;
}

function drawLineModColor(lineVec, scene) {
    let indexPoint1 = lineVec[0];
    let indexPoint2 = lineVec[1];
    let point1;
    let point2;
    point1 = new THREE.Vector3(AllPoints[indexPoint1][0], AllPoints[indexPoint1][1], AllPoints[indexPoint1][2]);
    point2 = new THREE.Vector3(AllPoints[indexPoint2][0], AllPoints[indexPoint2][1], AllPoints[indexPoint2][2]);

    let lineGeom = new THREE.Geometry();
    let lineMaterial = new THREE.MeshBasicMaterial({ vertexColors: THREE.VertexColors });

    lineGeom.vertices.push(point1);
    lineGeom.vertices.push(point2);
    
    lineGeom.colors.push(new THREE.Color('rgb(' + AllColors[indexPoint1][0] + ','+AllColors[indexPoint1][1]+',' + AllColors[indexPoint1][2] + ')'));
    lineGeom.colors.push(new THREE.Color('rgb(' + AllColors[indexPoint2][0] + ','+AllColors[indexPoint2][1]+',' + AllColors[indexPoint2][2] + ')'));

    var lineMesh = new THREE.Line(lineGeom, lineMaterial);
    scene.add(lineMesh);
    return lineMesh;
}

function GetLineLength(LNum) {
    var found = false;
    var pn1 = -1;
    var pn2 = -1;
    for (ind = 0; ind < AllStrLines.length; ind++) {
        if (AllStrLines[ind][2] == LNum) {
            pn1 = AllStrLines[ind][0];
            pn2 = AllStrLines[ind][1];
            ind = AllStrLines.length;
            found = true;
        }
    }
    if (!found) return -1;
    var x1 = 0;
    var y1 = 0;
    var x1 = 0;
    var x2 = 0;
    var y2 = 0;
    var z2 = 0;
    found = false;
    for (ind = 0; ind < AllPoints.length; ind++) {
        if (AllPoints[ind][3] == pn1) {
            x1 = AllPoints[ind][0];
            y1 = AllPoints[ind][1];
            z1 = AllPoints[ind][2];
            ind = AllPoints.length;
            found = true;
        }
    }
    if (!found) return -1;
    found = false;
    for (ind = 0; ind < AllPoints.length; ind++) {
        if (AllPoints[ind][3] == pn2) {
            x2 = AllPoints[ind][0];
            y2 = AllPoints[ind][1];
            z2 = AllPoints[ind][2];
            ind = AllPoints.length;
            found = true;
        }
    }
    if (!found) return -1;
    var Leng = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) + (z1 - z2) * (z1 - z2));
    return Leng;
}
