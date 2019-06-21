<template>
	<b-modal id="PointDel">
		<div slot='modal-title'>
			Удалить точки с по
		</div>
		<b-form @submit.stop.prevent='delPoints' @reset='delPointsClose'>
			<b-form-group label='Начальный номер'>
				<b-form-input id='PtDelBeg' required type='number'></b-form-input>
			</b-form-group>
			<b-form-group label='Последний номер'>
				<b-form-input id='PtDelEnd' required type='number'></b-form-input>
			</b-form-group>
			<b-btn type='submit' variant='primary'>Принять</b-btn>
			<b-btn type='reset' variant='secondary'>Принять и закрыть</b-btn>
		</b-form>
		<div slot='modal-footer'></div>
	</b-modal>
</template>


<script>
export default {
  methods: {
    delPoints() {
      if (AllPoints.length != 0) {
				DelPoints(AllPoints);
				sceneManager.removePoints();
				sceneManager.drawAllPoints(AllPoints);
				return 1;
      } else {
				alert("Dont have points!");
				return 0;
      }
		},
		delPointsClose(){
			if(this.delPoints() == 1){
				this.$root.$emit("bv::hide::modal", "PointDel");
			}
		}
  }
};
</script>
