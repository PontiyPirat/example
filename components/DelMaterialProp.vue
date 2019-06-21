<template>
  <b-modal id="DelMaterialProp">
    <div slot="modal-title">Удаление материала</div>
    <p>Материал будет удален, если нигде неиспользуется</p>
    <b-form @submit.stop.prevent="materialDelete" @reset="materialDeleteClose">
      <b-form-group label="Номер группы">
        <b-form-input v-model="delMatNum" type="number" required></b-form-input>
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
      delMatNum: null
    };
  },
  methods: {
    clear: function() {
      this.delMatNum = null;
    },
    materialDelete: function() {
      if (this.delMatNum === null || this.delMatNum < 0) {
        alert("Неверный ввод!");
        return false;
      }
      var index;
      for (index = 0; index < AllBeams.length; index++) {
        if (AllBeams[index][1] == this.delMatNum) {
          alert("Данный материал используется. Удаление невозможно.");
          return false;
        }
      }
      var Perep = false;
      for (index = 0; index < AllMaterial.length; index++) {
        if (this.delMatNum == AllMaterial[index][4]) {
          Perep = true;
        }
        if (Perep && index < AllMaterial.length - 1) {
          AllMaterial[index][0] = AllMaterial[index + 1][0];
          AllMaterial[index][1] = AllMaterial[index + 1][1];
          AllMaterial[index][2] = AllMaterial[index + 1][2];
          AllMaterial[index][3] = AllMaterial[index + 1][3];
          AllMaterial[index][4] = AllMaterial[index + 1][4];
        }
      }
      if (!Perep) {
        alert("Материал с таким номером не найдена");
        return false;
      }
      AllMaterial.pop();
      this.clear();
      return true;
    },
    materialDeleteClose: function() {
      if (this.materialDelete() === true) {
        this.$root.$emit("bv::hide::modal", "DelMaterialProp");
      }
    }
  }
};
</script>

