<template>
  <section>
    <!-- <script
      src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
      integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
      crossorigin="anonymous"
    ></script> -->
    <script src="/js/lib/three.min.js"></script>
    <script src="/js/lib/OrbitControls.js"></script>

    <Header/>
    <Point3Coord/>
    <PointDel/>
    <SaveTZLocal/>
    <SaveTZServ/>
    <OpenFileLocal/>
    <Line2Pt/>
    <Plane/>
    <LineDel/>
    <LineToBeam/>
    <BeamDel/>
    <OpenFileServList/>
    <BeamToProp/>
    <BeamProp/>
    <DelBeamProp/>
    <MaterialProp/>
    <DelMaterialProp/>
    <PointBoundary/>
    <LinDynamic/>
    <CalcType/>
    <DelPointBoundary/>
    <LineBoundary/>
    <DelLineBoundary/>
    <PlaneToPlate/>
    <PlateDel/>
    <PlateProp/>
    <DelPlateProp/>
    <PropsTable/>

    <b-nav pills id="menu">
      <b-nav-item-dropdown text="Файл">
        <b-dropdown-item @click="newProblem()" id="NewProblem1">Новая задача</b-dropdown-item>
        <b-dropdown-item v-b-modal.OpenFileLocal>Открыть локально</b-dropdown-item>
        <b-dropdown-item v-b-modal.OpenFileServList>Открыть на сервере</b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item v-b-modal.SaveTZLocal>Сохранить исходные данные локально</b-dropdown-item>
        <b-dropdown-item v-b-modal.SaveTZServ>Сохранить исходные данные на сервере</b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item disabled>Сохранить всё локально _dev</b-dropdown-item>
        <b-dropdown-item disabled>Сохранить всё на сервере _dev</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown text="Вид">
        <b-dropdown-item disabled>Отметить</b-dropdown-item>
        <b-dropdown-item @click='pause'>Вращение, перемещение</b-dropdown-item>
        <b-dropdown-item disabled>Сечения</b-dropdown-item>
        <b-dropdown-item disabled>Нумерация</b-dropdown-item>
        <b-dropdown-item disabled>Сброс</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown text="Точки">
        <b-dropdown-item v-b-modal.Point3Coord>Ввести точку по трем координатам</b-dropdown-item>
        <b-dropdown-item disabled>Транслировать премещением</b-dropdown-item>
        <b-dropdown-item disabled>Транслировать вращением</b-dropdown-item>
        <b-dropdown-item disabled>Ввести точку на линии</b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item @click='showPoints'>Показать</b-dropdown-item>
        <b-dropdown-item @click='hidePoints'>Скрыть</b-dropdown-item>
        <b-dropdown-item v-b-modal.PointDel>Удалить</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown text="Линии">
        <b-dropdown-item v-b-modal.Line2Pt>Прямая по двум точкам</b-dropdown-item>
        <b-dropdown-item disabled>Дуга</b-dropdown-item>
        <b-dropdown-item disabled>Сплайн</b-dropdown-item>
        <b-dropdown-item disabled>Транслировать премещением</b-dropdown-item>
        <b-dropdown-item disabled>Транслировать вращением</b-dropdown-item>
        <b-dropdown-item disabled>Разбить линию</b-dropdown-item>
        <b-dropdown-item disabled>Удалить линию</b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item @click='showLines'>Показать</b-dropdown-item>
        <b-dropdown-item @click='hideLines'>Скрыть</b-dropdown-item>
        <b-dropdown-item v-b-modal.LineDel>Удалить</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown text="Поверхности">
        <b-dropdown-item v-b-modal.Plane>Плоская поверхность по точкам</b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item @click='showPlanes'>Показать</b-dropdown-item>
        <b-dropdown-item @click='hidePlanes'>Скрыть</b-dropdown-item>
        <b-dropdown-item v-b-modal.PlaneDel>Удалить</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown text="Стержни">
        <b-dropdown-item v-b-modal.LineToBeam>Связать с линиями</b-dropdown-item>
        <b-dropdown-item v-b-modal.BeamToProp>Связать с свойствами</b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item @click='showBeams'>Показать</b-dropdown-item>
        <b-dropdown-item @click='hideBeams'>Скрыть</b-dropdown-item>
        <b-dropdown-item v-b-modal.BeamDel>Удалить</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown text="Пластины">
        <b-dropdown-item v-b-modal.PlaneToPlate>Связать с поверхностью</b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item @click='showPlates'>Показать</b-dropdown-item>
        <b-dropdown-item @click='hidePlates'>Скрыть</b-dropdown-item>
        <b-dropdown-item v-b-modal.PlateDel>Удалить</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown text="Cвойства стержней, пластин и материалов">
        <b-dropdown-item v-b-modal.BeamProp>Группы свойств стержней</b-dropdown-item>
        <b-dropdown-item v-b-modal.PlateProp>Группы свойств пластин</b-dropdown-item>
        <b-dropdown-item v-b-modal.MaterialProp>Группы свойств материалов</b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item v-b-modal.PropsTable>Посмотреть таблицу заданных свойств</b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item v-b-modal.DelBeamProp disabled>Удалить группу свойств стержней(deprecated)</b-dropdown-item>
        <b-dropdown-item v-b-modal.DelPlateProp disabled>Удалить группу свойств пластин(deprecated)</b-dropdown-item>
        <b-dropdown-item v-b-modal.DelMaterialProp disabled>Удалить группу свойств материалов(deprecated)</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown text="Граничные условия и нагрузки">
        <b-dropdown-item v-b-modal.PointBoundary>Точки</b-dropdown-item>
        <b-dropdown-item v-b-modal.LineBoundary disabled>Линии</b-dropdown-item>
        <b-dropdown-item v-b-modal.DelPointBoundary>Удалить ГУ в точках</b-dropdown-item>
        <b-dropdown-item v-b-modal.DelLineBoundary disabled>Удалить ГУ на линиях</b-dropdown-item>
      </b-nav-item-dropdown>
      <!-- <b-nav-item-dropdown text="Расчеты">
        <b-dropdown-item disabled>Статика</b-dropdown-item>
        <b-dropdown-item disabled>Гармонический анализ</b-dropdown-item>
        <b-dropdown-item disabled>Собственные частоты и формы</b-dropdown-item>
        <b-dropdown-item disabled>Устойчивость</b-dropdown-item>
        <b-dropdown-item v-b-modal.LinDynamic>Линейная динамика</b-dropdown-item>
      </b-nav-item-dropdown> -->
      <b-nav-item v-b-modal.CalcType>Тип рассчета</b-nav-item>
      <!-- <b-nav-item-dropdown text="Результаты">
        <b-dropdown-item disabled>Перемещения</b-dropdown-item>
        <b-dropdown-item disabled>Усилия и напряжения</b-dropdown-item>
      </b-nav-item-dropdown> -->
      <b-nav-item-dropdown text="Справка">
        <b-dropdown-item disabled>Помощь</b-dropdown-item>
        <b-dropdown-item disabled>О проекте</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-nav>

    <div
      id="info"
      style="position: absolute;
				top: 10px;
				width: 100%;
				text-align: center;"
    >Информация</div>

    <canvas id="canvas"></canvas>

    <div
      id="inset"
      style="background-color: transparent;border: none;margin: 0px;padding: 0px;position: absolute;bottom: 0px;z-index: 10;"
    ></div>

    <script type="x-shader/x-vertex" id="vertexshader">
  attribute float size;
  attribute vec3 customColor;
  varying vec3 vColor;
  void main() {
  	vColor = customColor;
  	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
  	gl_PointSize = size * ( 300.0 / -mvPosition.z );
  	gl_Position = projectionMatrix * mvPosition;
  }
    </script>
    <script type="x-shader/x-fragment" id="fragmentshader">
  uniform vec3 color;
  uniform sampler2D texture;
  varying vec3 vColor;
  void main() {
  	gl_FragColor = vec4( color * vColor, 1.0 );
  	gl_FragColor = gl_FragColor * texture2D( texture, gl_PointCoord );
  	if ( gl_FragColor.a < ALPHATEST ) discard;
  }
    </script>

    <script src="/js/read.js"></script>
    <script src="/js/write.js"></script>
    <script src="/js/sceneSubjects/point.js"></script>
    <script src="/js/sceneSubjects/line.js"></script>
    <script src="/js/sceneSubjects/plane.js"></script>
    <script src="/js/sceneSubjects/plate.js"></script>
    <script src="/js/sceneSubjects/light.js"></script>
    <script src="/js/sceneSubjects/axis.js"></script>
    <script src="/js/sceneSubjects/beam.js"></script>
    <script src="/js/sceneSubjects/legend.js"></script>
    <script src="/js/sceneSubjects/bound.js"></script>
    <script src="/js/sceneManager.js"></script>
    <script src="/js/main.js"></script>
  </section>
