<template>
  <b-modal ref="PointBoundKin" id="PointBoundKin">
    <div slot="modal-title">Кинематические граничные условия</div>
    <b-form @submit.stop.prevent="pointBoundKin" @reset="pointBoundKinClose">
      <b-form-group label="Перемещение по первой координате">
        <b-form-input v-model="disX" type="number" required></b-form-input>
      </b-form-group>
      <b-form-group label="Перемещение по второй координате">
        <b-form-input v-model="disY" type="number" required></b-form-input>
      </b-form-group>
      <b-form-group label="Перемещение по третьей координате">
        <b-form-input v-model="disZ" type="number" required></b-form-input>
      </b-form-group>
      <!-- <b-form-group label="Поворот вокруг первой координаты">
        <b-form-input v-model="rotX" type="number" required></b-form-input>
      </b-form-group>
      <b-form-group label="Поворот вокруг второй координаты">
        <b-form-input v-model="rotY" type="number" required></b-form-input>
      </b-form-group>
      <b-form-group label="Поворот вокруг третьей координаты">
        <b-form-input v-model="rotZ" type="number" required></b-form-input>
      </b-form-group> -->
      <b-button type="submit" variant="primary">Принять</b-button>
      <b-button type="reset" variant="secondary">Принять и закрыть</b-button>
    </b-form>
    <div slot="modal-footer"></div>
  </b-modal>
</template>

<script>
import PointBoundary from "./PointBoundary.vue";

export default {
  props: {
    inputPointBoundN: String
  },
  data() {
    return {
      pointBoundN: this.inputPointBoundN,
      disX: null,
      disY: null,
      disZ: null,
      rotX: null,
      rotY: null,
      rotZ: null
    };
  },
  methods: {
    clear: function(){
      this.disX = null,
      this.disY = null,
      this.disZ = null,
      this.rotX = null,
      this.rotY = null,
      this.rotZ = null
    },
    pointBoundKin: function() {
      this.disX = Number(this.disX);
      this.disY = Number(this.disY);
      this.disZ = Number(this.disZ);
      //this.rotX = Number(this.rotX);
      //this.rotY = Number(this.rotY);
      //this.rotZ = Number(this.rotZ);
      if (
        isNaN(this.disX) ||
        isNaN(this.disY) ||
        isNaN(this.disZ) 
        //isNaN(this.rotX) ||
        //isNaN(this.rotY) ||
        //isNaN(this.rotZ)
      ) {
        alert("Неверный ввод");
        return false;
      }
      var found = false;
      var i;
      var PointNumberMarked = this.inputPointBoundN;
      for (i = 0; i < PointDiss.length; i++) {
        if (PointNumberMarked == PointDiss[i][3]) {
          PointDiss[i][0] = this.disX;
          PointDiss[i][1] = this.disY;
          PointDiss[i][2] = this.disZ;
          found = true;
          i = PointDiss.length;
        }
      }
      if (!found) {
        var temp = [this.disX, this.disY, this.disZ, PointNumberMarked];
        PointDiss.push(temp);
      }

      // found = false;
      // for (i = 0; i < PointRots.length; i++) {
      //   if (PointNumberMarked == PointRots[i][3]) {
      //     PointRots[i][0] = this.rotX;
      //     PointRots[i][1] = this.rotY;
      //     PointRots[i][2] = this.rotZ;
      //     found = true;
      //     i = PointRots.length;
      //   }
      // }
      // if (!found) {
      //   var temp = [this.rotX, this.rotY, this.rotZ, PointNumberMarked];
      //   PointRots.push(temp);
      // }

      sceneManager.refresh();
      this.clear();
      return true;
    },
    pointBoundKinClose: function() {
      if (this.pointBoundKin() === true) {
        this.$root.$emit("bv::hide::modal", "PointBoundKin");
      }
    }
  }
};
</script>

