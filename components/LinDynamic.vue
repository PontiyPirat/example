<template>
  <b-modal id="LinDynamic">
    <div slot="modal-title">Линейная динамика</div>
    <b-tabs>
      <b-tab title="Силовая нагрузка">
        <br>
        <b-form-select v-model="selected" :options="options"></b-form-select>
        <b-form v-if="selected=='step'" @submit.stop.prevent="addStep">
          <br>
          <b-form-group label="Начало действия силы">
            <b-form-input v-model="forceStart" required type="text"></b-form-input>
          </b-form-group>
          <b-form-group label="Время действия силы">
            <b-form-input v-model="forceDur" required type="text"></b-form-input>
          </b-form-group>
          <b-form-group label="Полное время интергрирования">
            <b-form-input v-model="fullTime" required type="text"></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary">Принять</b-button>
        </b-form>
      </b-tab>
      <b-tab title="Кинематическое возбуждение" disabled></b-tab>
    </b-tabs>
    <div slot="modal-footer"></div>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      forceStart: "",
      forceDur: "",
      fullTime: "",
      selected: null,
      options: [
        { value: null, text: "Тип нагрузки" },
        { value: "step", text: "Ступенька" },
        { value: "triangle", text: "Треугольник", disabled: true },
        { value: "sinus", text: "Синусоида", disabled: true },
        { value: "points", text: "По точкам", disabled: true }
      ]
    };
  },
  methods: {
    checkStep: function() {
      if (
        this.forceStart < 0 ||
        this.forceDur < 0 ||
        this.fullTime < 0 ||
        this.forceDur + this.forceStart > this.fullTime
      ) {
        return false;
      } else {
        return true;
      }
    },
    addStep: function() {
      this.forceStart = parseFloat(this.forceStart);
      this.forceDur = parseFloat(this.forceDur);
      this.fullTime = parseFloat(this.fullTime);
      if (this.checkStep()) {
        let dataSet;
        let t0, f0, t1, f1, t2, f2;
        t0 = 0;
        if (this.forceStart == 0) {
          f0 = 1;
          t1 = this.forceDur;
          f1 = 0;
          let t2, f2;
          t2 = this.fullTime;
          f2 = 0;
          dataSet = [t0, f0, t1, f1, t2, f2];
        } else {
          f0 = 0;
          t1 = this.forceStart;
          f1 = 1;
          t2 = this.forceStart + this.forceDur;
          f2 = 0;
          let t3, f3;
          t3 = this.fullTime;
          f3 = 0;
          if (t2 == t3) {
            dataSet = [t0, f0, t1, f1, t2, f2];
          } else {
            dataSet = [t0, f0, t1, f1, t2, f2, t3, f3];
          }
          DynamicConditions = dataSet;
        }
        console.log(dataSet);
      } else {
        alert("Некорректный ввод!");
      }
    },
    clear: function() {
      this.forceStart = "";
      this.forceDur = "";
      this.fullTime = "";
      this.selected = null;
    }
  }
};
</script>


