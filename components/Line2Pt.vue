<template>

	<b-modal id="Line2Pt">
		<div slot="modal-title">
			Введите номера начальной и конечной точек
		</div>
    <b-form @submit.stop.prevent='addLine' @reset="addLineClose">
      <b-form-group label='Номер первой точки'>
        <b-form-input v-model='point1N' id='point1N' required type='number'></b-form-input>
      </b-form-group>
      <b-form-group label='Номер второй точки'>
        <b-form-input v-model='point2N' id='point2N' required type='number'></b-form-input>
      </b-form-group>
      <b-form-group label='Номер линии'>
        <b-form-input v-model='lineN' id='lineN' required type='number'></b-form-input>
      </b-form-group>
      <b-button type='submit' variant="primary">Принять</b-button>
			<b-button type='reset' variant="secondary">Принять и закрыть</b-button>
    </b-form>
		<div slot="modal-footer">
			
		</div>
	</b-modal>

</template>

<script>
export default {
  data() {
    return {
      point1N: null,
      point2N: null,
      lineN: 1
    };
  },
  methods: {
    checkInput: function() {
      if (
        this.point1N === null ||
        this.point2N === null ||
        this.lineN < 1 ||
        this.point1N < 1 ||
        this.point2N < 1 ||
        this.point1N === this.point2N
      ) {
        return false;
      } else {
        return true;
      }
    },
    addLine: function() {
      if (this.checkInput() === true) {
        if (readLine2Pt(AllStrLines, this.point1N, this.point2N, this.lineN)) {
          sceneManager.addLine(AllStrLines[0]);
          this.point1N = null;
          this.point2N = null;
          this.lineN++;
        }
        return true;
      } else {
        alert("Неверный ввод!");
        return false;
      }
    },
    addLineClose: function() {
      if (this.addLine() === true) {
        this.$root.$emit("bv::hide::modal", "Line2Pt");
      }
    }
  }
};
</script>


