<template>
  <b-modal id="Plane">
    <div slot="modal-title">Плоскость по точкам</div>
    <b-form @submit.stop.prevent="addPlane" @reset="addPlaneClose">
      <b-form-group label="Количество точек">
        <b-form-select v-model="selected" :options="options"></b-form-select>
      </b-form-group>
      <b-form-group label="Номер первой точки">
        <b-form-input v-model="point1N" required type="number"></b-form-input>
      </b-form-group>
      <b-form-group label="Номер второй точки">
        <b-form-input v-model="point2N" required type="number"></b-form-input>
      </b-form-group>
      <b-form-group label="Номер третьей точки">
        <b-form-input v-model="point3N" required type="number"></b-form-input>
      </b-form-group>
      <b-form-group v-if="selected=='four'" label="Номер четвертой точки">
        <b-form-input v-model="point4N" required type="number"></b-form-input>
      </b-form-group>
      <b-form-group label="Номер плоскости">
        <b-form-input v-model="planeN" required type="number"></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Принять</b-button>
      <b-button type="reset" variant="secondary">Принять и закрыть</b-button>
    </b-form>
    <div slot="modal-footer"></div>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      point1N: null,
      point2N: null,
      point3N: null,
      point4N: null,
      planeN: 1,
      selected: "three",
      options: [
        { value: "three", text: "Плоскость по трем точкам" },
        { value: "four", text: "Плоскость по четырем точкам" }
      ]
    };
  },
  methods: {
    clear: function() {
      this.point1N = null;
      this.point2N = null;
      this.point3N = null;
      this.point4N = null;
      this.planeN++;
    },
    checkInput: function() {
      if (
        this.planeN < 1 ||
        this.point1N < 1 ||
        this.point2N < 1 ||
        this.point3N < 1 ||
        this.point1N === this.point2N ||
        this.point1N === this.point3N ||
        this.point2N === this.point3N
      ) {
        return false;
      } else {
        if (this.selected == "four") {
          if (
            this.point4N < 1 ||
            this.point4N === this.point1N ||
            this.point4N === this.point2N ||
            this.point4N === this.point3N
          ) {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      }
    },
    addPlane: function() {
      if (this.checkInput() === true) {
        let pointVec=[];
        pointVec.push(this.point1N);
        pointVec.push(this.point2N);
        pointVec.push(this.point3N);
        if(this.selected=="four"){
          pointVec.push(this.point4N);
        }
        pointVec.push(this.planeN);
        if(readPlane(AllPlanes,pointVec)){
          sceneManager.addPlane(AllPlanes[0]);
          return true;
        }
      }else{
        alert('Неверный ввод 1');
      }
    },
    addPlaneClose: function() {
      if (this.addPlane() === true) {
        this.$root.$emit("bv::hide::modal", "Plane");
      }
    }
  }
};
</script>


