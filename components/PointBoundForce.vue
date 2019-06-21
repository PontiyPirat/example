<template>
  <b-modal id="PointBoundForce">
    <div slot="modal-title">Силовые граничные условия</div>
    <b-form @submit.stop.prevent="pointBoundForce">
      <b-form-group label="Сила вдоль первой координаты">
        <b-form-input v-model="FX" type="number" required></b-form-input>
      </b-form-group>
      <b-form-group label="Сила вдоль второй координаты">
        <b-form-input v-model="FY" type="number" required></b-form-input>
      </b-form-group>
      <b-form-group label="Сила вдоль третьей координаты">
        <b-form-input v-model="FZ" type="number" required></b-form-input>
      </b-form-group>
      <!-- <b-form-group label="Момент вокруг первой координаты">
        <b-form-input v-model="MX" type="number" required></b-form-input>
      </b-form-group>
      <b-form-group label="Момент вокруг второй координаты">
        <b-form-input v-model="MY" type="number" required></b-form-input>
      </b-form-group>
      <b-form-group label="Момент вокруг третьей координаты">
        <b-form-input v-model="MZ" type="number" required></b-form-input>
      </b-form-group> -->
      <b-button type="submit" variant="primary">Принять</b-button>
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
      FX: null,
      FY: null,
      FZ: null,
      MX: null,
      MY: null,
      MZ: null
    };
  },
  methods: {
    pointBoundForce: function() {
      this.FX = Number(this.FX);
      this.FY = Number(this.FY);
      this.FZ = Number(this.FZ);
      //this.MX = Number(this.MX);
      //this.MY = Number(this.MY);
      //this.MZ = Number(this.MZ);
      if (
        isNaN(this.FX) ||
        isNaN(this.FY) ||
        isNaN(this.FZ) 
        //isNaN(this.MX) ||
        //isNaN(this.MY) ||
        //isNaN(this.MZ)
      ) {
        alert("Неверный ввод");
        return false;
      }
      var found = false;
      let PointNumberMarked = this.inputPointBoundN;
      for (let ind = 0; ind < PointForces.length; ind++) {
        if (PointNumberMarked == PointForces[ind][3]) {
          PointForces[ind][0] = this.FX;
          PointForces[ind][1] = this.FY;
          PointForces[ind][2] = this.FZ;
          found = true;
          ind = PointForces.length;
        }
      }
      if (!found) {
        var temp = [this.FX, this.FY, this.FZ, PointNumberMarked];
        PointForces.push(temp);
      }

      // found = false;
      // for (let ind = 0; ind < PointMoments.length; ind++) {
      //   if (PointNumberMarked == PointMoments[ind][3]) {
      //     PointMoments[ind][0] = this.MX;
      //     PointMoments[ind][1] = this.MY;
      //     PointMoments[ind][2] = this.MZ;
      //     found = true;
      //     ind = PointMoments.length;
      //   }
      // }
      // if (!found) {
      //   var temp = [this.MX, this.MY, this.MZ, PointNumberMarked];
      //   PointMoments.push(temp);
      // }
      sceneManager.refresh();
      this.clear();
      this.$root.$emit("bv::hide::modal", "PointBoundForce");
      return true;
    },
    clear() {
      this.FX = null;
      this.FY = null;
      this.FZ = null;
      this.MX = null;
      this.MY = null;
      this.MZ = null;
    }
  }
};
</script>

