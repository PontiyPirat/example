function SceneManager(canvas, type) {

  CAM_DISTANCE = 15;

  //размеры области отрисовки для задания aspectRatio камеры
  const screenDimensions = {
    width: canvas.width,
    height: canvas.height
  };

  //тип визулизации: 0 - визуализация условия, 1 - визуализация решения. 
  //на данный момент для визуализации решения отменен показ точек, т.к. в решении их значительно больше из-за дискретизации
  const typeViz = type;

  //Основные элементы главного холста
  const scene = buildScene();
  const renderer = buildMainRender(canvas);
  const camera = buildMainCamera(screenDimensions);
  const controls = buildControler();
  const light = new GeneralLights(scene);


  //Основные элементы дополнительного холста для отрисовки координатного угла
  const axisContainer = document.getElementById('inset'); //Дополнительный холст крепится к блоку div
  const subScene = new THREE.Scene();
  const renderSize = window.innerWidth/5;
  const subRenderer = buildSubRender(axisContainer, renderSize, renderSize);
  const subCamera = new THREE.PerspectiveCamera(50, 1, 1, 1000);
  /////Блок, отвечающий за координатный угол/////
  const sizeAxis = 5;
  var axisMeshes = buildAxis(sizeAxis, font, subScene);
  //Mesh'и, отвечающие за обозначения осей координатного угла

  //Основные элементы дополнительного холста для отрисовки легенды
  if(type==1){
    var legendContainer = document.getElementById('legend'); //Дополнительный холст крепится к блоку div
    var legendScene = new THREE.Scene();
    var legendRenderer = buildSubRender(legendContainer, legendWidth, legendHeight);
    var legendCamera = new THREE.OrthographicCamera( 0, 5, 21, -1, 1, 10 );
    legendCamera.position.set(0, 0, 2);
    var legendMeshes = [];
  }
  


  /////Блок функций, используемых выше/////
  function buildScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#969696");
    return scene;
  }
  function buildMainRender(canvas) {
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: false,
      antialias: true
    });

    return renderer;
  }
  function buildSubRender(container, width, height) {
    let localRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    localRenderer.setSize(width, height);
    container.appendChild(localRenderer.domElement);
    return localRenderer;
  }
  function buildMainCamera({ width, height }) {
    let aspectRatio = width / height;
    let fieldOfView = 10;
    let nearPlane = 1;
    let farPlane = 1000000;

    let camera = new THREE.PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane
    );
    camera.position.set(-20, 20, 200);
    return camera;
  }
  function buildControler() {
    const controls = new THREE.OrbitControls(camera, canvas);
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 3.2;

    return controls;
  }
  function buildLegend(minVal, maxVal, height, width, numTicks, font, fontSize, sceneVar) {
    //let legendMeshes = [];
    legendMeshes.push(drawLegendRec(height, width, sceneVar));
    legendMeshes.push(drawLegendTicks(height, width, numTicks, sceneVar));
    legendMeshes.push(drawLegendText(minVal, maxVal, height, width, numTicks, font, fontSize, sceneVar));
    //return legendMeshes;
  }
  function buildAxis(sizeAxis, font, scene) {
    let axisMeshes = [];
    axisMeshes.push(drawAxis(sizeAxis, scene));
    axisMeshes.push(drawAxisText(sizeAxis, font, scene));
    return axisMeshes;
  }


  if (type == 0) {
    //Объект для добавления функции выделения объектов на холсте
    var raycaster;
    raycaster = new THREE.Raycaster();
    //Добавление слушателя на движения мыши
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    function onDocumentMouseMove(event) {
      //event.preventDefault();
      raycastBeams(event);
      raycastLines(event);
      //raycast(event, linesArr,INTERSECTED_LINES);
    }

    var INTERSECTED = {
      beams: null,
      lines: null
    };
    function raycastBeams(event) {
      var mouse = new THREE.Vector2();
      var array = getMousePosition(canvas, event.clientX, event.clientY);
      mouse.fromArray(array);
      //Выделенные объекты из массива тех, которые указаны в аргументе
      var intersects = getIntersects(mouse, beamsArr);
      if (intersects.length > 0) {
        if (INTERSECTED.beams != intersects[0].object) {
          if (INTERSECTED.beams) INTERSECTED.beams.material.emissive.setHex(INTERSECTED.beams.currentHex);
          INTERSECTED.beams = intersects[0].object;
          INTERSECTED.beams.currentHex = INTERSECTED.beams.material.emissive.getHex();
          INTERSECTED.beams.material.emissive.setHex(0xff0000);

          let text = "Выделен объект: стрежень<br>Индекс: ";
          document.getElementById("info").innerHTML = text;
        }
      } else {
        if (INTERSECTED.beams) INTERSECTED.beams.material.emissive.setHex(INTERSECTED.beams.currentHex);
        INTERSECTED.beams = null;
        document.getElementById("info").innerHTML = "Информация";
      }
    }
    function raycastLines(event) {
      var mouse = new THREE.Vector2();
      var array = getMousePosition(canvas, event.clientX, event.clientY);
      mouse.fromArray(array);
      //Выделенные объекты из массива тех, которые указаны в аргументе
      var intersects = getIntersects(mouse, linesArr);
      if (intersects.length > 0) {
        if (INTERSECTED.lines != intersects[0].object) {
          if (INTERSECTED.lines) INTERSECTED.lines.material.emissive.setHex(INTERSECTED.lines.currentHex);
          INTERSECTED.lines = intersects[0].object;
          INTERSECTED.lines.currentHex = INTERSECTED.lines.material.emissive.getHex();
          INTERSECTED.lines.material.emissive.setHex(0xff0000);

          let text = "Выделен объект: стрежень<br>Индекс: ";
          document.getElementById("info").innerHTML = text;
        }
      } else {
        if (INTERSECTED.lines) INTERSECTED.lines.material.emissive.setHex(INTERSECTED.lines.currentHex);
        INTERSECTED.lines = null;
        document.getElementById("info").innerHTML = "Информация";
      }
    }
    function getMousePosition(dom, x, y) {
      var rect = dom.getBoundingClientRect();
      return [(x - rect.left) / rect.width, (y - rect.top) / rect.height];
    };
    function getIntersects(point, objects) {
      point.set((point.x * 2) - 1, - (point.y * 2) + 1);
      raycaster.setFromCamera(point, camera);
      return raycaster.intersectObjects(objects);
    };
  }


  //Существенные объекты отрисовки
  var pointsArr = [];
  var linesArr = [];
  var beamsArr = [];
  var planesArr = [];
  var platesArr = [];
  var forceArr = [];
  var kinArr = [];

  //Геттеры
  this.getPointsArr = function () {
    return pointsArr;
  }
  this.getLinesArr = function () {
    return linesArr;
  }
  this.getPlanesArr = function () {
    return planesArr;
  }
  this.getBeamsArr = function () {
    return beamsArr;
  }
  this.getPlatesArr = function () {
    return platesArr;
  }
  this.getLegendsMeshes = function () {
    return this.legendMeshes;
  }
  this.getAxisMeshes = function () {
    return this.axisMeshes;
  }

  //Отчистка сцены от всех объектов определенного типа
  this.removePoints = function () {
    let numPoints = pointsArr.length;
    for (let i = 0; i < numPoints; i++) {
      scene.remove(pointsArr.pop());
    }
  };
  this.removeLines = function () {
    let numLines = linesArr.length;
    for (let i = 0; i < numLines; i++) {
      scene.remove(linesArr.pop());
    }
  };
  this.removeBeams = function () {
    let numBeams = beamsArr.length;
    for (let i = 0; i < numBeams; i++) {
      scene.remove(beamsArr.pop());
    }
  };
  this.removePlanes = function () {
    console.log('hmm');
    let numPlanes = planesArr.length;
    for (let i = 0; i < numPlanes; i++) {
      scene.remove(planesArr.pop());
    }
  }
  this.removePlates = function () {
    let numPlates = platesArr.length;
    for (let i = 0; i < numPlates; i++) {
      scene.remove(platesArr.pop());
    }
  }
  this.removeForces = function () {
    let numForces = forceArr.length;
    for (let i = 0; i < numForces; i++) {
      scene.remove(forceArr.pop());
    }
  }
  this.removeKins = function () {
    let numKins = kinArr.length;
    for (let i = 0; i < numKins; i++) {
      scene.remove(kinArr.pop());
    }
  }
  this.removeLegend = function(){
    for(let i=0;i<numTicks;i++){
      legendScene.remove(legendMeshes[2][i]);
    }
    legendScene.remove(legendMeshes[1]);
    legendScene.remove(legendMeshes[0]);
    legendMeshes = [];
  }

  //Добавление объекта определенного типа к сцене
  this.addPoint = function (pointVec) {
    let pointMesh = drawPoint(pointVec, pointSize, scene);
    pointsArr.push(pointMesh);

    return true;
  };
  this.addLine = function (lineVec) {
    let lineMesh;
    if (typeViz == 0) {
      lineMesh = drawLine(lineVec, scene);
    } else {
      lineMesh = drawLineModColor(lineVec, scene);
    }
    linesArr.push(lineMesh);

    return true;
  };
  this.addPlane = function (planeVec) {
    let vecLength = planeVec.length;
    if (vecLength > 5 || vecLength < 4) {
      return false;
    } else {
      let planeMesh = drawPlane(planeVec, vecLength, scene);
      planesArr.push(planeMesh);
    }
    if (planesArr[planesArr.length - 1] == false) {
      planesArr.pop();
    }
    return true;
  }
  this.addPlate = function (plateVec) {
    let plateMesh = drawPlate(plateVec, scene);
    platesArr.push(plateMesh);
    return true;
  };
  this.addBeam = function (beamVec) {
    let beamMesh = drawBeam(beamVec, scene);
    beamsArr.push(beamMesh);

    return true;
  };
  this.addForce = function (forceVec) {
    let forceMesh = drawForceBound(forceVec, scene);
    forceArr.push(forceMesh);

    return true;
  }
  this.addKin = function (kinVec) {
    let kinMesh = drawKinBound(kinVec, scene);
    kinArr.push(kinMesh);

    return true;
  }
  this.addLegend = function(minFuncMod, maxFuncMod){
    buildLegend(minFuncMod, maxFuncMod, 20, 1, numTicks, font, fontSize, legendScene);
    //return localVar;
  }
  //Прорисовка всех объектов определенного типа, взятых из main.js
  this.drawAllPoints = function () {
    for (let i = 0; i < AllPoints.length; i++) {
      this.addPoint(AllPoints[i]);
    }
    return true;
  };
  this.drawAllLines = function () {
    for (let i = 0; i < AllStrLines.length; i++) {
      this.addLine(AllStrLines[i]);
    }

    return true;
  };
  this.drawAllBeams = function () {
    for (let i = 0; i < AllBeams.length; i++) {
      this.addBeam(AllBeams[i]);
    }
    return true;
  };
  this.drawAllPlanes = function () {
    for (let i = 0; i < AllPlanes.length; i++) {
      this.addPlane(AllPlanes[i]);
    }
    return true;
  };
  this.drawAllPlates = function () {
    for (let i = 0; i < AllPlates.length; i++) {
      this.addPlate(AllPlates[i]);
    }
    return true;
  };
  this.drawAllForces = function () {
    for (let i = 0; i < PointForces.length; i++) {
      this.addForce(PointForces[i]);
    }
    return true;
  }
  this.drawAllKins = function () {
    for (let i = 0; i < PointDiss.length; i++) {
      this.addKin(PointDiss[i]);
    }
    return true;
  }

  //Перезагрузка сцены(включает все отчистки и прорисовки)
  this.reDrawLegend = function(minFuncMod, maxFuncMod){
    if(legendMeshes.length!=0){
      this.removeLegend();
    }
    this.addLegend(minFuncMod, maxFuncMod);
  }
  this.refresh = function () {
    this.cleanScene();
    if (typeViz == 0) {
      this.drawAllPoints();
      this.drawAllPlanes();
      this.drawAllPlates();
      this.drawAllForces();
      this.drawAllKins();
    }
    this.drawAllLines();
    this.drawAllBeams();
  };
  //Отчиска всей сцены полностью
  this.cleanScene = function () {
    this.removePoints();
    this.removeLines();
    this.removeBeams();
    this.removePlanes();
    this.removePlates();
    this.removeForces();
    this.removeKins();
  };
  //Обновление сцены, происходящее каждый кадр
  this.update = function () {
    if (pause) {
      controls.enabled = false;
      controls.rotate = false;
      resizeCanvas();
    } else {
      controls.enabled = true;
      controls.rotate = true;
      controls.update();
      //Задание положение дополнительной камеры для сохранения положения координатного угла
      subCamera.position.copy(camera.position);
      subCamera.position.setLength(CAM_DISTANCE);
      subCamera.lookAt(subScene.position);

      // if (xyzMeshes) {
      for (let i = 0; i < axisMeshes[1].length; i++) {
        axisMeshes[1][i].lookAt(subCamera.position);
      }
      // }
      
      renderer.render(scene, camera);
      subRenderer.render(subScene, subCamera);
      
      if (type == 1) {
        legendRenderer.render(legendScene, legendCamera);
      }

    }

  };

  //
  this.onWindowResize = function () {
    const { width, height } = canvas;

    screenDimensions.width = width;
    screenDimensions.height = height;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
  };
}
