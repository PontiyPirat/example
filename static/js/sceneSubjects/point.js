function drawPoint(pointVec, size, scene) {
  var positions = new Float32Array([pointVec[0], pointVec[1], pointVec[2]]);
  var colors = new Float32Array(3);
  var color = new THREE.Color();
  color.setHSL(344, 0.76, 0.74);
  color.toArray(colors, 0);
  var sizes = new Float32Array([size]);
  var geometry = new THREE.BufferGeometry();
  geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.addAttribute('customColor', new THREE.BufferAttribute(colors, 3));
  geometry.addAttribute('size', new THREE.BufferAttribute(sizes, 1));

  // var pointsGeom = new THREE.Geometry();
  // var pointsMaterial = new THREE.PointsMaterial({ size: 3 });
  // var pointToDraw = new THREE.Vector3(pointVec[0], pointVec[1], pointVec[2]);
  // pointsGeom.vertices.push(pointToDraw);
  
  var material = new THREE.ShaderMaterial({
    uniforms: {
      color: { value: new THREE.Color(0xffffff) },
      texture: { value: new THREE.TextureLoader().load("disc.png") }
    },
    vertexShader: document.getElementById('vertexshader').textContent,
    fragmentShader: document.getElementById('fragmentshader').textContent,
    alphaTest: 0.9
  });
  var pointsMesh = new THREE.Points(geometry, material);
  scene.add(pointsMesh);
  return pointsMesh;
}



// function GetPointIndex(ind, AllPoints) {
//     for (index = 0; index < AllPoints.length; index++) {
//         if (AllPoints[index][3] == ind) {
//             return index;
//         }
//     }
//     return -1;
// }

function DelPoints(AllPoints) {
  let pBeg = $("#PtDelBeg").val();
  let pEnd = $("#PtDelEnd").val();

  if (pBeg === "" || pEnd === "" || pBeg < 0 || pEnd < 0 || pBeg > pEnd) {
    alert("Неверный ввод");
    return false;
  }

  pBeg = Number(pBeg);
  pEnd = Number(pEnd);

  for (let i = 0; i < AllPoints.length;) {
    if (AllPoints[i][3] >= pBeg && AllPoints[i][3] <= pEnd) {
      AllPoints.splice(i, 1);
    } else {
      i++;
    }
  }

  return true;
}
