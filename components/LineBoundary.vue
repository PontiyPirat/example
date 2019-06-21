<template>
  <b-modal id="LineBoundary">
    <div slot="modal-title">Граничные условия для линии</div>
    <b-form @submit.prevent="oneLineBoundFun" @reset="close">
      <p>Введите номер линии, номер (имя) Системы координат и Граничные Условия</p>
      <b-form-group label="Номер линии">
        <b-form-input v-model="lineBoundaryN" type="number" required></b-form-input>
      </b-form-group>
      <b-form-group label="Номер или имя Системы координат">
        <b-form-input v-model="lineBoundarySKN" type="number" required></b-form-input>
      </b-form-group>
      <p>Распределенная сила</p>
      <b-form-radio-group v-model="rLineForce" stacked plain>
        <b-form-radio value="0">Полное значение силы</b-form-radio>
        <b-form-radio value="1">Погонное значение силы ГУ</b-form-radio>
      </b-form-radio-group>
      <b-form-group label="Значение по первой координате">
        <b-form-input v-model="lineFX" type="number" required></b-form-input>
      </b-form-group>
      <b-form-group label="Значение по второй координате">
        <b-form-input v-model="lineFY" type="number" required></b-form-input>
      </b-form-group>
      <b-form-group label="Значение по третьей координате">
        <b-form-input v-model="lineFZ" type="number" required></b-form-input>
      </b-form-group>
      <p>Коэффициент поддатливости упругого основания</p>
      <b-form-group label="Значение по второй координате">
        <b-form-input v-model="lineKUprX" type="number" required></b-form-input>
      </b-form-group>
      <b-form-group label="Значение по второй координате">
        <b-form-input v-model="lineKUprY" type="number" required></b-form-input>
      </b-form-group>
      <b-form-group label="Значение по третьей координате">
        <b-form-input v-model="lineKUprZ" type="number" required></b-form-input>
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
      lineBoundaryN: null,
      lineBoundarySKN: null,
      rLineForce: "0",
      lineFX: null,
      lineFY: null,
      lineFZ: null,
      lineKUprX: null,
      lineKUprY: null,
      lineKUprZ: null
    };
  },
  methods: {
    oneLineBoundFun: function(event) {
      var found = false;
      for (let i = 0; i < AllStrLines.length; i++) {
        if (AllStrLines[i][2] == this.lineBoundaryN) {
          found = true;
          break;
        }
      }
      if (!found) {
        alert("Линия не существует!");
        return false;
      }
      if (this.rLineForce == "0") {
        var LineLength = GetLineLength(this.lineBoundaryN);
        this.lineFX = this.lineFX / LineLength;
        this.lineFY = this.lineFY / LineLength;
        this.lineFZ = this.lineFZ / LineLength;
      }
      found = false;
      for (let i = 0; i < LineForces.length; i++) {
        if (LineForces[i][3] == this.lineBoundaryN) {
          LineForces[i][0] = this.lineFX;
          LineForces[i][1] = this.lineFY;
          LineForces[i][2] = this.lineFZ;
          found = true;
          break;
        }
      }
      if (!found) {
        var LocalLineForce = [
          this.lineFX,
          this.lineFY,
          this.lineFZ,
          this.lineBoundaryN
        ];
        LineForces.push(LocalLineForce);
      }

      found = false;
      for (let i = 0; i < LineAs.length; i++) {
        if (LineAs[i][3] == this.lineBoundaryN) {
          LineAs[i][0] = this.lineFX;
          LineAs[i][1] = this.lineFY;
          LineAs[i][2] = this.lineFZ;
          found = true;
          break;
        }
      }
      if (!found) {
        var LocalLineA = [
          this.lineKUprX,
          this.lineKUprY,
          this.lineKUprZ,
          this.lineBoundaryN
        ];
        LineAs.push(LocalLineA);
      }
      this.clear();
      return true;
    },
    close() {
      if (this.oneLineBoundFun() == true) {
        this.$root.$emit("bv::hide::modal", "LineBoundary");
      }
    },
    clear() {
      this.lineBoundaryN = null;
      this.lineBoundarySKN = null;
      this.rLineForce = "0";
      this.lineFX = null;
      this.lineFY = null;
      this.lineFZ = null;
      this.lineKUprX = null;
      this.lineKUprY = null;
      this.lineKUprZ = null;
    }
  }
};
</script>

