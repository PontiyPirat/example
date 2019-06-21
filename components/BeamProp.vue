<template>
  <b-modal id="BeamProp">
    <div slot="modal-title">Свойства сечения стержней</div>
    <b-form @submit.stop.prevent="beamProp" @reset="beamPropClose">
      <b-form-group label="Площадь сечения">
        <b-form-input v-model="crossSection" required></b-form-input>
      </b-form-group>
      <b-form-group label="Момент инерции 1">
        <b-form-input v-model="momInerX" required></b-form-input>
      </b-form-group>
      <b-form-group label="Момент инерции 2">
        <b-form-input v-model="momInerY" required></b-form-input>
      </b-form-group>
      <b-form-group label="Круговой момент инерции">
        <b-form-input v-model="momInerR" required></b-form-input>
      </b-form-group>
      <b-form-group label="Момент сопротивления 1">
        <b-form-input v-model="momSoprX" required></b-form-input>
      </b-form-group>
      <b-form-group label="Момент сопротивления 2">
        <b-form-input v-model="momSoprY" required></b-form-input>
      </b-form-group>
      <b-form-group label="Номер группы свойств">
        <b-form-input v-model="beamPropNum" required></b-form-input>
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
      crossSection: null,
      momInerX: null,
      momInerY: null,
      momInerR: null,
      momSoprX: null,
      momSoprY: null,
      beamPropNum: null
    };
  },
  methods: {
    clear: function() {
      this.crossSection = null;
      this.momInerX = null;
      this.momInerY = null;
      this.momInerR = null;
      this.momSoprX = null;
      this.momSoprY = null;
      this.beamPropNum = null;
    },
    beamProp: function() {
      this.crossSection = Number(this.crossSection);
      this.momInerX = Number(this.momInerX);
      this.momInerY = Number(this.momInerY);
      this.momInerR = Number(this.momInerR);
      this.momSoprX = Number(this.momSoprX);
      this.momSoprY = Number(this.momSoprY);
      this.beamPropNum = Number(this.beamPropNum);
      if (
        isNaN(this.crossSection) ||
        isNaN(this.momInerX) ||
        isNaN(this.momInerY) ||
        isNaN(this.momInerR) ||
        isNaN(this.momSoprX) ||
        isNaN(this.momSoprY) ||
        this.beamPropNum < 0
      ) {
        alert("Неверный ввод");
        return false;
      }
      var index;
      let isChanged = false;
      for (index = 0; index < AllBeamProperty.length; index++) {
        if (AllBeamProperty[index][6] == this.beamPropNum) {
          if (
            confirm(
              "Группа свойств с номером " + this.beamPropNum + " будет замещен"
            )
          ) {
            AllBeamProperty[index][0] = this.crossSection;
            AllBeamProperty[index][1] = this.momInerX;
            AllBeamProperty[index][2] = this.momInerY;
            AllBeamProperty[index][3] = this.momInerR;
            AllBeamProperty[index][4] = this.momSoprX;
            AllBeamProperty[index][5] = this.momSoprY;
            AllBeamProperty[index][6] = this.beamPropNum;
            isChanged = true;
          } else return false;
        }
      }
      if (!isChanged) {
        let BeamProperty = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0];
        BeamProperty[0] = this.crossSection;
        BeamProperty[1] = this.momInerX;
        BeamProperty[2] = this.momInerY;
        BeamProperty[3] = this.momInerR;
        BeamProperty[4] = this.momSoprX;
        BeamProperty[5] = this.momSoprY;
        BeamProperty[6] = this.beamPropNum;
        AllBeamProperty.push(BeamProperty);
      }
      this.clear();
      return true;
    },

    beamPropClose: function() {
      if (this.beamProp() === true) {
        this.$root.$emit("bv::hide::modal", "BeamProp");
      }
    }
  }
};
</script>

