<template>
  <b-modal id="PlateProp">
    <div slot="modal-title">Свойства пластин</div>
    <b-form @submit.stop.prevent="plateProp" @reset="platePropClose">
      <b-form-group label="Толщина">
        <b-form-input v-model="thickness" required></b-form-input>
      </b-form-group>
      <b-form-group label="Номер группы свойств">
        <b-form-input v-model="platePropNum" required></b-form-input>
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
      thickness: null,
      platePropNum: null
    };
  },
  methods: {
    clear: function() {
      this.thickness = null;
      this.platePropNum = null;
    },
    plateProp: function() {
      this.thickness = Number(this.thickness);
      this.platePropNum = Number(this.platePropNum);
      if (
        isNaN(this.thickness) ||
        this.platePropNum < 0
      ) {
        alert("Неверный ввод");
        return false;
      }
      var index;
      let isChanged = false;
      for (index = 0; index < AllPlateProperty.length; index++) {
        if (AllPlateProperty[index][1] == this.platePropNum) {
          if (
            confirm(
              "Группа свойств с номером " + this.platePropNum + " будет замещен"
            )
          ) {
            AllPlateProperty[index][0] = this.crossSection;
            AllPlateProperty[index][1] = this.platePropNum;
            isChanged = true;
          } else return false;
        }
      }
      if (!isChanged) {
        let PlateProperty = [0.0, 0];
        PlateProperty[0] = this.thickness;
        PlateProperty[1] = this.platePropNum;
        AllPlateProperty.push(PlateProperty);
      }
      this.clear();
      return true;
    },

    platePropClose: function() {
      if (this.plateProp() === true) {
        this.$root.$emit("bv::hide::modal", "PlateProp");
      }
    }
  }
};
</script>

