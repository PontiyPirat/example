<template>
  <b-modal id="PropsTable" size="lg" no-close-on-backdrop no-close-on-esc hide-header-close>
    <div slot="modal-title">
      Таблица свойств
      <button type="button" class="close" aria-label="Close" @click="close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>

    <b-form-group label>
      <b-form-select v-model="selected" :options="options"></b-form-select>
    </b-form-group>

    <div v-if="selected=='beamProps'">
      <b-table :items="beamPropsData" :fields="beamPropsFields">
        <template slot="actions" slot-scope="row">
          <b-button
            @click="row.toggleDetails"
          >{{ row.detailsShowing ? 'Спрятать' : 'Открыть'}} подробности</b-button>
          <b-btn variant="primary" @click="delBeamProp(row.index)">Удалить</b-btn>
        </template>

        <template slot="row-details" slot-scope="row">
          <b-card>
            <b-row>
              <b-col class="text-sm-right">
                <b>Площадь сечения:</b>
              </b-col>
              <b-col>{{ row.item.crossSection }}</b-col>
            </b-row>

            <b-row>
              <b-col class="text-sm-right">
                <b>Момент инерции 1:</b>
              </b-col>
              <b-col>{{ row.item.momInerX }}</b-col>
            </b-row>

            <b-row>
              <b-col class="text-sm-right">
                <b>Момент инерции 2:</b>
              </b-col>
              <b-col>{{ row.item.momInerY }}</b-col>
            </b-row>

            <b-row>
              <b-col sm="3" class="text-sm-right">
                <b>Круговой момент инерции:</b>
              </b-col>
              <b-col>{{ row.item.momInerZ }}</b-col>
            </b-row>

            <b-row>
              <b-col class="text-sm-right">
                <b>Момент сопротивления 1:</b>
              </b-col>
              <b-col>{{ row.item.momSoprX }}</b-col>
            </b-row>

            <b-row>
              <b-col class="text-sm-right">
                <b>Момент сопротивления 2:</b>
              </b-col>
              <b-col>{{ row.item.momSoprY }}</b-col>
            </b-row>

            <b-button size="sm" @click="row.toggleDetails">Скрыть</b-button>
          </b-card>
        </template>
      </b-table>
    </div>

    <div v-if="selected=='plateProps'">
      <b-table :items="platePropsData" :fields="platePropsFields">
        <template slot="actions" slot-scope="row">
          <b-button
            @click="row.toggleDetails"
          >{{ row.detailsShowing ? 'Спрятать' : 'Открыть'}} подробности</b-button>
          <b-btn variant="primary" @click="delPlateProp(row.index)">Удалить</b-btn>
        </template>

        <template slot="row-details" slot-scope="row">
          <b-card>
            <b-row>
              <b-col class="text-sm-right">
                <b>Толщина:</b>
              </b-col>
              <b-col>{{ row.item.thickness }}</b-col>
            </b-row>

            <b-button size="sm" @click="row.toggleDetails">Скрыть</b-button>
          </b-card>
        </template>
      </b-table>
    </div>

    <div v-if="selected=='matProps'">
      <b-table :items="matPropsData" :fields="matPropsFields">
        <template slot="actions" slot-scope="row">
          <b-button
            @click="row.toggleDetails"
          >{{ row.detailsShowing ? 'Спрятать' : 'Открыть'}} подробности</b-button>
          <b-btn variant="primary" @click="delMatProp(row.index)">Удалить</b-btn>
        </template>

        <template slot="row-details" slot-scope="row">
          <b-card>
            <b-row>
              <b-col class="text-sm-right">
                <b>Плотность:</b>
              </b-col>
              <b-col>{{ row.item.density }}</b-col>
            </b-row>

            <b-row>
              <b-col class="text-sm-right">
                <b>Модуль Юнга:</b>
              </b-col>
              <b-col>{{ row.item.modNormUpr }}</b-col>
            </b-row>

            <b-row>
              <b-col class="text-sm-right">
                <b>Коэффициент Пуассона:</b>
              </b-col>
              <b-col>{{ row.item.puasson }}</b-col>
            </b-row>

            <b-row>
              <b-col class="text-sm-right">
                <b>Коэффициент теплового расширения:</b>
              </b-col>
              <b-col>{{ row.item.teplRas }}</b-col>
            </b-row>

            <b-button size="sm" @click="row.toggleDetails">Скрыть</b-button>
          </b-card>
        </template>
      </b-table>
    </div>

    <div slot="modal-footer"></div>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      selected: null,
      options: [
        { value: null, text: "Рассматриваемые свойства" },
        { value: "beamProps", text: "Свойства стержней" },
        { value: "plateProps", text: "Свойства поверхностей" },
        { value: "matProps", text: "Свойства материалов" }
      ],
      beamPropsFields: [
        {
          key: "index",
          label: "Личный номер"
        },
        {
          key: "actions",
          label: "Действия"
        }
      ],
      beamPropsData: [],
      platePropsFields: [
        {
          key: "index",
          label: "Личный номер"
        },
        {
          key: "actions",
          label: "Действия"
        }
      ],
      platePropsData: [],
      matPropsFields: [
        {
          key: "index",
          label: "Личный номер"
        },
        {
          key: "actions",
          label: "Действия"
        }
      ],
      matPropsData: []
    };
  },
  watch: {
    selected: function() {
      this.beamPropsData = [];
      this.platePropsData = [];
      this.matPropsData = [];
      if (this.selected == "beamProps") {
        for (let i = 0; i < AllBeamProperty.length; i++) {
          this.beamPropsData.push({
            index: AllBeamProperty[i][6],
            crossSection: AllBeamProperty[i][0],
            momInerX: AllBeamProperty[i][1],
            momInerY: AllBeamProperty[i][2],
            momInerZ: AllBeamProperty[i][3],
            momSoprX: AllBeamProperty[i][4],
            momSoprY: AllBeamProperty[i][5]
          });
        }
      }
      if (this.selected == "plateProps") {
        for (let i = 0; i < AllPlateProperty.length; i++) {
          this.platePropsData.push({
            index: AllPlateProperty[i][1],
            thickness: AllPlateProperty[i][0]
          });
        }
      }
      if (this.selected == "matProps") {
        for (let i = 0; i < AllMaterial.length; i++) {
          this.matPropsData.push({
            index: AllMaterial[i][4],
            density: AllMaterial[i][0],
            modNormUpr: AllMaterial[i][1],
            puasson: AllMaterial[i][2],
            teplRas: AllMaterial[i][3]
          });
        }
      }
    }
  },
  methods: {
    clear() {
      this.selected = null;
      this.beamPropsData = [];
      this.platePropsData = [];
      this.matPropsData = [];
    },
    close() {
      this.clear();
      this.$root.$emit("bv::hide::modal", "PropsTable");
    },
    delMatProp(indexProp) {
      let matNum = this.matPropsData[indexProp].index;
      if (matNum === null || matNum < 0) {
        alert("Неверный ввод!");
        return false;
      }
      var index;
      for (index = 0; index < AllBeams.length; index++) {
        if (AllBeams[index][1] == matNum) {
          alert("Данный материал используется. Удаление невозможно.");
          return false;
        }
      }
      var Perep = false;
      for (index = 0; index < AllMaterial.length; index++) {
        if (matNum == AllMaterial[index][4]) {
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
      this.matPropsData.splice(indexProp, 1);
    },
    delBeamProp(indexProp) {
      let bpNum = this.beamPropsData[indexProp].index;
      if (bpNum === null || bpNum < 0) {
        alert("Неверный ввод!");
        return false;
      }
      var index;
      for (index = 0; index < AllBeams.length; index++) {
        if (AllBeams[index][2] == bpNum) {
          alert("Данная группа свойств используется. Удаление невозможно.");
          return false;
        }
      }
      var Perep = false;
      for (index = 0; index < AllBeamProperty.length; index++) {
        if (bpNum == AllBeamProperty[index][6]) {
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
      this.beamPropsData.splice(indexProp, 1);
    },
    delPlateProp(indexProp) {
      let pNum = this.platePropsData[indexProp].index;
      if (pNum === null || pNum < 0) {
        alert("Неверный ввод!");
        return false;
      }
      var index;
      for (index = 0; index < AllPlates.length; index++) {
        if (AllPlates[index][2] == pNum) {
          alert("Данная группа свойств используется. Удаление невозможно.");
          return false;
        }
      }
      var Perep = false;
      for (index = 0; index < AllPlateProperty.length; index++) {
        if (pNum == AllPlateProperty[index][6]) {
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
      this.platePropsData.splice(indexProp,1);
    }
  }
};
</script>