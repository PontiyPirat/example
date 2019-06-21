function SaveToString() {
    //alert("SaveToString");
    ProblemText = AP63 + delim + newLine;
    ProblemText = ProblemText + ProblemName + delim + newLine;
    var ind = 0;
    var plen = AllPoints.length;
    //if(plen==0)return;
    ProblemText = ProblemText + Points + delim + newLine;
    for (ind = 0; ind < plen; ind++) {
        ProblemText = ProblemText + String(AllPoints[ind][0]) + delim + String(AllPoints[ind][1]) + delim + String(AllPoints[ind][2]) + delim + String(AllPoints[ind][3]) + delim + newLine;
    }
    //alert(ProblemText);
    var llen = AllStrLines.length;
    //if(llen==0)return;
    //alert(llen);
    ProblemText = ProblemText + Lines + delim + newLine;
    //alert(ProblemText);
    for (ind = 0; ind < llen; ind++) {
        ProblemText = ProblemText + String(AllStrLines[ind][0]) + delim + String(AllStrLines[ind][1]) + delim + String(AllStrLines[ind][2]) + delim + newLine;
    }
    //alert(ProblemText);
    var blen = AllBeams.length;
    //if(blen==0)return;
    ProblemText = ProblemText + Beams + delim + newLine;
    for (ind = 0; ind < blen; ind++) {
        ProblemText = ProblemText + String(AllBeams[ind][0]) + delim + String(AllBeams[ind][1]) + delim + String(AllBeams[ind][2]) + delim + String(AllBeams[ind][3]) + delim + newLine;
    }

    ////////////////////////////////////////
    var ptLen = AllPlates.length;
    //if(blen==0)return;
    ProblemText = ProblemText + Plates + delim + newLine;
    for (ind = 0; ind < ptLen; ind++) {
        ProblemText = ProblemText + String(AllPlates[ind][0]) + delim + String(AllPlates[ind][1]) + delim + String(AllPlates[ind][2]) + delim + String(AllPlates[ind][3]) + delim + newLine;
    }
    ////////////////////////////////////////
    var pnLen = AllPlanes.length;
    //if(blen==0)return;
    let textForPlane3Pt, textForPlane4Pt;
    textForPlane3Pt = Planes3Pt + delim + newLine;
    textForPlane4Pt = Planes4Pt + delim + newLine;
    //ProblemText = ProblemText + Planes + delim + newLine;
    for (ind = 0; ind < pnLen; ind++) {
        let planeVecLength = AllPlanes[ind].length;
        if (planeVecLength == 4) {
            for (let i = 0; i < planeVecLength; i++) {
                textForPlane3Pt += String(AllPlanes[ind][i]) + delim;
            }
            textForPlane3Pt+=newLine;
        }
        if (planeVecLength == 5) {
            for (let i = 0; i < planeVecLength; i++) {
                textForPlane4Pt += String(AllPlanes[ind][i]) + delim;
            }
            textForPlane4Pt+=newLine;
        }
    }
    ProblemText += (textForPlane3Pt + textForPlane4Pt);
    console.log(textForPlane3Pt + textForPlane4Pt);
    console.log(ProblemText);
    ////////////////////////////////////////

    var pflen = PointForces.length;
    //if(pflen==0)return;
    ProblemText = ProblemText + PointForce + delim + newLine;
    for (ind = 0; ind < pflen; ind++) {
        ProblemText = ProblemText + String(PointForces[ind][0]) + delim + String(PointForces[ind][1]) + delim + String(PointForces[ind][2]) + delim + String(PointForces[ind][3]) + delim + newLine;
    }

    var pmlen = PointMoments.length;
    //if(pmlen==0)return;
    ProblemText = ProblemText + PointMoment + delim + newLine;
    for (ind = 0; ind < pmlen; ind++) {
        ProblemText = ProblemText + String(PointMoments[ind][0]) + delim + String(PointMoments[ind][1]) + delim + String(PointMoments[ind][2]) + delim + String(PointMoments[ind][3]) + delim + newLine;
    }

    var pdlen = PointDiss.length;
    //if(pdlen==0)return;
    ProblemText = ProblemText + PointDis + delim + newLine;
    for (ind = 0; ind < pdlen; ind++) {
        ProblemText = ProblemText + String(PointDiss[ind][0]) + delim + String(PointDiss[ind][1]) + delim + String(PointDiss[ind][2]) + delim + String(PointDiss[ind][3]) + delim + newLine;
    }

    var prlen = PointRots.length;
    //if(prlen==0)return;
    ProblemText = ProblemText + PointRot + delim + newLine;
    for (ind = 0; ind < prlen; ind++) {
        ProblemText = ProblemText + String(PointRots[ind][0]) + delim + String(PointRots[ind][1]) + delim + String(PointRots[ind][2]) + delim + String(PointRots[ind][3]) + delim + newLine;
    }

    var palen = PointAs.length;
    //if(prlen==0)return;
    ProblemText = ProblemText + PointA + delim + newLine;
    for (ind = 0; ind < palen; ind++) {
        ProblemText = ProblemText + String(PointAs[ind][0]) + delim + String(PointAs[ind][1]) + delim + String(PointAs[ind][2]) + delim + String(PointAs[ind][3]) + delim + newLine;
    }

    var pklen = PointKappas.length;
    //if(pklen==0)return;
    ProblemText = ProblemText + PointKappa + delim + newLine;
    for (ind = 0; ind < pklen; ind++) {
        ProblemText = ProblemText + String(PointKappas[ind][0]) + delim + String(PointKappas[ind][1]) + delim + String(PointKappas[ind][2]) + delim + String(PointKappas[ind][3]) + delim + newLine;
    }

    var lflen = LineForces.length;
    //if(lflen==0)return;
    ProblemText = ProblemText + LineForce + delim + newLine;
    for (ind = 0; ind < lflen; ind++) {
        ProblemText = ProblemText + String(LineForces[ind][0]) + delim + String(LineForces[ind][1]) + delim + String(LineForces[ind][2]) + delim + String(LineForces[ind][3]) + delim + newLine;
    }

    var lalen = LineAs.length;
    //if(lalen==0)return;
    ProblemText = ProblemText + LineA + delim + newLine;
    for (ind = 0; ind < lalen; ind++) {
        ProblemText = ProblemText + String(LineAs[ind][0]) + delim + String(LineAs[ind][1]) + delim + String(LineAs[ind][2]) + delim + String(LineAs[ind][3]) + delim + newLine;
    }

    var bplen = AllBeamProperty.length;
    //if(bplen==0)return;
    ProblemText = ProblemText + BeamProp + delim + newLine;
    for (ind = 0; ind < bplen; ind++) {
        ProblemText = ProblemText + String(AllBeamProperty[ind][0]) + delim + String(AllBeamProperty[ind][1]) + delim + String(AllBeamProperty[ind][2]) + delim + String(AllBeamProperty[ind][3]) + delim + String(AllBeamProperty[ind][4]) + delim + String(AllBeamProperty[ind][5]) + delim + String(AllBeamProperty[ind][6]) + delim + newLine;
    }

    ////////////////////////////////////////
    var pplen = AllPlateProperty.length;
    ProblemText = ProblemText + PlateProp + delim + newLine;
    for (ind = 0; ind < pplen; ind++) {
        ProblemText = ProblemText + String(AllPlateProperty[ind][0]) + delim + String(AllPlateProperty[ind][1]) + delim + newLine;
    }
    ////////////////////////////////////////

    var mlen = AllMaterial.length;
    //if(mlen==0)return;
    ProblemText = ProblemText + MaterialProp + delim + newLine;
    for (ind = 0; ind < mlen; ind++) {
        ProblemText = ProblemText + String(AllMaterial[ind][0]) + delim + String(AllMaterial[ind][1]) + delim + String(AllMaterial[ind][2]) + delim + String(AllMaterial[ind][3]) + delim + String(AllMaterial[ind][4]) + delim + newLine;
    }

    ProblemText += Analys+delim+newLine+AnalysText+delim+newLine;
    ProblemText += ElSize+delim+newLine+ElSizeText+delim+newLine;
}

function WriteFile(FileName) {
    //alert("write file"+FileName);
    //download(ProblemText,FileMame,'text/plain');
    ///*    
    //var textToWrite = document.getElementById("inputTextToSave").value;
    var textFileAsBlob = new Blob([ProblemText], { type: 'text/plain' });
    //var fileNameToSaveAs ="123";// document.getElementById("inputFileNameToSaveAs").value;
    var downloadLink = document.createElement("a");
    downloadLink.setAttribute("download", FileName);

    //downloadLink.download = FileName;
    //downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null) {
        // Chrome allows the link to be clicked
        // without actually adding it to the DOM.
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    }
    else {
        // Firefox requires the link to be added to the DOM
        // before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }

    downloadLink.click();
    //*/    
}

function WriteFileOnServ(Filename) {
    var textFileAsBlob = new Blob([ProblemText], { type: 'text/plain' });
    $.ajax({
        type: 'POST',
        url: '/',
        data: 'data=' + JSON.stringify(ProblemText),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (res) {
            if (!res) console.log('Ошибка');
            console.log(res);
        },
        error: function (exception) {
            console.log('Exeption:' + exception);
        }
    })
}