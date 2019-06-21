function readPointCoord(AllPoints, pointX, pointY, pointZ, pointN) {
  //   if (pointX == 0 && pointY == 0 && pointZ == 0 && pointN == 0) {
  //     alert("Нулевая точка уже существует или неверный ввод");
  //     return false;
  //   }

  let AllPointsLen = AllPoints.length;
  for (let index = 0; index < AllPointsLen; index++) {
    if (pointN == AllPoints[index][3]) {
      alert("Точка с таким номером уже существует");
      return false;
    }
    if (
      pointX == AllPoints[index][0] &&
      pointY == AllPoints[index][1] &&
      pointZ == AllPoints[index][2]
    ) {
      alert("Такая точка уже существует. Ее номер " + AllPoints[index][3]);
      return false;
    }
  }

  pointVec = [pointX, pointY, pointZ, pointN];
  AllPoints.unshift(pointVec);

  return true;
}

function readPointsDel() {
  let Pbeg = document.getElementById("PtDelBeg").value;
  let Pend = document.getElementById("PtDelEnd").value;

  if (Pbeg === "" || Pend === "" || Pbeg < 0 || Pend < 0 || Pbeg > Pend) {
    alert("Неверный ввод");
    return false;
  }
}

function readLine2Pt(AllStrLines, pBeg, pEnd, lN) {
  let ptN1 = -1;
  let ptN2 = -1;
  let point1 = new THREE.Vector3();
  let point2 = new THREE.Vector3();
  for (let index = 0; index < AllPoints.length; index++) {
    if (pBeg == AllPoints[index][3]) {
      ptN1 = pBeg;
      point1.x = AllPoints[index][0];
      point1.y = AllPoints[index][1];
      point1.z = AllPoints[index][2];
    }
    if (pEnd == AllPoints[index][3]) {
      ptN2 = pEnd;
      point2.x = AllPoints[index][0];
      point2.y = AllPoints[index][1];
      point2.z = AllPoints[index][2];
    }
  }
  if (ptN1 < 0) {
    alert("Номер первой точки неправильный");
    return false;
  }
  if (ptN2 < 0) {
    alert("Номер второй точки неправильный");
    return false;
  }
  for (let index = 0; index < AllStrLines.length; index++) {
    if (lN == AllStrLines[index][2]) {
      alert("Линия с таким номером уже существует");
      return false;
    }
    if (pBeg == AllStrLines[index][0] && pEnd == AllStrLines[index][1]) {
      alert("Такая линия уже существует. Ее номер " + AllStrLines[index][2]);
      return false;
    }
    if (pBeg == AllStrLines[index][1] && pEnd == AllStrLines[index][0]) {
      alert("Такая линия уже существует. Ее номер " + AllStrLines[index][2]);
      return false;
    }
  }
  let lineLength = Math.sqrt((point1.x-point2.x)*(point1.x-point2.x)+(point1.y-point2.y)*(point1.y-point2.y)+(point1.z-point2.z)*(point1.z-point2.z));
  let StraightLine = [ptN1, ptN2, lN];
  AllStrLines.unshift(StraightLine);
  //alert("Линия введена. Всего линий " + AllStrLines.length);
  return true;
}

function delLines(lnBeg, lnEnd) {
  let lengthLinesArr = AllStrLines.length;
  let newAllStrLines = [];
  for (let i = 0; i < lengthLinesArr; i++) {
    if (lnBeg <= AllStrLines[i][2] && lnEnd >= AllStrLines[i][2]) {
      continue;
    }
    newAllStrLines.push(AllStrLines[i]);
  }
  AllStrLines = newAllStrLines;
  sceneManager.removeLines();
  sceneManager.drawAllLines(AllStrLines);
}

function delBeams(beamBeg, beamEnd) {
  let lengthBeamsArr = AllBeams.length;
  let newAllBeams = [];
  for (let i = 0; i < lengthBeamsArr; i++) {
    if (beamBeg <= AllBeams[i][3] && beamEnd >= AllBeams[i][3]) {
      continue;
    }
    newAllBeams.push(AllBeams[i]);
  }
  AllBeams = newAllBeams;
  sceneManager.removeBeams();
  sceneManager.drawAllBeams(AllBeams);
}

