<template>
  <b-modal id="DelPointBoundary">
    <div slot="modal-title">Удаление всех ГУ в точках</div>
    <b-form @submit.stop.prevent="delPointsBoundFun" @reset="close">
      <b-form-group label="Номер начальной точки">
        <b-form-input v-model="delPointBoundBegNum" type="number" required></b-form-input>
      </b-form-group>
      <b-form-group label="Номер конечной точки">
        <b-form-input v-model="delPointBoundEndNum" type="number" required></b-form-input>
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
      delPointBoundBegNum: null,
      delPointBoundEndNum: null
    };
  },
  methods: {
    delPointsBoundFun() {
      if (
        this.delPointBoundBegNum < 0 ||
        this.delPointBoundEndNum < 0 ||
        this.delPointBoundEndNum < this.delPointBoundBegNum
      ) {
        alert("Неверный ввод!");
        return false;
      }
      for (let indpb = this.delPointBoundBegNum; indpb <= this.delPointBoundEndNum; indpb++) {
        var PDLen = PointDiss.length - 1;
        var found = false;
        for (let ind = 0; ind < PointDiss.length; ind++) {
          if (PointDiss[ind][3] == indpb) {
            PointDiss[ind][0] = PointDiss[PDLen][0];
            PointDiss[ind][1] = PointDiss[PDLen][1];
            PointDiss[ind][2] = PointDiss[PDLen][2];
            PointDiss[ind][3] = PointDiss[PDLen][3];
            ind = PDLen;
            found = true;
          }
        }
        if (found) {
          PointDiss.pop();
        }

        PDLen = PointRots.length - 1;
        found = false;
        for (let ind = 0; ind < PointRots.length; ind++) {
          if (PointRots[ind][3] == indpb) {
            PointRots[ind][0] = PointRots[PDLen][0];
            PointRots[ind][1] = PointRots[PDLen][1];
            PointRots[ind][2] = PointRots[PDLen][2];
            PointRots[ind][3] = PointRots[PDLen][3];
            ind = PDLen;
            found = true;
          }
        }
        if (found) {
          PointRots.pop();
        }

        PDLen = PointForces.length - 1;
        found = false;
        for (let ind = 0; ind < PointForces.length; ind++) {
          if (PointForces[ind][3] == indpb) {
            PointForces[ind][0] = PointForces[PDLen][0];
            PointForces[ind][1] = PointForces[PDLen][1];
            PointForces[ind][2] = PointForces[PDLen][2];
            PointForces[ind][3] = PointForces[PDLen][3];
            ind = PDLen;
            found = true;
          }
        }
        if (found) {
          PointForces.pop();
        }

        PDLen = PointMoments.length - 1;
        found = false;
        for (let ind = 0; ind < PointMoments.length; ind++) {
          if (PointMoments[ind][3] == indpb) {
            PointMoments[ind][0] = PointMoments[PDLen][0];
            PointMoments[ind][1] = PointMoments[PDLen][1];
            PointMoments[ind][2] = PointMoments[PDLen][2];
            PointMoments[ind][3] = PointMoments[PDLen][3];
            ind = PDLen;
            found = true;
          }
        }
        if (found) {
          PointMoments.pop();
        }

        PDLen = PointAs.length - 1;
        found = false;
        for (ind = 0; ind < PointAs.length; ind++) {
          if (PointAs[ind][3] == indpb) {
            PointAs[ind][0] = PointAs[PDLen][0];
            PointAs[ind][1] = PointAs[PDLen][1];
            PointAs[ind][2] = PointAs[PDLen][2];
            PointAs[ind][3] = PointAs[PDLen][3];
            ind = PDLen;
            found = true;
          }
        }
        if (found) {
          PointAs.pop();
        }

        PDLen = PointKappas.length - 1;
        found = false;
        for (ind = 0; ind < PointKappas.length; ind++) {
          if (PointKappas[ind][3] == indpb) {
            PointKappas[ind][0] = PointKappas[PDLen][0];
            PointKappas[ind][1] = PointKappas[PDLen][1];
            PointKappas[ind][2] = PointKappas[PDLen][2];
            PointKappas[ind][3] = PointKappas[PDLen][3];
            ind = PDLen;
            found = true;
          }
        }
        if (found) {
          PointKappas.pop();
        }
      }
      return true;
    },
    close() {
      if (this.delPointsBoundFun() == true) {
        this.$root.$emit("bv::hide::modal", "DelPointBoundary");
      }
    },
    clear() {
      this.this.delPointBoundBegNum = null;
      this.this.delPointBoundEndNum = null;
    }
  }
};
</script>

