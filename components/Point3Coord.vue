<template>
  <b-modal id="Point3Coord">
    <div slot="modal-title">Введите три координаты и номер точки</div>
		
    <b-form @submit.stop.prevent="addPoint" @reset="addPointMore">
      <p>
        Первая координата
        <b-form-input v-model="pointX" id="pointX"/>
      </p>
      <p>
        Вторая координата
        <b-form-input v-model="pointY" id="pointY"/>
      </p>
      <p>
        Третья координата
        <b-form-input v-model="pointZ" id="pointZ"/>
      </p>
      <p>
        Номер точки
        <b-form-input v-model="pointN" id="pointN"/>
      </p>
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
      pointX: null,
      pointY: null,
      pointZ: null,
      pointN: 1
    };
  },
  methods: {
    checkInput: function() {
      this.pointX = Number(this.pointX);
      this.pointY = Number(this.pointY);
      this.pointZ = Number(this.pointZ);
      if (
        isNaN(this.pointX) ||
        isNaN(this.pointY) ||
        isNaN(this.pointZ) ||
        this.pointN < 1
      ) {
        return false;
      } else {
        return true;
      }
    },
    addPoint: function() {
      if (this.checkInput() === true) {
        if (
          readPointCoord(
            AllPoints,
            this.pointX,
            this.pointY,
            this.pointZ,
            this.pointN
          )
        ) {
          sceneManager.addPoint(AllPoints[0]);
          this.pointX = null;
          this.pointY = null;
          this.pointZ = null;
          this.pointN++;
        }
        return true;
      } else {
        alert("Неверный ввод!");
        return false;
      }
    },
    addPointMore: function() {
      if (this.addPoint() === true) {
        this.$root.$emit("bv::hide::modal", "Point3Coord");
      }
    }
  }
};
</script>