function readPlane(AllPlanes, pointVec) {
  let arrLength = pointVec.length;
  //массив для проверки наличия необходимых точек
  let checkArr = [];
  //векторы из начала координат в соответсвующие точки
  let vectors = [];
  //заполнение checkArr и vectors
  for (let i = 0; i < AllPoints.length; i++) {
    for (let j = 0; j < (arrLength - 1); j++) {
      if (pointVec[j] == AllPoints[i][3]) {
        vectors.push(new THREE.Vector3(AllPoints[i][0], AllPoints[i][1], AllPoints[i][2]));
        checkArr.push(pointVec[j]);
      }
    }
  }
  //если количество подходящих не равно заявленному, то ошибка ввода
  if (checkArr.length != (arrLength - 1)) {
    alert('Нет необходимых точек!');
    return false;
  }
  //векторы с началом в первой найденной точке
  let directions = [];
  //заполнение массива directions
  for (let i = 1; i < vectors.length; i++) {
    directions.push(new THREE.Vector3(vectors[i].x - vectors[0].x, vectors[i].y - vectors[0].y, vectors[i].z - vectors[0].z));
  }
  //тип вводимой плоскости(из трех точек либо из четырех)
  let type;
  if (arrLength == 4) {
    type = 1;
  }
  if (arrLength == 5) {
    type = 2;
  }
  let planeToAdd = [];
  //если из трех точек, то необходимо проверить, что они не на одной прямой
  if (type == 1) {
    let vecCross = new THREE.Vector3();
    vecCross.crossVectors(directions[0], directions[1]);
    if (vecCross.x == 0 && vecCross.y == 0 && vecCross.z == 0) {
      alert('Точки на одной прямой!');
      return false;
    }
    planeToAdd = pointVec;
  }
  //если из четырех, то проверки на следующее: на одной прямой, в одной плоскости, поиск общего ребра для построения двух треугольников
  if (type == 2) {
    let vecCrossArr = [];
    vecCrossArr.push(new THREE.Vector3());
    vecCrossArr.push(new THREE.Vector3());
    vecCrossArr.push(new THREE.Vector3());
    let vecCross3 = new THREE.Vector3();
    vecCrossArr[0].crossVectors(directions[0], directions[1]);
    vecCrossArr[1].crossVectors(directions[0], directions[2]);
    vecCrossArr[2].crossVectors(directions[1], directions[2]);
    vecCross3.crossVectors(vecCrossArr[0], vecCrossArr[1]);
    if (vecCross3.x != 0 && vecCross3.y != 0 && vecCross3.z != 0) {
      alert('Точки лежат не в одной плоскости!');
      return false;
    }
    for (let i = 0; i < 3; i++) {
      if (vecCrossArr[i].x == 0 && vecCrossArr[i].y == 0 && vecCrossArr[i].z == 0) {
        alert('Точки лежат на одной прямой!');
        return false;
      }
    }
    console.log(checkArr);
    planeToAdd.push(checkArr.shift());
    for (let i = 0; i < 3; i++) {
      let vecScal = vecCrossArr[0].dot(vecCrossArr[1]);
      if (vecScal == -1) {
        planeToAdd.push(checkArr[i]);
        checkArr.splice(i, 1);
        break;
      }
      if (i == 0) {
        vecCrossArr[0].crossVectors(directions[i + 1], directions[i]);
        vecCrossArr[1].crossVectors(directions[i + 1], directions[i + 1]);
      }
      if (i == 1) {
        vecCrossArr[0].crossVectors(directions[i + 1], directions[i - 1]);
        vecCrossArr[1].crossVectors(directions[i + 1], directions[i - 2]);
      }
    }
    for (let i = 0; i < 2; i++) {
      planeToAdd.push(checkArr.shift());
    }
    planeToAdd.push(pointVec[arrLength - 1]);
  }

  console.log(planeToAdd);
  let plane = JSON.parse(JSON.stringify(pointVec));
  plane.pop();
  for (let i = 0; i < AllPlanes.length; i++) {
    let planeWithoutInd = JSON.parse(JSON.stringify(AllPlanes[i]));
    planeWithoutInd.pop();
    if (pointVec[arrLength - 1] == AllPlanes[i][AllPlanes[i].length - 1]) {
      alert('Данный номер поверхности уже используется!');
      return false;
    }
    if (planeWithoutInd == plane) {
      alert('Такая поверхность уже существует!');
      return false;
    }
  }
  AllPlanes.unshift(planeToAdd);
  return true;
}

function checkExistMatProp(matInd,propInd,propArr){
  let flag = 0;
  if(AllMaterial.length == 0){
    alert('Группы свойств материала не заданы!');
    return false;
  }
  if(propArr.length == 0){
    alert('Группы свойств объекта не заданы!');
    return false;
  }
  for(let i=0;i<AllMaterial.length;i++){
    if(AllMaterial[i][4]==matInd){
      flag = 1;
      break;
    }
  }
  if(flag == 0){
    alert('Нет материала с таким индексом!');
    return false;
  }
  flag = 0;
  let lengthPropVec = propArr[0].length;
  for(let i=0;i<propArr.length;i++){
    if(propArr[i][lengthPropVec-1]==propInd){
      flag = 1;
      break;
    }
  }
  if(flag == 0){
    alert('Нет материала с таким индексом!');
    return false;
  }
  return true;
}

