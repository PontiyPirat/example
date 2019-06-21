//привязка к холсту в html
var canvas = document.getElementById("canvasResult");
//задание размеров холста
canvas.height = document.documentElement.clientHeight-100;
canvas.width = canvas.offsetWidth;
//создание менеджера сцены
var pause = false;
var sceneManager;

var font;
var fontSize = 0.5;
var legendHeight = 400;
var legendWidth = 100;
var numTicks = 5;
//Загрузка шрифта для написания текста
var promiseFontLoad = new Promise(function (resolve, reject) {
    let loader = new THREE.FontLoader();
    loader.load('helvetiker_regular.typeface.json', function (response) {
        resolve(response);
    });
});
//Фукнция, выполняющаяся после загрузки шрифта
promiseFontLoad.then(function (response) {
    font = response;
    sceneManager = new SceneManager(canvas, 1);
    bindEventListeners();
    render();
}, function (err) {
    console.log(err);
});


function bindEventListeners() {
    window.onresize = resizeCanvas;
    //resizeCanvas();
}
function resizeCanvas() {
    canvas.style.width = "100%";
    canvas.style.height = "100%";

    canvas.width = canvas.offsetWidth;
    canvas.height = document.documentElement.clientHeight-100;

    sceneManager.onWindowResize();
}
//описание функции для постоянного обновления окна визуализации
function render() {
    requestAnimationFrame(render);
    sceneManager.update();
}

var AllResults = {
    efSt: '',
    deformSt: '',
    efDyn: ''
}

var ProblemName;
var ProblemText;

//GeneralPoint=[0.0,0.0,0.0,0];  // три координаты и личный номер
var AllPoints = [[0.0, 0.0, 0.0, 0]];
AllPoints.pop();
//StraightLine=[0,0,0];       // номер начальной и конечной точек, личный номер
var AllStrLines = [[0, 0, 0]];
AllStrLines.pop();
//funcValue=[0,0,0,0];  // результаты решателя и номер точки
var AllFuncValues = [[0, 0, 0, 0]];
AllFuncValues.pop();
//AllFuncValues, в которых по трем результатам взята длина вектора
var funcMod = [];
//Цвета для всех точек по AllFuncValues
var AllColors = [[0, 0, 0]];
AllColors.pop();
//
var AllPlates = [];

var maxFuncMod = 0;
var minFuncMod = 0;

var delim = ";";
var newLine = "\n";
var Points = "POINTS";
var Lines = "LINES";
var Beams = "BEAMS";
var Func = "VALUES";

function initProblem() {
    //GeneralPoint=[0.0,0.0,0.0,0];  // три координаты и личный номер
    AllPoints = [[0.0, 0.0, 0.0, 0]];
    AllPoints.pop();
    //StraightLine=[0,0,0];       // номер начальной и конечной точек, личный номер
    AllStrLines = [[0, 0, 0]];
    AllStrLines.pop();
    //Beam=[0,0,0,0];  // номер линии, номер материала, номер свойств, личный номер
    AllBeams = [[0, 0, 0, 0]];
    AllBeams.pop();
    //funcValue=[0,0,0,0];  // RGB и номер точки
    AllFuncValues = [[0, 0, 0, 0]];
    AllFuncValues.pop();
    //AllFuncValues, в которых по трем результатам взята длина вектора
    funcMod = [];
    //Цвета для всех точек по AllFuncValues
    AllColors = [[0, 0, 0]];
    AllColors.pop();

    AllPlates = [];


    maxFuncMod = 0;
    minFuncMod = 0;
}

function funcModToColor() {
    for (let i = 0; i < funcMod.length; i++) {
        let color = [0, 0, 0];
        if (funcMod[i] > 255) {
            color[0] = 255;
            color[1] = 510 - funcMod[i];
            color[2] = color[1];
        } else {
            color[0] = funcMod[i];
            color[1] = color[0];
            color[2] = 255;
        }
        AllColors.push(color);
    }
}

//все значения funcMod скалируются на весь диапазон цветов от синего до красного через белый
function scaleModToFull() {
    let delta = maxFuncMod - minFuncMod;
    for (let i = 0; i < funcMod.length; i++) {
        if (delta != 0) {
            funcMod[i] = (funcMod[i] - minFuncMod) * 510 / delta;
            funcMod[i] = Math.round(funcMod[i]);
        } else {
            funcMod[i] = 0;
        }
    }
}

// function scaleFuncToRGB(value, position) {
//     let result;
//     let delta = maxFuncValues[position] - minFuncValues[position];
//     if (delta != 0) {
//         result = (value - minFuncValues[position]) * 255 / delta;
//     } else {
//         result = 0;
//     }
//     return Math.round(result);
// }

