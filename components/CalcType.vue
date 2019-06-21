<template>
  <b-modal id="CalcType">
    <div slot="modal-title">Выбор типа рассчета</div>
    <b-form @submit.stop.prevent="selectCalc">
       <b-form-group label="Размер элемента">
          <b-form-input v-model="elSize" type="text"></b-form-input>
        </b-form-group>
      <b-form-group>
        <b-form-select v-model="selected" :options="options"></b-form-select>
      </b-form-group>
      <div v-if="selected=='static'">
        <b-form-group label="Погрешность">
          <b-form-input v-model="staticEps" disabled type="text"></b-form-input>
        </b-form-group>
      </div>
      <div v-if="selected=='timedynamic'">
        <b-form-group label="Начало действия силы">
          <b-form-input v-model="forceStart" required type="text"></b-form-input>
        </b-form-group>
        <b-form-group label="Конец действия силы">
          <b-form-input v-model="forceEnd" required type="text"></b-form-input>
        </b-form-group>
        <b-form-group label="Количество шагов">
          <b-form-input v-model="numSteps" required type="text"></b-form-input>
        </b-form-group>
        <b-form-group label="Выбор метода">
          <b-form-select v-model="selectedDyn" :options="optionsDyn"></b-form-select>
        </b-form-group>
        <div v-if="selectedDyn=='newmark'">
          <b-form-group label="Параметры метода">
            <b-form-input v-model="par1" required type="text"></b-form-input>
            <b-form-input v-model="par2" required type="text"></b-form-input>
          </b-form-group>
        </div>
      </div>
      <b-button type="submit" variant="primary">Сохранить</b-button>
      <b-button variant="secondary" @click="close">Закрыть</b-button>
    </b-form>
    <div slot="modal-footer"></div>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      elSize: "0.5",
      timestep: "0",
      par1: "0.5",
      par2: "0.25",
      staticEps: "0.01",
      dynEps: "0.00001",
      forceStart: "",
      forceEnd: "",
      numSteps: "",
      selected: null,
      options: [
        { value: null, text: "Тип рассчета" },
        { value: "static", text: "Статика" },
        { value: "timedynamic", text: "Динамика" }
      ],
      selectedDyn: "newmark",
      optionsDyn: [
        { value: "newmark", text: "Метод Ньюмарка" },
        { value: "centraldifference", text: "Метод центральных разностей" },
        { value: "rungekutta4", text: "Метод Рунге-Кутта 4-го порядка" },
        { value: "adamsbashforth5", text: "Метод Адамса-Башфорта 5-го порядка" }
      ]
    };
  },
  methods: {
    selectCalc() {
      ElSizeText = this.elSize;
      if (this.selected == "static") {
        AnalysText = this.selected + delim + "gauss" + delim + this.staticEps;
        this.$root.$emit("bv::hide::modal", "CalcType");
        return true;
      }
      if (this.selected == "timedynamic") {
        if (this.forceStart > this.forceEnd) {
          alert("Время начала должно быть меньше времени конца действия силы.");
          return false;
        }
        this.timestep = (Number(this.forceEnd) - Number(this.forceStart))/Number(this.numSteps)
        AnalysText +=
          this.selected +
          delim +
          this.selectedDyn +
          delim +
          this.par1 +
          delim +
          this.par2 +
          delim +
          this.timestep +
          delim +
          this.numSteps +
          delim +
          this.forceStart +
          delim +
          this.forceEnd +
          delim +
          this.dynEps;
        this.$root.$emit("bv::hide::modal", "CalcType");
        return true;
      }
      if (this.selected == null) {
        alert("Выберете тип нагрузки!");
      }
    },
    close: function() {
      this.$root.$emit("bv::hide::modal", "CalcType");
    }
  }
};
</script>