function readPlateFromPlane(planeBeg, planeEnd, mat, prop) {
  let numPlates = planeEnd - planeBeg + 1;
  let MaxPlateNumber = 0;
  for (let index = 0; index < AllPlates.length; index++) {
    if (AllPlates[3] > MaxPlateNumber) MaxPlateNumber = AllPlates[3];
  }

  let numCorrectPlanes = 0;
  for (let i = 0; i < AllPlanes.length; i++) {
    //номер поверхности хранится в последнем значении массива, задающего её
    let planeVecLength = AllPlanes[i].length;
    if (AllPlanes[i][planeVecLength-1] >= planeBeg && AllPlanes[i][planeVecLength-1] <= planeEnd) {
      numCorrectPlanes++;
    }
    //  continue;
    // } else {
    //   alert("В заданном диапазоне нет линий.");
    //   return false;
    // }
  }
  if (numPlates != numCorrectPlanes) {
    alert("В заданном диапазон не все поверхности 2.");
    return false;
  }
  if(!checkExistMatProp(mat,prop,AllPlateProperty)){
    return false;
  }
  let curind = 1;
  for (let index = planeBeg; index <= planeEnd; index++) {
    let Plate = [];
    Plate.push(+index);
    Plate.push(+mat);
    Plate.push(+prop);
    Plate.push(MaxPlateNumber + curind);
    curind++;
    AllPlates.push(Plate);
  }
  return true;
}

function readBeamFromLine(lineBeg, lineEnd, mat, prop) {
  let numBeams = lineEnd - lineBeg + 1;
  let MaxBeamNumber = 0;
  for (let index = 0; index < AllBeams.length; index++) {
    if (AllBeams[3] > MaxBeamNumber) MaxBeamNumber = AllBeams[3];
  }

  let numCorrectLines = 0;
  for (let i = 0; i < AllStrLines.length; i++) {
    if (AllStrLines[i][2] >= lineBeg && AllStrLines[i][2] <= lineEnd) {
      numCorrectLines++;
    }
    //  continue;
    // } else {
    //   alert("В заданном диапазоне нет линий.");
    //   return false;
    // }
  }
  if (numBeams != numCorrectLines) {
    alert("В заданном диапазон не все линии 2.");
    return false;
  }
  if(!checkExistMatProp(mat,prop,AllBeamProperty)){
    return false;
  }
  let curind = 1;
  for (let index = lineBeg; index <= lineEnd; index++) {
    let Beam = [];
    Beam.push(+index);
    Beam.push(+mat);
    Beam.push(+prop);
    Beam.push(MaxBeamNumber + curind);
    curind++;
    AllBeams.push(Beam);
  }
  return true;
}

function funcValuesToColor(AllFuncValues,AllColors){
  let color = [0, 0, 0];
  for(let i=0;i<AllFuncValues.size();i++){

  }
    let color2 = [0, 0, 0];
    if (funcMod[indexPoint1] > 255) {
        color1[0] = 255;
        color1[1] = 510 - funcMod[indexPoint1];
        color1[2] = color1[1];
    } else {
        color1[0] = funcMod[indexPoint1];
        color1[1] = color1[0];
        color1[2] = 255;
    }
    if (funcMod[indexPoint2] > 255) {
        color2[0] = 255;
        color2[1] = 510 - funcMod[indexPoint2];
        color2[2] = color2[1];
    } else {
        color2[0] = funcMod[indexPoint2];
        color2[1] = color2[0];
        color2[2] = 255;
    }
}

function RefineString(MyStr) {
  let RetStr = "";
  let ind;
  for (ind = 0; ind < MyStr.length; ind++) {
    if ((MyStr[ind] >= "0" && MyStr[ind] <= "z") || MyStr[ind] == "-" || MyStr[ind] == "." || MyStr[ind] == "+"|| MyStr[ind] == "e") {
      RetStr = RetStr + MyStr[ind];
    }
  }
  return RetStr;
}