</template>
<style>
  html, body {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>

<script>
import Header from "~/components/Header.vue";

import Point3Coord from "../components/Point3Coord.vue";
import PointDel from "../components/PointDel.vue";

import SaveTZLocal from "../components/SaveTZLocal.vue";
import SaveTZServ from "../components/SaveTZServ.vue";
import OpenFileLocal from "../components/OpenFileLocal.vue";
import OpenFileServList from "../components/OpenFileServList.vue";

import Line2Pt from "../components/Line2Pt.vue";
import LineDel from "../components/LineDel.vue";
import LineToBeam from "../components/LineToBeam.vue";
import BeamDel from "../components/BeamDel.vue";
import Plane from "../components/Plane.vue";

import BeamToProp from "../components/BeamToProp.vue";
import BeamProp from "../components/BeamProp.vue";
import DelBeamProp from "../components/DelBeamProp.vue";
import MaterialProp from "../components/MaterialProp.vue";
import DelMaterialProp from "../components/DelMaterialProp.vue";
import PointBoundary from "../components/PointBoundary.vue";

import CalcType from "../components/CalcType.vue";
import LinDynamic from "../components/LinDynamic.vue";

import DelPointBoundary from "../components/DelPointBoundary.vue";
import LineBoundary from "../components/LineBoundary.vue";
import DelLineBoundary from "../components/DelLineBoundary.vue";

import PlaneToPlate from "../components/PlaneToPlate.vue";
import PlateDel from "../components/PlateDel.vue";
import PlateProp from "../components/PlateProp.vue";
import DelPlateProp from "../components/DelPlateProp.vue";

import PropsTable from "../components/PropsTable.vue";

import Strapi from "strapi-sdk-javascript/build/main";

export default {
  components: {
    Header,
    Point3Coord,
    SaveTZLocal,
    PointDel,
    SaveTZServ,
    OpenFileLocal,
    Line2Pt,
    Plane,
    LineDel,
    LineToBeam,
    BeamDel,
    OpenFileServList,
    BeamToProp,
    BeamProp,
    DelBeamProp,
    MaterialProp,
    DelMaterialProp,
    PointBoundary,
    LinDynamic,
    CalcType,
    DelPointBoundary,
    LineBoundary,
    DelLineBoundary,
    PlaneToPlate,
    PlateDel,
    PlateProp,
    DelPlateProp,
    PropsTable
  },
  data() {
    return {
    };
  },
  created: function() {
    let strapiObj;
    let strapi = new Strapi();
    strapi.axios
      .get("http://127.0.0.1:1337")
      .then(response => {
        this.$store.commit("url/setUrl", "http://127.0.0.1:1337");
        strapiObj = new Strapi("http://127.0.0.1:1337");
        this.$store.commit("url/setStrapiObj", strapiObj);
      })
      .catch(error => {});
    strapi = null;
  },
  methods: {
    pause(){
      pause = !pause;
    },
    newProblem() {
      sceneManager.cleanScene();
      initProblem();
    },
    showPoints(){
      if(sceneManager.getPointsArr().length == 0){
        sceneManager.drawAllPoints();
      }
    },
    hidePoints(){
      sceneManager.removePoints();
    },
    showLines(){
      if(sceneManager.getLinesArr().length == 0){
        sceneManager.drawAllLines();
      }
    },
    hideLines(){
      sceneManager.removeLines();
    },
    showPlanes(){
      if(sceneManager.getPlanesArr().length == 0){
        sceneManager.drawAllPlanes();
      }
    },
    hidePlanes(){
      sceneManager.removePlanes();
    },
    showBeams(){
      if(sceneManager.getBeamsArr().length == 0){
        sceneManager.drawAllBeams();
      }
    },
    hideBeams(){
      sceneManager.removeBeams();
    },
    showPlates(){
      if(sceneManager.getPlatesArr().length == 0){
        sceneManager.drawAllPlates();
      }
    },
    hidePlates(){
      sceneManager.removePlates();
    }
  }
};
</script>






