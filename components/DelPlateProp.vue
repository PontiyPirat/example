<template>
  <b-modal id="DelPlateProp">
    <div slot="modal-title">Удаление группы свойств пластин</div>
    <b-form @submit.stop.prevent="delPlateProp" @reset="delPlatePropClose">
      <p>Группа будет удалена, если нет пластин со свойствами этой группы</p>
      <b-form-group label="Номер группы">
        <b-form-input v-model="delPlatePropNum" type="number" required></b-form-input>
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
      delPlatePropNum: null
    };
  },
  methods: {
    clear: function() {
      this.delPlatePropNum = null;
    },
    delPlateProp: function() {
      if (this.delPlatePropNum === null || this.delPlatePropNum < 0) {
        alert("Неверный ввод!");
        return false;
      }
      var index;
      for (index = 0; index < AllPlates.length; index++) {
        if (AllPlates[index][2] == this.delPlatePropNum) {
          alert("Данная группа свойств используется. Удаление невозможно.");
          return false;
        }
      }
      var Perep = false;
      for (index = 0; index < AllPlateProperty.length; index++) {
        if (this.delPlatePropNum == AllPlateProperty[index][6]) {
          Perep = true;
        }
        if (Perep && index < AllPlateProperty.length - 1) {
          AllPlateProperty[index][0] = AllPlateProperty[index + 1][0];
          AllPlateProperty[index][1] = AllPlateProperty[index + 1][1];
          AllPlateProperty[index][2] = AllPlateProperty[index + 1][2];
          AllPlateProperty[index][3] = AllPlateProperty[index + 1][3];
          AllPlateProperty[index][4] = AllPlateProperty[index + 1][4];
          AllPlateProperty[index][5] = AllPlateProperty[index + 1][5];
          AllPlateProperty[index][6] = AllPlateProperty[index + 1][6];
        }
      }
      if (!Perep) {
        alert("Группа свойств с таким номером не найдена");
        return false;
      }
      AllPlateProperty.pop();
      this.clear();
      return true;
    },
    delPlatePropClose: function() {
      if (this.delPlateProp() === true) {
        this.$root.$emit("bv::hide::modal", "DelPlateProp");
      }
    }
  }
};
</script>

