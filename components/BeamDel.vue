<template>
    <b-modal id="BeamDel">
        <div slot='modal-title'>
            Удаление стержней
        </div>
        <b-form @submit.stop.prevent='delBeam' @reset='delBeamClose'>
            <b-form-group label='Начальный номер'>
                <b-form-input v-model='beamDelBeg' type='number' required></b-form-input>
            </b-form-group>
            <b-form-group label='Последний номер'>
                <b-form-input v-model='beamDelEnd' type='number' required></b-form-input>
            </b-form-group>
            <b-form-group>
                <b-form-checkbox v-model='beamDelLines' value='true' unchecked-value='false'>
                    <div onselectstart="return false">Удалить соответствующие линии</div>
                </b-form-checkbox>
            </b-form-group>
            <b-form-group>
                <b-form-checkbox v-model='beamDelPoints' value='true' unchecked-value='false'>
                    <div onselectstart="return false">Удалить соответсвующие точки</div>
                </b-form-checkbox>
            </b-form-group>
            <b-button type='submit' variant='primary'>Принять</b-button>
            <b-button type='reset' variant='secondary'>Принять и закрыть</b-button>
        </b-form>
        <div slot='modal-footer'></div>
    </b-modal>
</template>

<script>
export default {
  data() {
    return {
      beamDelBeg: null,
      beamDelEnd: null,
      beamDelPoints: "false",
      beamDelLines: "false"
    };
  },
  methods: {
    checkInput() {
      if (this.beamDelBeg > this.beamDelEnd) {
        return false;
      } else {
        return true;
      }
    },
    delBeam() {
      if (this.checkInput()) {
        delBeams(this.beamDelBeg, this.beamDelEnd);
        return 1;
      } else {
        alert("Начальный номер должен быть меньше последнего!");
        return 0;
      }
    },
    delBeamClose() {
      if (this.delBeam() == 1) {
        this.beamDelBeg = null;
        this.beamDelEnd = null;
        this.beamDelPoints = "false";
        this.beamDelLines = "false";
        this.$root.$emit("bv::hide::modal", "LineDel");
      }
    }
  }
};
</script>

