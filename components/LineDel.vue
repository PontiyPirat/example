<template>
    <b-modal id="LineDel">
        <div slot='modal-title'>
            Удаление линий
        </div>
        <b-form @submit.stop.prevent='delLine' @reset='delLineClose'>
            <p>Удалить линии с по</p>
            <p>Будут удалены соответсвующие стержни!</p>
            <b-form-group label='Начальный номер'>
                <b-form-input v-model='lnDelBeg' type='number' required></b-form-input>
            </b-form-group>
            <b-form-group label='Последний номер'>
                <b-form-input v-model='lnDelEnd' type='number' required></b-form-input>
            </b-form-group>
            <b-form-group>
                <b-form-checkbox v-model='lnDelPoints' id='lnDelPoints' value='true' unchecked-value='false'>
                    <div onselectstart="return false">Удалять точки на линии</div>
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
      lnDelBeg: null,
      lnDelEnd: null,
      lnDelPoints: "false"
    };
  },
  methods: {
    checkInput() {
      if (this.lnDelBeg > this.lnDelEnd) {
        return false;
      } else {
        return true;
      }
    },
    delLine() {
      if (this.checkInput()) {
        delLines(this.lnDelBeg, this.lnDelEnd);
        return 1;
      } else {
        alert("Начальный номер должен быть меньше последнего!");
        return 0;
      }
    },
    delLineClose() {
      if (this.delLine() == 1) {
        this.lnDelBeg = null;
        this.lnDelEnd = null;
        this.lnDelPoints = "false";
        this.$root.$emit("bv::hide::modal", "LineDel");
      }
    }
  }
};
</script>

