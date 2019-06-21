<template>
    <b-modal id="LineToBeam">
        <div slot='modal-title'>
            Образовать стержни из линий
        </div>
        <b-form @submit.stop.prevent='lnBeam' @reset='lnBeamClose'>
            <b-form-group label='Начальный номер'>
                <b-form-input v-model='lnBeamBeg' type='number' required></b-form-input>
            </b-form-group>
            <b-form-group label='Последний номер'>
                <b-form-input v-model='lnBeamEnd' type='number' required></b-form-input>
            </b-form-group>
            <b-form-group label='Материал'>
                <b-form-input v-model='matG' type='number' required></b-form-input>
            </b-form-group>
            <b-form-group label='Группа свойств'>
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
      lnBeamBeg: null,
      lnBeamEnd: null,
      matG: null,
      proG: null
    };
  },
  methods: {
    checkInput: function() {
      if (this.lnBeamBeg > this.lnBeamEnd) {
        return false;
      } else {
        return true;
      }
    },
    lnBeam: function() {
      if (this.checkInput() == true) {
        let haveLines = readBeamFromLine(
          this.lnBeamBeg,
          this.lnBeamEnd,
          this.matG,
          this.proG
        );
        if (haveLines) {
          sceneManager.removeBeams();
          sceneManager.drawAllBeams(AllBeams);
        }
        return 1;
      } else {
        alert("Индекс первой линии должен быть меньше последней.");
        return 0;
      }
    },
    lnBeamClose() {
      if (this.lnBeam() == 1) {
        this.lnBeamBeg = null;
        this.lnBeamEnd = null;
        this.matG = null;
        this.proG = null;
        this.$root.$emit("bv::hide::modal", "LineToBeam");
      }
    }
  }
};
</script>

