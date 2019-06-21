<template>
  <b-modal id="MaterialProp">
    <div slot="modal-title">Свойства материала стержней</div>
    <b-form @submit.stop.prevent="materialProp" @reset="materialPropClose">
      <b-form-group label="Плотность">
        <b-form-input v-model="density" required></b-form-input>
      </b-form-group>
      <b-form-group label="Модуль нормальной упругости 1">
        <b-form-input v-model="modNormUpr" required></b-form-input>
      </b-form-group>
      <b-form-group label="Коэффициент Пуассона">
        <b-form-input v-model="puasson" required></b-form-input>
      </b-form-group>
      <b-form-group label="Коэффициент теплового расширения">
        <b-form-input v-model="teplRas" required></b-form-input>
      </b-form-group>
      <b-form-group label="Номер материала">
        <b-form-input v-model="matNum" required></b-form-input>
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
      density: null,
      modNormUpr: null,
      puasson: null,
      teplRas: null,
      matNum: null
    };
  },
  methods: {
    clear: function() {
      this.density = null;
      this.modNormUpr = null;
      this.puasson = null;
      this.teplRas = null;
      this.matNum = null;
    },
    materialProp: function() {
      this.density = Number(this.density);
      this.modNormUpr = Number(this.modNormUpr);
      this.puasson = Number(this.puasson);
      this.teplRas = Number(this.teplRas);
      this.matNum = Number(this.matNum);
      if (
        isNaN(this.density) ||
        isNaN(this.modNormUpr) ||
        isNaN(this.puasson) ||
        isNaN(this.teplRas) ||
        this.matNum < 0
      ) {
        alert("Неверный ввод!");
        return false;
      }
      var index;
      let isChanged = false;
      for (index = 0; index < AllMaterial.length; index++) {
        if (AllMaterial[index][4] == this.matNum) {
          if (confirm("Материал с номером " + this.matNum + " будет замещен")) {
            AllMaterial[index][0] = this.density;
            AllMaterial[index][1] = this.modNormUpr;
            AllMaterial[index][2] = this.puasson;
            AllMaterial[index][3] = this.teplRas;
            AllMaterial[index][4] = this.matNum;
            isChanged = true;
          } else return false;
        }
      }
      if (!isChanged) {
        let Material = [0.0, 0.0, 0.0, 0.0, 0];
        Material[0] = this.density;
        Material[1] = this.modNormUpr;
        Material[2] = this.puasson;
        Material[3] = this.teplRas;
        Material[4] = this.matNum;
        AllMaterial.push(Material);
      }

      this.clear();
      return true;
    },
    materialPropClose: function() {
      if (this.materialProp() === true) {
        this.$root.$emit("bv::hide::modal", "MaterialProp");
        this.clear();
      }
    }
  }
};
</script>