function ParseFromString() {
  let index = 0;
  let ReturnCode = false;
  let AllLen = ProblemText.length;
  if (AllLen < 4) return ReturnCode;
  let bAP = false;
  let bProblemName = false;
  let bPoints = false;
  let bLines = false;
  let bBeams = false;
  /////
  let bPlateProp = false;
  let bPlates = false;
  let bPlanes3Pt = false;
  let bPlanes4Pt = false;
  /////
  let bPointForce = false;
  let bPointMoment = false;
  let bPointDis = false;
  let bPointRot = false;
  let bPointA = false;
  let bPointKappa = false;
  let bLineForce = false;
  let bLineA = false;
  let bBeamProp = false;
  let bMaterial = false;
  let PointIndex0 = 0;
  let LineIndex0 = 0;
  let BeamIndex0 = 0;
  ////
  let PlatePropIndex0 = 0;
  let PlateIndex0 = 0;
  let Plane3PtIndex0 = 0;
  let Plane4PtIndex0 = 0;
  ////
  let PointForceIndex0 = 0;
  let PointMomentIndex0 = 0;
  let PointDisIndex0 = 0;
  let PointRotIndex0 = 0;
  let PointAIndex0 = 0;
  let PointKappaIndex0 = 0;
  let LineForceIndex0 = 0;
  let LineAIndex0 = 0;
  let BeamPropIndex0 = 0;
  let MaterialIndex0 = 0;

  let LocalPoint = [0.0, 0.0, 0.0, 0];
  let LocalLine = [0, 0, 0];
  let LocalBeam = [0, 0, 0, 0];
  //////
  let LocalPlateProp = [0, 0];
  let LocalPlate = [0, 0, 0, 0];
  let LocalPlane3Pt = [0, 0, 0, 0];
  let LocalPlane4Pt = [0, 0, 0, 0, 0];
  /////
  let LocalPointForce = [0.0, 0.0, 0.0, 0];
  let LocalPointMoment = [0.0, 0.0, 0.0, 0];
  let LocalPointDis = [0.0, 0.0, 0.0, 0];
  let LocalPointRot = [0.0, 0.0, 0.0, 0];
  let LocalPointA = [0.0, 0.0, 0.0, 0];
  let LocalPointKappa = [0.0, 0.0, 0.0, 0];
  let LocalLineForce = [0.0, 0.0, 0.0, 0];
  let LocalLineA = [0.0, 0.0, 0.0, 0];
  let LocalBeamProp = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0];
  let LocalMaterial = [0.0, 0.0, 0.0, 0.0, 0];

  function allfalse() {
    bPoints = false;
    bLines = false;
    bBeams = false;
    /////
    bPlateProp = false;
    bPlate = false;
    bPlanes3Pt = false;
    bPlanes4Pt = false;
    /////
    bPointForce = false;
    bPointMoment = false;
    bPointDis = false;
    bPointRot = false;
    bPointA = false;
    bPointKappa = false;
    bLineForce = false;
    bLineA = false;
    bBeamProp = false;
    bMaterial = false;
  }
  while (index < AllLen) {
    let foundPos = ProblemText.indexOf(delim, index);
    if (foundPos == -1) break;
    else {
      let wordDraft = ProblemText.slice(index, foundPos);
      index = foundPos + 1;
      let word = RefineString(wordDraft);
      //let word = wordDraft;
      if (word.localeCompare(AP63) == 0) {
        bAP = true;
        continue;
      }
      if (bAP == true && bProblemName == false) {
        bProblemName = true;
        ProblemName = word;
        continue;
      }

      if (word.localeCompare(Points) == 0) {
        allfalse();
        bPoints = true;
        continue;
      }
      if (word.localeCompare(Lines) == 0) {
        allfalse();
        bLines = true;
        continue;
      }
      if (word.localeCompare(Beams) == 0) {
        allfalse();
        bBeams = true;
        continue;
      }

      ////////////////////////////////////////
      if (word.localeCompare(PlateProp) == 0) {
        allfalse();
        bPlateProp = true;
        continue;
      }
      if (word.localeCompare(Plates) == 0) {
        allfalse();
        bPlates = true;
        continue;
      }
      if (word.localeCompare(Planes3Pt) == 0) {
        allfalse();
        bPlanes3Pt = true;
        continue;
      }
      if (word.localeCompare(Planes4Pt) == 0) {
        allfalse();
        bPlanes4Pt = true;
        continue;
      }
      ////////////////////////////////////////

      if (word.localeCompare(PointForce) == 0) {
        allfalse();
        bPointForce = true;
        continue;
      }
      if (word.localeCompare(PointMoment) == 0) {
        allfalse();
        bPointMoment = true;
        continue;
      }
      if (word.localeCompare(PointDis) == 0) {
        allfalse();
        bPointDis = true;
        continue;
      }
      if (word.localeCompare(PointRot) == 0) {
        allfalse();
        bPointRot = true;
        continue;
      }
      if (word.localeCompare(PointA) == 0) {
        allfalse();
        bPointA = true;
        continue;
      }
      if (word.localeCompare(PointKappa) == 0) {
        allfalse();
        bPointKappa = true;
        continue;
      }
      if (word.localeCompare(LineForce) == 0) {
        allfalse();
        bLineForce = true;
        continue;
      }
      if (word.localeCompare(LineA) == 0) {
        allfalse();
        bLineA = true;
        continue;
      }
      if (word.localeCompare(BeamProp) == 0) {
        allfalse();
        bBeamProp = true;
        continue;
      }
      if (word.localeCompare(MaterialProp) == 0) {
        allfalse();
        bMaterial = true;
        continue;
      }
      if (bPoints == true) {
        if (PointIndex0 == 3) {
          IntValue = parseInt(word);
          if (isNaN(IntValue)) IntValue = 0;
          LocalPoint[PointIndex0] = IntValue;
          let LP = new Array(4);
          LP[0] = LocalPoint[0];
          LP[1] = LocalPoint[1];
          LP[2] = LocalPoint[2];
          LP[3] = LocalPoint[3];
          AllPoints.push(LP);
          PointIndex0 = 0;
        } else {
          FloatValue = parseFloat(word);
          if (isNaN(FloatValue)) FloatValue = 0;
          LocalPoint[PointIndex0] = FloatValue;
          PointIndex0++;
        }
      }

      if (bLines == true) {
        if (LineIndex0 == 2) {
          IntValue = parseInt(word);
          if (isNaN(IntValue)) IntValue = 0;
          LocalLine[LineIndex0] = IntValue;
          let LL = new Array(3);
          LL[0] = LocalLine[0];
          LL[1] = LocalLine[1];
          LL[2] = LocalLine[2];
          AllStrLines.push(LL);
          LineIndex0 = 0;
        } else {
          IntValue = parseInt(word);
          if (isNaN(IntValue)) IntValue = 0;
          LocalLine[LineIndex0] = IntValue;
          LineIndex0++;
        }
      }

      if (bBeams == true) {
        if (BeamIndex0 == 3) {
          IntValue = parseInt(word);
          if (isNaN(IntValue)) IntValue = 0;
          LocalBeam[BeamIndex0] = IntValue;
          let LB = new Array(4);
          LB[0] = LocalBeam[0];
          LB[1] = LocalBeam[1];
          LB[2] = LocalBeam[2];
          LB[3] = LocalBeam[3];
          AllBeams.push(LB);
          BeamIndex0 = 0;
        } else {
          IntValue = parseInt(word);
          if (isNaN(IntValue)) IntValue = 0;
          LocalBeam[BeamIndex0] = IntValue;
          BeamIndex0++;
        }
      }
      ////////////////////////////////////////
      if (bPlateProp == true) {
        if (PlatePropIndex0 == 1) {
          IntValue = parseInt(word);
          if (isNaN(IntValue)) IntValue = 0;
          LocalPlateProp[PlatePropIndex0] = IntValue;
          let LB = new Array(2);
          LB[0] = LocalPlateProp[0];
          LB[1] = LocalPlateProp[1];
          AllPlateProperty.push(LB);
          PlatePropIndex0 = 0;
        } else {
          IntValue = parseInt(word);
          if (isNaN(IntValue)) IntValue = 0;
          LocalPlateProp[PlatePropIndex0] = IntValue;
          PlatePropIndex0++;
        }
      }
      if (bPlates == true) {
        if (PlateIndex0 == 3) {
          IntValue = parseInt(word);
          if (isNaN(IntValue)) IntValue = 0;
          LocalPlate[PlateIndex0] = IntValue;
          let LB = new Array(4);
          LB[0] = LocalPlate[0];
          LB[1] = LocalPlate[1];
          LB[2] = LocalPlate[2];
          LB[3] = LocalPlate[3];
          AllPlates.push(LB);
          PlateIndex0 = 0;
        } else {
          IntValue = parseInt(word);
          if (isNaN(IntValue)) IntValue = 0;
          LocalPlate[PlateIndex0] = IntValue;
          PlateIndex0++;
        }
      }
      if (bPlanes3Pt == true) {
        if (Plane3PtIndex0 == 3) {
          IntValue = parseInt(word);
          if (isNaN(IntValue)) IntValue = 0;
          LocalPlane3Pt[Plane3PtIndex0] = IntValue;
          let LB = new Array(3);
          LB[0] = LocalPlane3Pt[0];
          LB[1] = LocalPlane3Pt[1];
          LB[2] = LocalPlane3Pt[2];
          LB[3] = LocalPlane3Pt[3];
          AllPlanes.push(LB);
          Plane3PtIndex0 = 0;
        } else {
          IntValue = parseInt(word);
          if (isNaN(IntValue)) IntValue = 0;
          LocalPlane3Pt[Plane3PtIndex0] = IntValue;
          Plane3PtIndex0++;
        }
      }
      if (bPlanes4Pt == true) {
        if (Plane4PtIndex0 == 4) {
          IntValue = parseInt(word);
          if (isNaN(IntValue)) IntValue = 0;
          LocalPlane4Pt[Plane4PtIndex0] = IntValue;
          let LB = new Array(4);
          LB[0] = LocalPlane4Pt[0];
          LB[1] = LocalPlane4Pt[1];
          LB[2] = LocalPlane4Pt[2];
          LB[3] = LocalPlane4Pt[3];
          LB[4] = LocalPlane4Pt[4];
          AllPlanes.push(LB);
          Plane4PtIndex0 = 0;
        } else {
          IntValue = parseInt(word);
          if (isNaN(IntValue)) IntValue = 0;
          LocalPlane4Pt[Plane4PtIndex0] = IntValue;
          Plane4PtIndex0++;
        }
      }
      ////////////////////////////////////////
      if (bPointForce == true) {
        //alert("Force");
        if (PointForceIndex0 == 3) {
          IntValue = parseInt(word);
          if (isNaN(IntValue)) IntValue = 0;
          LocalPointForce[PointForceIndex0] = IntValue;
          let LPF = new Array(4);
          LPF[0] = LocalPointForce[0];
          LPF[1] = LocalPointForce[1];
          LPF[2] = LocalPointForce[2];
          LPF[3] = LocalPointForce[3];
          if (
            LPF[0] != 0 ||
            (LPF[1] != 0 && LPF[2] != 0) ||
            (!isNaN(LPF[0]) || !isNaN(LPF[1]) || !isNaN(LPF[2]))
          ) {
            PointForces.push(LPF);
          }
          PointForceIndex0 = 0;
        } else {
          FloatValue = parseFloat(word);
          if (isNaN(FloatValue)) FloatValue = 0;
          LocalPointForce[PointForceIndex0] = FloatValue;
          PointForceIndex0++;
        }
      }

      if (bPointMoment == true) {
        if (PointMomentIndex0 == 3) {
          IntValue = parseInt(word);
          if (isNaN(IntValue)) IntValue = 0;
          LocalPointMoment[PointMomentIndex0] = IntValue;
          let LPM = new Array(4);
          LPM[0] = LocalPointMoment[0];
          LPM[1] = LocalPointMoment[1];
          LPM[2] = LocalPointMoment[2];
          LPM[3] = LocalPointMoment[3];
          if (
            LPM[0] != 0 ||
            (LPM[1] != 0 && LPM[2] != 0) ||
            (!isNaN(LPM[0]) || !isNaN(LPM[1]) || !isNaN(LPM[2]))
          ) {
            PointMoments.push(LPM);
          }
          PointMomentIndex0 = 0;
        } else {
          FloatValue = parseFloat(word);
          if (isNaN(FloatValue)) FloatValue = 0;
          LocalPointMoment[PointMomentIndex0] = FloatValue;
          PointMomentIndex0++;
        }
      }

      if (bPointDis == true) {
        if (PointDisIndex0 == 3) {
          IntValue = parseInt(word);
          //if(isNaN(IntValue))IntValue=0;
          LocalPointDis[PointDisIndex0] = IntValue;
          let LPD = new Array(4);
          LPD[0] = LocalPointDis[0];
          LPD[1] = LocalPointDis[1];
          LPD[2] = LocalPointDis[2];
          LPD[3] = LocalPointDis[3];
          PointDiss.push(LPD);
          PointDisIndex0 = 0;
        } else {
          FloatValue = parseFloat(word);
          //if(isNaN(FloatValue)) FloatValue=0;
          LocalPointDis[PointDisIndex0] = FloatValue;
          PointDisIndex0++;
        }
      }

      if (bPointRot == true) {
        if (PointRotIndex0 == 3) {
          IntValue = parseInt(word);
          //if(isNaN(IntValue))IntValue=0;
          LocalPointRot[PointRotIndex0] = IntValue;
          let LPR = new Array(4);
          LPR[0] = LocalPointRot[0];
          LPR[1] = LocalPointRot[1];
          LPR[2] = LocalPointRot[2];
          LPR[3] = LocalPointRot[3];
          PointRots.push(LPR);
          PointRotIndex0 = 0;
        } else {
          FloatValue = parseFloat(word);
          //if(isNaN(FloatValue)) FloatValue=0;
          LocalPointRot[PointRotIndex0] = FloatValue;
          PointRotIndex0++;
        }
      }

      if (bPointA == true) {
        if (PointAIndex0 == 3) {
          IntValue = parseInt(word);
          if (isNaN(IntValue)) IntValue = 0;
          LocalPointA[PointAIndex0] = IntValue;
          let LPA = new Array(4);
          LPA[0] = LocalPointA[0];
          LPA[1] = LocalPointA[1];
          LPA[2] = LocalPointA[2];
          LPA[3] = LocalPointA[3];
          PointAs.push(LPA);
          PointAIndex0 = 0;
        } else {
          FloatValue = parseFloat(word);
          if (isNaN(FloatValue)) FloatValue = 0;
          LocalPointA[PointAIndex0] = FloatValue;
          PointaIndex0++;
        }
      }

      if (bPointKappa == true) {
        if (PointKappaIndex0 == 3) {
          IntValue = parseInt(word);
          if (isNaN(IntValue)) IntValue = 0;
          LocalPointKappa[PointKappaIndex0] = IntValue;
          let LPK = new Array(4);
          LPL[0] = LocalPointKappa[0];
          LPK[1] = LocalPointKappa[1];
          LPK[2] = LocalPointKappa[2];
          LPK[3] = LocalPointKappa[3];
          PointKappas.push(LPK);
          PointKappaIndex0 = 0;
        } else {
          FloatValue = parseFloat(word);
          if (isNaN(FloatValue)) FloatValue = 0;
          LocalPointKappa[PointKappaIndex0] = FloatValue;
          PointKappaIndex0++;
        }
      }

      if (bLineForce == true) {
        if (LineForceIndex0 == 3) {
          IntValue = parseInt(word);
          if (isNaN(IntValue)) IntValue = 0;
          LocalLineForce[LineForceIndex0] = IntValue;
          let LLF = new Array(4);
          LLF[0] = LocalLineForce[0];
          LLF[1] = LocalLineForce[1];
          LLF[2] = LocalLineForce[2];
          LLF[3] = LocalLineForce[3];
          LineForces.push(LLF);
          LineForceIndex0 = 0;
        } else {
          FloatValue = parseFloat(word);
          if (isNaN(FloatValue)) FloatValue = 0;
          LocalLineForce[LineForceIndex0] = FloatValue;
          LineForceIndex0++;
        }
      }

      if (bLineA == true) {
        if (LineAIndex0 == 3) {
          IntValue = parseInt(word);
          if (isNaN(IntValue)) IntValue = 0;
          LocalLineA[LineAIndex0] = IntValue;
          let LLA = new Array(4);
          LLA[0] = LocalLineA[0];
          LLA[1] = LocalLineA[1];
          LLA[2] = LocalLineA[2];
          LLA[3] = LocalLineA[3];
          LineAs.push(LLA);
          LineAIndex0 = 0;
        } else {
          FloatValue = parseFloat(word);
          if (isNaN(FloatValue)) FloatValue = 0;
          LocalLineA[LineAIndex0] = FloatValue;
          LineAIndex0++;
        }
      }

      if (bBeamProp == true) {
        if (BeamPropIndex0 == 6) {
          IntValue = parseInt(word);
          if (isNaN(IntValue)) IntValue = 0;
          LocalBeamProp[BeamPropIndex0] = IntValue;
          let LBP = new Array(7);
          for (ind = 0; ind < 7; ind++) LBP[ind] = LocalBeamProp[ind];
          AllBeamProperty.push(LBP);
          BeamPropIndex0 = 0;
        } else {
          FloatValue = parseFloat(word);
          if (isNaN(FloatValue)) FloatValue = 0;
          LocalBeamProp[BeamPropIndex0] = FloatValue;
          BeamPropIndex0++;
        }
      }

      if (bMaterial == true) {
        if (MaterialIndex0 == 4) {
          IntValue = parseInt(word);
          if (isNaN(IntValue)) IntValue = 0;
          LocalMaterial[MaterialIndex0] = IntValue;
          let LM = new Array(5);
          for (ind = 0; ind < 5; ind++) LM[ind] = LocalMaterial[ind];
          AllMaterial.push(LM);
          MaterialIndex0 = 0;
        } else {
          FloatValue = parseFloat(word);
          if (isNaN(FloatValue)) FloatValue = 0;
          LocalMaterial[MaterialIndex0] = FloatValue;
          MaterialIndex0++;
        }
      }
    }
  }
  return true;
}

