<template>
  <b-modal size="huge" id="Results" @shown="resize" hide-footer no-close-on-backdrop>
    <div slot="modal-title">
      <b-form inline>
        <b-form-select v-model="selected" :options="inputOptions"></b-form-select>
        <b-btn @click="choose">Выбрать</b-btn>
      </b-form>
    </div>

    <canvas id="canvasResult"></canvas>

    <div
      id="inset"
      style="width: 100px;height: 100px;background-color: transparent;border: none;margin: 0px;padding: 0px;position: absolute;top: 0px;left: 0px;z-index: 100;"
    ></div>

    <div
      id="legend"
      style="width: 100px;height: 100px;background-color: transparent;border: none;margin: 0px;padding: 0px;position: absolute;top: 50px;right: 100px;z-index: 200;"
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
    <div slot="modal-footer"></div>
  </b-modal>
</template>

<script>
import profile from "../pages/profile.vue";
export default {
  props: {
    inputOptions: Array
  },
  data() {
    return {
      selected: null
    };
  },
  methods: {
    removeAxis() {
      sceneManager.toggleAxis();
    },
    resize() {
      resizeCanvas();
    },
    choose() {
      initProblem();
      if(this.selected=="efSt"){
        ProblemText = AllResults.efSt;
      }
      if(this.selected=="deformSt"){
        ProblemText = AllResults.deformSt;
      }
      if(this.selected=="efDyn"){
        ProblemText = AllResults.efDyn;
      }
      ParseFromStringResult();
      sceneManager.reDrawLegend(minFuncMod,maxFuncMod);
      sceneManager.refresh();
    }
  }
};
</script>

