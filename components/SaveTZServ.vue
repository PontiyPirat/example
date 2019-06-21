<template>
  <b-modal id="SaveTZServ">
    <div slot="modal-title">Запись на сервер</div>
    <b-form @submit.prevent="saveServ">
      <p>Введите название проекта</p>
      <b-form-input v-model="problemName" type="text" required></b-form-input>
      <br>
      <b-btn type="submit" variant="primary">Сохранить</b-btn>
      <b-btn @click="close" variant="secondary">Закрыть</b-btn>
    </b-form>
    <div slot="modal-footer"></div>
  </b-modal>
</template>


<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      description: "",
      problemName: "",
      //триггер для запуска сохранения
      loaded: false,
      nameExist: false
    };
  },
  //в данном блоке идут переменные из data, которые необходимо отслеживать
  watch: {
    loaded: function() {
      //условие необходимого для того, чтобы при изменение loaded на false не происходило сохранения
      if (this.loaded == true) {
        if (this.nameExist) {
          let reSave = confirm("Файл с таким именем существует. Перезаписать?");
          if (!reSave) {
            this.nameExist = false;
            return false;
          }
        }
        ProblemName = this.problemName;
        SaveToString();
        this.description = ProblemText;
        try {
          let hasBounds = false;
          let hasAnalys = false;
          let hasObjects = false;
          if(PointForces.length!=0 && PointDiss.length!= 0){
            hasBounds = true;
          }
          if(AllPlates.length!=0 || AllBeams!=0){
            hasObjects = true;
          }
          if(AnalysText!=""){
            hasAnalys = true;
          }
          this.$store.getters["url/getStrapiObj"].createEntry("Projects", {
            projectName: this.problemName,
            description: this.description,
            hasBounds: hasBounds,
            hasAnalys: hasAnalys,
            hasObjects: hasObjects
          });
          alert("Проект выгружен на сервер.");
          this.$root.$emit("bv::hide::modal", "SaveTZServ");
        } catch (err) {
          alert("Произошла ошибка.");
        }
        this.nameExist = false;
        this.loaded = false;
      }
    }
  },
  methods: {
    isAuth() {
      let isConnected = this.$store.getters["auth/user"];
      if (!isConnected) {
        this.$root.$emit("bv::hide::modal", "SaveTZServ");
        alert("Для работы с сервером необходимо авторизоваться");
        return false;
      } else {
        return true;
      }
    },
    //срабатывает при отправке формы
    saveServ() {
      //проверка на авторизацию
      if (this.isAuth()) {
        //проверка на наличие такого же имени в проектах и инициализация сохранения
        this.requestNameExist();
      }
    },
    requestNameExist() {
      this.loaded = false;
      //запрос на сервер с проверкой существования проекта с таким же именем
      try {
        this.$store.getters["url/getStrapiObj"].axios
          .get(this.$store.getters["url/getUrl"] + "/users/me")
          .then(response => {
            // Handle success.
            response.data.projects.forEach(project => {
              if (project.projectName == this.problemName) {
                this.nameExist = true;
              }
            });
            //
            this.loaded = true;
          })
          .catch(error => {
            // Handle error.
            console.log("An error occurred:", error);
          });
      } catch (e) {}
    },
    close() {
      this.$root.$emit("bv::hide::modal", "SaveTZServ");
    }
  }
};
</script>
