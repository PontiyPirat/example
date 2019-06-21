function drawBeam(beamVec, scene) {
  let lineInd = beamVec[0];
  let point1Ind, point2Ind;
  let lineVec = [];
  let begin, end;
  let thickness = 0.5;
  for (let i = 0; i < AllStrLines.length; i++) {
    if (lineInd == AllStrLines[i][2]) {
      point1Ind = AllStrLines[i][0];
      point2Ind = AllStrLines[i][1];
    }
  }
  lineVec[0] = point1Ind;
  lineVec[1] = point2Ind;
  for (let i = 0; i < AllPoints.length; i++) {
    if (lineVec[0] == AllPoints[i][3]) {
      begin = new THREE.Vector3(
        AllPoints[i][0],
        AllPoints[i][1],
        AllPoints[i][2]
      );
    }
    if (lineVec[1] == AllPoints[i][3]) {
      end = new THREE.Vector3(
        AllPoints[i][0],
        AllPoints[i][1],
        AllPoints[i][2]
      );
    }
  }

  //вспомогательные величины
  var length = begin.distanceTo(end);
  var direction = new THREE.Vector3(
    end.x - begin.x,
    end.y - begin.y,
    end.z - begin.z
  );
  var center = new THREE.Vector3(
    +begin.x + +(direction.x / 2),
    +begin.y + +(direction.y / 2),
    +begin.z + +(direction.z / 2)
  );
  var def = new THREE.Vector3(0, 1, 0);
  //формирование mesh типа цилиндр
  var geometry = new THREE.CylinderGeometry(
    thickness,
    thickness,
    length,
    20,
    20,
    false,
    2
  );
  var material = new THREE.MeshLambertMaterial({ color: 0x637da8});
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.copy(center);
  //блок для поворота цилиндра в соответствии с его началом и концом
  direction = direction.normalize();
  var skal = direction.dot(def);
  if (direction.x != 0 || direction.z != 0) {
    var angle = -Math.acos(skal);
    var vecround = new THREE.Vector3();
    vecround.crossVectors(direction, def);
    vecround.normalize();
    mesh.rotateOnAxis(vecround, angle);
  } else if (direction.y == 0) {
    mesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI);
  }
  scene.add(mesh);
  return mesh;
}
