<template>

	<b-modal id="OpenFileLocal">
		<div slot="modal-title">
			Загрузить проект локально
		</div>
		<b-form-file v-model='file' accept=".txt" id="fileName" placeholder="Выберите файл..."></b-form-file>
            <b-form-textarea id="textarea1"
            placeholder="Enter something"
            :rows="3"
            :max-rows="6">
        </b-form-textarea>
		<div slot="modal-footer">
			<b-btn @click="openLocal" variant="primary">Принять</b-btn>
			<b-btn @click="close">Отмена</b-btn>
		</div>
	</b-modal>

</template>

<script>
export default {
  data() {
    return {
      file: null
    };
  },
  methods: {
    openLocal() {
      let reader = new FileReader();
      let selectedFile = $("#fileName")[0].files[0];
      reader.readAsText(selectedFile);
      reader.onload = function(event) {
        initProblem();
        ProblemText = reader.result;
        ParseFromString();
        sceneManager.refresh();
        $("#textarea1").val(ProblemText);
      };
	},
	close(){
		this.$root.$emit('bv::hide::modal','OpenFileLocal')
	}
  }
};
</script>