function ParseFromStringResult() {
  let index = 0;
  let ReturnCode = false;
  let AllLen = ProblemText.length;
  if (AllLen < 4) return ReturnCode;
  let bPoints = false;
  let bLines = false;
  let bBeams = false;
  let bFunc = false;
  let PointIndex0 = 0;
  let LineIndex0 = 0;
  let BeamIndex0 = 0;
  let FuncIndex0 = 0;

  let LocalPoint = [0.0, 0.0, 0.0, 0];
  let LocalLine = [0, 0, 0];
  let LocalBeam = [0, 0, 0, 0];
  let LocalFunc = [0, 0, 0, 0];

  function allfalse() {
    bPoints = false;
    bLines = false;
    bBeams = false;
    bFunc = false;
  }
  while (index < AllLen) {
    let foundPos = ProblemText.indexOf(delim, index);
    if (foundPos == -1) break;
    else {
      let wordDraft = ProblemText.slice(index, foundPos);
      index = foundPos + 1;
      let word = RefineString(wordDraft);
      //let word = wordDraft;

      if (word.localeCompare(Points) == 0) {
        allfalse();
        bPoints = true;
        continue;
      }
      if (word.localeCompare(Lines) == 0) {
        allfalse();
        bLines = true;
        continue;
      }
      if (word.localeCompare(Beams) == 0) {
        allfalse();
        bBeams = true;
        continue;
      }
      if (word.localeCompare(Func) == 0) {
        allfalse();
        bFunc = true;
        continue;
      }
      if (bPoints == true) {
        if (PointIndex0 == 2) {
          FloatValue = parseFloat(word);
          if (isNaN(FloatValue)) FloatValue = 0;
          LocalPoint[PointIndex0] = FloatValue;
          let LP = new Array(3);
          LP[0] = LocalPoint[0];
          LP[1] = LocalPoint[1];
          LP[2] = LocalPoint[2];
          //LP[3] = LocalPoint[3];
          AllPoints.push(LP);
          PointIndex0 = 0;
        } else {
          FloatValue = parseFloat(word);
          if (isNaN(FloatValue)) FloatValue = 0;
          LocalPoint[PointIndex0] = FloatValue;
          PointIndex0++;
        }
      }

      if (bLines == true) {
        if (LineIndex0 == 1) {
          IntValue = parseInt(word);
          if (isNaN(IntValue)) IntValue = 0;
          LocalLine[LineIndex0] = IntValue;
          let LL = new Array(2);
          LL[0] = LocalLine[0];
          LL[1] = LocalLine[1];
         // LL[2] = LocalLine[2];
          AllStrLines.push(LL);
          LineIndex0 = 0;
        } else {
          IntValue = parseInt(word);
          if (isNaN(IntValue)) IntValue = 0;
          LocalLine[LineIndex0] = IntValue;
          LineIndex0++;
        }
      }

      if (bBeams == true) {
        if (BeamIndex0 == 3) {
          IntValue = parseInt(word);
          if (isNaN(IntValue)) IntValue = 0;
          LocalBeam[BeamIndex0] = IntValue;
          let LB = new Array(3);
          LB[0] = LocalBeam[0];
          LB[1] = LocalBeam[1];
          LB[2] = LocalBeam[2];
          LB[3] = LocalBeam[3];
          AllBeams.push(LB);
          BeamIndex0 = 0;
        } else {
          IntValue = parseInt(word);
          if (isNaN(IntValue)) IntValue = 0;
          LocalBeam[BeamIndex0] = IntValue;
          BeamIndex0++;
        }
      }

      if (bFunc == true) {
        if (FuncIndex0 == 2) {
          FloatValue = parseFloat(word);
          if (isNaN(FloatValue)) FloatValue = 0;
          LocalFunc[FuncIndex0] = FloatValue;
          let LP = new Array(3);
          LP[0] = LocalFunc[0];
          LP[1] = LocalFunc[1];
          LP[2] = LocalFunc[2];
          let localMod = Math.sqrt(LP[0] * LP[0] + LP[1] * LP[1] + LP[2] * LP[2]);
          funcMod.push(localMod);
          if (AllFuncValues.length == 0) {
            for (let i = 0; i < 3; i++) {
              //minFuncValues[i] = LP[i];
              //maxFuncValues[i] = LP[i];

              minFuncMod = localMod;
              maxFuncMod = localMod;
            }
          } else {
            if (localMod < minFuncMod) {
              minFuncMod = localMod;
            }
            if (localMod > maxFuncMod) {
              maxFuncMod = localMod;
            }
            // for (let i = 0; i < 3; i++) {
            //   if (LP[i] < minFuncValues[i]) {
            //     minFuncValues[i] = LP[i];
            //   }
            //   if (LP[i] > maxFuncValues[i]) {
            //     maxFuncValues[i] = LP[i];
            //   }
            // }
          }
          //LP[3] = LocalFunc[3];
          AllFuncValues.push(LP);
          FuncIndex0 = 0;
        } else {
          FloatValue = parseFloat(word);
          if (isNaN(FloatValue)) FloatValue = 0;
          LocalFunc[FuncIndex0] = FloatValue;
          FuncIndex0++;
        }
      }
    }
  }
  scaleModToFull();
  funcModToColor();
  sceneManager.reDrawLegend(minFuncMod, maxFuncMod);
  return true;
}
