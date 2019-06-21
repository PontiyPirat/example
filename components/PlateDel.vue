<template>
    <b-modal id="PlateDel">
        <div slot='modal-title'>
            Удаление пластин
        </div>
        <b-form @submit.stop.prevent='plateDel' @reset='plateDelClose'>
            <b-form-group label='Начальный номер'>
                <b-form-input v-model='plateDelBeg' type='number' required></b-form-input>
            </b-form-group>
            <b-form-group label='Последний номер'>
                <b-form-input v-model='plateDelEnd' type='number' required></b-form-input>
            </b-form-group>
            <b-form-group>
                <b-form-checkbox v-model='plateDelPoints' value='true' unchecked-value='false'>
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
      plateDelBeg: null,
      plateDelEnd: null,
      plateDelPoints: "false"
    };
  },
  methods: {
    checkInput() {
      if (this.plateDelBeg > this.plateDelEnd) {
        return false;
      } else {
        return true;
      }
    },
    plateDel() {
      if (this.checkInput()) {
        platesDel(this.plateDelBeg, this.plateDelEnd);
        return 1;
      } else {
        alert("Начальный номер должен быть меньше последнего!");
        return 0;
      }
    },
    plateDelClose() {
      if (this.plateDel() == 1) {
        this.plateDelBeg = null;
        this.plateDelEnd = null;
        this.plateDelPoints = "false";
        this.$root.$emit("bv::hide::modal", "PlateDel");
      }
    }
  }
};
</script>

