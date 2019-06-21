<template>
	<b-modal id="SaveTZLocal">
		<div slot='modal-title'>
			Запись в файл локально
		</div>
		<div slot='modal-footer'>
			<b-btn variant='primary' @click='writeLocal'>Сохранить</b-btn>
			<b-btn variant='secondary' @click='close'>Закрыть</b-btn>
		</div>
	</b-modal>
</template>


<script>
export default {
  methods: {
    writeLocal() {
      let res = false;
      SaveToString();
      let F1 = "";
      res = WriteFile(F1);
		},
		close(){
			this.$root.$emit("bv::hide::modal", "SaveTZLocal");
		}
  }
};
</script>
