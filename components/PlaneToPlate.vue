<template>
    <b-modal id="PlaneToPlate">
        <div slot='modal-title'>
            Образовать пластину из плоскости
        </div>
        <b-form @submit.stop.prevent='pTp' @reset='pTpClose'>
            <b-form-group label='Номер первой плоскости'>
                <b-form-input v-model='pTpBeg' type='number' required></b-form-input>
            </b-form-group>
            <b-form-group label='Номер последней плоскости'>
                <b-form-input v-model='pTpEnd' type='number' required></b-form-input>
            </b-form-group>
            <b-form-group label='Материал'>
                <b-form-input v-model='matG' type='number' required></b-form-input>
            </b-form-group>
            <b-form-group label='Группа свойств пластины'>
                <b-form-input v-model='proG' type='number' required></b-form-input>
            </b-form-group>
            <b-btn type='submit' variant='primary'>Принять</b-btn>
            <b-btn type='reset' variant='secondary'>Принять и закрыть</b-btn>
        </b-form>
        <div slot='modal-footer'></div>
    </b-modal>
</template>

<script>
export default {
  data() {
    return {
      pTpBeg: null,
      pTpEnd: null,
      matG: null,
      proG: null
    };
  },
  methods: {
    checkInput: function() {
      if (this.pTpBeg > this.pTpEnd) {
        return false;
      } else {
        return true;
      }
    },
    pTp: function() {
      if (this.checkInput() == true) {
        let havePlanes = readPlateFromPlane(
          this.pTpBeg,
          this.pTpEnd,
          this.matG,
          this.proG
        );
        if (havePlanes) {
          sceneManager.removePlates();
          sceneManager.drawAllPlates();
        }
        return 1;
      } else {
        alert("Индекс первой плоскости должен быть меньше последней.");
        return 0;
      }
    },
    pTpClose() {
      if (this.pTp() == 1) {
        this.pTpBeg = null;
        this.pTpEnd = null;
        this.matG = null;
        this.proG = null;
        this.$root.$emit("bv::hide::modal", "PlaneToPlate");
      }
    }
  }
};
</script>

