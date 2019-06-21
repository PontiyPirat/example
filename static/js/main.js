//привязка к холсту в html
var canvas = document.getElementById("canvas");
//задание размеров холста
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - canvas.offsetTop;
//создание менеджера сцены
var sceneManager;
var pause = false;

var pointSize = 10;
var font;
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
  sceneManager = new SceneManager(canvas, 0);
  bindEventListeners();
  render();
}, function (err) {
  console.log(err);
});
//GeneralPoint=[0.0,0.0,0.0,0];  // три координаты и личный номер
var AllPoints = [[0.0, 0.0, 0.0, 0]];
AllPoints.pop();
//StraightLine=[0,0,0];       // номер начальной и конечной точек, личный номер
var AllStrLines = [[0, 0, 0]];
AllStrLines.pop();
//Plane=[0,0,0,0] либо [0,0,0,0,0] // первые элементы номера точек, формирущих плоскость(может быть три либо четыре точки), последний элемент - номер плоскости
var AllPlanes = [];
//Plate=[0,0,0,0] // номер плоскости, номер материала, номер свойств, личный номер
var AllPlates = [];
AllPlates.pop();
//Beam=[0,0,0,0];  // номер линии, номер материала, номер свойств, личный номер
var AllBeams = [[0, 0, 0, 0]];
AllBeams.pop();

//BeamProperty=[0.0,0.0,0.0,0.0,0.0,0.0,0];   // площадь поперечного сечения, момент инерции 1, момент инерции 2
// круговой момент инерции, момент сопротивления 1, момент сопротивления 2, номер
var AllBeamProperty = [[0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0]];
AllBeamProperty.pop();

//PlateProperty = [0.0,0] //толщина, личный номер
var AllPlateProperty = [[0.0, 0]];
AllPlateProperty.pop();

//Material=[0.0,0.0,0.0,0.0,0];  // плотность, нормальный модуль упругости, коэффициент Пуассона, тепловое расширение, номер
var AllMaterial = [[0.0, 0.0, 0.0, 0.0, 0]];
AllMaterial.pop();

var PointForces = [[0, 0, 0, 0]]; // ГУ Сила в точке, три компоненты и номер точки
PointForces.pop();

var PointMoments = [[0, 0, 0, 0]]; // ГУ Момент в точке, три компоненты и номер точки
PointMoments.pop();

var PointDiss = [[0, 0, 0, 0]]; //ГУ перемещение в точке, три компоненты и номер точки
PointDiss.pop();

var PointRots = [[0, 0, 0, 0]]; // ГУ вращение в точке, три компоненты и номер точки
PointRots.pop();

var PointAs = [[0, 0, 0, 0]]; // ГУ Коэфф. упругости в точке, три компоненты и номер точки
PointAs.pop();

var PointKappas = [[0, 0, 0, 0]]; // ГУ коэфф. упр. задклки в точке, три компоненты и номер точки
PointKappas.pop();

var LineForces = [[0, 0, 0, 0]]; // ГУ Распределенная сила на линии, три компоненты и номер линии
LineForces.pop();

var LineAs = [[0, 0, 0, 0]]; // ГУ коэфф. упр. основания на линии, три компоненты и номер линии
LineAs.pop();

var DynamicConditions = []; // Время действия нагрузки(пока ступенька): время начала и коэффициент
DynamicConditions.pop();

var AnalysText = "";

var ElSizeText = "";

//хранение максимальной длины стержня, обновляется при каждом добавлениие и удалении линий
var beamLength = 0;

//Хранение всех имен для сохранения в файл
var ProblemName;
var ProblemText = "AP63";
var delim = ";";
var newLine = "\n";
var AP63 = "AP63";
var Points = "POINTS";
var Lines = "LINES";
var Beams = "BEAMS";
var Plates = "PLATES";
var Planes3Pt = "PLANES3PT";
var Planes4Pt = "PLANES4PT";
var PointForce = "POINTFORCES";
var PointMoment = "POINTMOMENTS";
var PointDis = "POINTDISPLACEMENTS";
var PointRot = "POINTROTATIONS";
var PointA = "POINTA";
var PointKappa = "POINTKAPPA";
var LineForce = "LINEFORCES";
var LineA = "LINEA";
var PlateProp = "PLATEPROPERTIES";
var BeamProp = "BEAMPROPERTIES";
var MaterialProp = "MATERIALS";
var Analys = "ANALYS";
var ElSize = "ELSIZE";


//Добавление слушателя для изменения размера окна
function bindEventListeners() {
  window.onresize = resizeCanvas;
  resizeCanvas();
}
//Функция, срабатывающая при изменении окна и ведущая к изменению холста
function resizeCanvas() {
  canvas.style.width = "100%";
  canvas.style.height = "100%";

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  //Помимо изменения холста необходимо 
  sceneManager.onWindowResize();
}
//Очистка всех описанных ранее массивов для задания условий задачи
function initProblem() {
  AllPoints = [];
  AllStrLines = [];
  AllBeams = [];
  AllPlanes = [];
  AllPlates = [];
  AllBeamProperty = [];
  AllPlateProperty = [];
  AllMaterial = [];
  PointForces = [];
  PointMoments = [];
  PointDiss = [];
  PointRots = [];
  PointAs = [];
  PointKappas = [];
  LineForces = [];
  LineAs = [];
}
//описание функции для постоянного обновления окна визуализации
function render() {
  requestAnimationFrame(render);
  //if (!pause) {
  sceneManager.update();
  //}
}
// Предупреждение о потери данных при обновлении страницы
// window.onbeforeunload = function() {
//   return "Убедитесь, что сохранили изменения.";
// };