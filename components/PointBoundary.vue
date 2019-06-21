<template>
  <div>
    <b-modal id="PointBoundary">
      <div slot="modal-title">Введите номер точки и тип граничного условия</div>
      <b-form @submit.stop.prevent="openDopModal" @reset="close">
        <b-form-group label="Номер точки">
          <b-form-input v-model="pointBoundN" type="number" required></b-form-input>
        </b-form-group>
        <b-form-group label="Тип ГУ">
          <b-form-radio-group v-model="selected" :options="myoptions" stacked plain></b-form-radio-group>
        </b-form-group>
        <b-button type="submit" variant="primary">Далее</b-button>
        <b-button type="reset" variant="secondary">Закрыть</b-button>
      </b-form>
      <div slot="modal-footer"></div>
    </b-modal>
    <PointBoundKin v-bind:inputPointBoundN="pointBoundN"/>
    <PointBoundForce v-bind:inputPointBoundN="pointBoundN"/>
    <PointBoundMix/>
  </div>
</template>

<script>
import PointBoundKin from "../components/PointBoundKin.vue";
import PointBoundForce from "../components/PointBoundForce.vue";
import PointBoundMix from "../components/PointBoundMix.vue";
export default {
  components: {
    PointBoundKin,
    PointBoundForce,
    PointBoundMix
  },
  data() {
    return {
      pointBoundN: null,
      selected: "",
      myoptions: [
        { text: "Кинематические", value: "0" },
        { text: "Силовые", value: "1" },
        { text: "Смешанные", value: "2" }
      ]
    };
  },
  methods: {
    pointExist() {
      let result = false;
      for (let i = 0; i < AllPoints.length; i++) {
        if (AllPoints[i][3] == this.pointBoundN) {
          result = true;
        }
      }
      return result;
    },
    openDopModal() {
      if (this.pointExist()) {
        if (this.selected === "0") {
          this.$root.$emit("bv::show::modal", "PointBoundKin");
        }
        if (this.selected === "1") {
          this.$root.$emit("bv::show::modal", "PointBoundForce");
        }
        if (this.selected === "2") {
          this.$root.$emit("bv::show::modal", "PointBoundMix");
        }
        this.$root.$emit("bv::hide::modal", "PointBoundary");
      } else{
        alert('Нет такой точки!');
      }
    },
    close() {
      this.$root.$emit("bv::hide::modal", "PointBoundary");
    }
  }
};
</script>

