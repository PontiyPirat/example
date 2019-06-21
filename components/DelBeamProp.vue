<template>
  <b-modal id="DelBeamProp">
    <div slot="modal-title">Удаление группы свойств сечений стержней</div>
    <b-form @submit.stop.prevent="delBeamProp" @reset="delBeamPropClose">
      <p>Группа будет удалена, если нет стержней со свойствами этой группы</p>
      <b-form-group label="Номер группы">
        <b-form-input v-model="delBeamPropNum" type="number" required></b-form-input>
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
      delBeamPropNum: null
    };
  },
  methods: {
    clear: function() {
      this.delBeamPropNum = null;
    },
    delBeamProp: function() {
      if (this.delBeamPropNum === null || this.delBeamPropNum < 0) {
        alert("Неверный ввод!");
        return false;
      }
      var index;
      for (index = 0; index < AllBeams.length; index++) {
        if (AllBeams[index][2] == this.delBeamPropNum) {
          alert("Данная группа свойств используется. Удаление невозможно.");
          return false;
        }
      }
      var Perep = false;
      for (index = 0; index < AllBeamProperty.length; index++) {
        if (this.delBeamPropNum == AllBeamProperty[index][6]) {
          Perep = true;
        }
        if (Perep && index < AllBeamProperty.length - 1) {
          AllBeamProperty[index][0] = AllBeamProperty[index + 1][0];
          AllBeamProperty[index][1] = AllBeamProperty[index + 1][1];
          AllBeamProperty[index][2] = AllBeamProperty[index + 1][2];
          AllBeamProperty[index][3] = AllBeamProperty[index + 1][3];
          AllBeamProperty[index][4] = AllBeamProperty[index + 1][4];
          AllBeamProperty[index][5] = AllBeamProperty[index + 1][5];
          AllBeamProperty[index][6] = AllBeamProperty[index + 1][6];
        }
      }
      if (!Perep) {
        alert("Группа свойств с таким номером не найдена");
        return false;
      }
      AllBeamProperty.pop();
      this.clear();
      return true;
    },
    delBeamPropClose: function() {
      if (this.delBeamProp() === true) {
        this.$root.$emit("bv::hide::modal", "DelBeamProp");
      }
    }
  }
};
</script>

