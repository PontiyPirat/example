<template>
  <section class="container">
    <PersonalData/>
    
    <div>
      <b-card no-body v-if="loading">Загрузка...</b-card>
      <b-card no-body v-if="!loading">
        <div v-if="!isConnected">Перейдите на главную страницу для авторизации!</div>
        <b-tabs v-if="isConnected" card>
          <b-tab title="Общие" active>
            <br>
            Имя пользователя: {{userName}}
            <br>
            Почта: {{userEmail}}
            <br>
            Уровень пользователя: {{userRole}}
            <br>
            <b-btn v-if="userRole!='WideUser'" v-b-modal.PersonalData>Заполнить личные данные</b-btn>
          </b-tab>
          <b-tab title="Расширенные" :disabled="userRole != 'WideUser'">
            <ul>
              <li>
                <b>Имя</b>
                <p>{{firstName}}</p>
              </li>
              <li>
                <b>Фамилия</b>
                <p>{{secondName}}</p>
              </li>
              <li>
                <b>Отчество</b>
                <p>{{nameFromFather}}</p>
              </li>
              <li>
                <b>Дата рождения</b>
                <p>{{date}}</p>
              </li>
              <li>
                <b>Организация</b>
                <p>{{organization}}</p>
              </li>
              <li>
                <b>Серия и номер паспорта</b>
                <p>{{passportId}}</p>
              </li>
              <li>
                <b>Место выдачи паспорта</b>
                <p>{{passportData}}</p>
              </li>
            </ul>
          </b-tab>
          <b-tab title="Проекты" @click="loadProjs">
            <b-table :items="projectsData" :fields="fieldsProj">
              <template slot="actions" slot-scope="row">
                <b-button
                  size="sm"
                  @click="row.toggleDetails"
                  class="mr-2"
                >{{ row.detailsShowing ? 'Спрятать' : 'Показать'}} детали</b-button>
                <b-btn variant="primary" @click="order(row.index)">На решатель</b-btn>
                <b-btn variant="primary" @click="deleteProj(row.index)">Удалить</b-btn>
              </template>
              <template slot="row-details" slot-scope="row">
                  <b-row class="mb-2">
                    <b-col sm="3" class="text-sm-right">
                      <b>Текст проекта:</b>
                    </b-col>
                    <b-col>{{ row.item.description }}</b-col>
                  </b-row>

                  <b-button size="sm" @click="row.toggleDetails">Спрятать</b-button>
              </template>
            </b-table>
          </b-tab>
          <b-tab
            title="Решения"
            :disabled="userRole != 'WideUser'"
            :fixed="true"
            @click="loadResults"
          >
            <b-table :items="resultsData" :fields="fieldsResults">
              <template slot="actions" slot-scope="row">
                <b-button
                  size="sm"
                  @click="row.toggleDetails"
                  class="mr-2"
                >{{ row.detailsShowing ? 'Hide' : 'Show'}} Details</b-button>
                <b-btn variant="primary" @click="showResult(row.index)">Показать</b-btn>
                <b-btn variant="secondary" @click="deleteResult(row.index)">Удалить</b-btn>
              </template>
              <template slot="row-details" slot-scope="row">
                <b-card style="max-width: 20rem;">
                  <b-row class="mb-2">
                    <b-col sm="3" class="text-sm-right">
                      <b>Result text:</b>
                    </b-col>
                    <b-col>{{ row.item.effortsText }}</b-col>
                  </b-row>

                  <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
                </b-card>
              </template>
            </b-table>
          </b-tab>
          <b-tab title="Информация">
            <ul>
              <li>На сайте организована двухуровневая аутентификация: 'Зарегистрированный пользователь', 'Расширенный пользователь'</li>
              <li>Переход на 'Расширенного пользователя' осуществляется после проверки заполненных личных данных.</li>
              <li>Статус 'Расширенный пользователь' позволяет отправлять задания для решения.</li>
            </ul>
          </b-tab>
          <b-tab title="Счёт" :disabled="userRole != 'WideUser'">
            <b>На счету осталось: {{money}}руб.</b>
            <b-btn>Пополнить счёт</b-btn>
          </b-tab>
        </b-tabs>
      </b-card>
      
    </div>
    <Results v-bind:inputOptions="options"/>
    <script src="/js/lib/three.min.js"></script>
    <script src="/js/lib/OrbitControls.js"></script>
    <script src="/js/read.js"></script>
    <script src="/js/write.js"></script>
    <script src="/js/sceneSubjects/point.js"></script>
    <script src="/js/sceneSubjects/line.js"></script>
    <script src="/js/sceneSubjects/light.js"></script>
    <script src="/js/sceneSubjects/axis.js"></script>
    <script src="/js/sceneSubjects/beam.js"></script>
    <script src="/js/sceneSubjects/legend.js"></script>
    <script src="/js/sceneManager.js"></script>
    <script src="/js/mainResult.js"></script>
  </section>
</template>

<script>
import Strapi from "strapi-sdk-javascript/build/main";
import PersonalData from "../components/PersonalData.vue";
import Results from "../components/Results.vue";
export default {
  components: {
    PersonalData,
    Results
  },
  data() {
    return {
      loading: true,
      money: "",
      userName: "",
      userEmail: "",
      userRole: "",
      firstName: "",
      secondName: "",
      nameFromFather: "",
      date: null,
      organization: "",
      passportId: null,
      passportData: "",
      fieldsProj: ["projectName", "hasObjects","hasAnalys", "hasBounds", "actions"],
      projectsData: [],
      fieldsResults: ["projectName", "actions"],
      resultsData: [],
      options: [],
    };
  },
  created: function() {
    let strapiObj;
    let strapi = new Strapi();
    strapi.axios
      .get("http://195.19.236.243:1337")
      .then(response => {
        this.$store.commit("url/setUrl", "http://195.19.236.243:1337");
        strapiObj = new Strapi("http://195.19.236.243:1337");
        this.$store.commit("url/setStrapiObj", strapiObj);
        this.loading = false;
      })
      .catch(error => {});
    strapi.axios
      .get("http://172.27.20.12:1337")
      .then(response => {
        this.$store.commit("url/setUrl", "http://172.27.20.12:1337");
        strapiObj = new Strapi("http://172.27.20.12:1337");
        this.$store.commit("url/setStrapiObj", strapiObj);
        this.loading = false;
      })
      .catch(error => {});
    strapi = null;
  },
  computed: {
    isConnected() {
      this.loadUserInfo();
      return this.$store.getters["auth/user"];
    }
  },
  methods: {
    loadUserInfo: function() {
      this.$store.getters["url/getStrapiObj"].axios
        .get(this.$store.getters["url/getUrl"] + "/users/me")
        .then(response => {
          // Handle success.
          this.userName = response.data.username;
          this.userEmail = response.data.email;
          this.userRole = response.data.role.name;
        })
        .catch(error => {
          // Handle error.
          console.log("An error occurred:", error);
        });
      this.$store.getters["url/getStrapiObj"].axios
        .get(this.$store.getters["url/getUrl"] + "/users/me")
        .then(response => {
          // Handle success.
          this.firstName = response.data.userextrainfos.FirstName;
          this.secondName = response.data.userextrainfos.SecondName;
          this.nameFromFather = response.data.userextrainfos.NameFromFather;
          this.date = response.data.userextrainfos.DateOfBirth;
          this.organization = response.data.userextrainfos.Organization;
          this.passportId = response.data.userextrainfos.PassportId;
          this.passportData = response.data.userextrainfos.PassportData;
        })
        .catch(error => {
          // Handle error.
          console.log("An error occurred:", error);
        });
    },
    loadFullInfo() {},
    loadProjs: function() {
      this.projectsData = [];
      if (true) {
        this.$store.getters["url/getStrapiObj"].axios
          .get(this.$store.getters["url/getUrl"] + "/users/me")
          .then(response => {
            // Handle success.
            response.data.projects.forEach(project => {
              this.projectsData.push({
                projectId: project._id,
                projectName: project.projectName,
                description: project.description,
                hasBounds: project.hasBounds,
                hasAnalys: project.hasAnalys,
                hasObjects: project.hasObjects
              });
            });
            //this.loaded = true;
          })
          .catch(error => {
            // Handle error.
            console.log("An error occurred:", error);
          });
      }
    },
    loadResults: function() {
      this.resultsData = [];
      if (true) {
        this.$store.getters["url/getStrapiObj"].axios
          .get(this.$store.getters["url/getUrl"] + "/users/me")
          .then(response => {
            // Handle success.
            response.data.results.forEach(result => {
              this.resultsData.push({
                resultId: result._id,
                projectName: result.projectName,
                resultText: result.resultText,
                effortsText: result.effortsText,
                deformText: result.deformText,
                dynText: result.dynText
              });
            });
            //this.loaded = true;
          })
          .catch(error => {
            // Handle error.
            console.log("An error occurred:", error);
          });
      }
    },
    deleteProj(index) {
      try {
        this.$store.getters["url/getStrapiObj"].deleteEntry(
          "Projects",
          this.projectsData[index].projectId
        );
        this.projectsData.splice(index, 1);
      } catch (err) {
        (this.loading = false), alert("Произошла ошибка.");
      }
    },
    deleteResult(index){
      try {
        this.$store.getters["url/getStrapiObj"].deleteEntry(
          "Results",
          this.resultsData[index].resultId
        );
        this.resultsData.splice(index, 1);
        alert("Проект удален.");
      } catch (err) {
        (this.loading = false), alert("Произошла ошибка.");
      }
    },
    order(index) {
      //console.log(this.projectsData[index].description);
      try {
        this.$store.getters["url/getStrapiObj"].createEntry("Orders", {
          projectObj: this.projectsData[index]
        });
        alert("Проект выгружен на решатель.");
      } catch (err) {
        (this.loading = false), alert("Произошла ошибка.");
      }
    },
    showResult(index){
      initProblem();
      this.options = [];
      AllResults.efSt = this.resultsData[index].effortsText;
      AllResults.deformSt = this.resultsData[index].deformText;
      AllResults.efDyn = this.resultsData[index].dynText;
      if(AllResults.efSt!=""){
        this.options.push({value:"efSt",text:"Нагрузки(статика)"});
      }
      if(AllResults.deformSt!=""){
        this.options.push({value:"deformSt",text:"Деформации(статика)"});
      }
      if(AllResults.efDyn!=""){
        this.options.push({value:"efDyn",text:"Нагрузки(динамика)", disabled: true});
      }
      //ProblemText = this.resultsData[index].effortsText;
      //ParseFromStringResult();
      //sceneManager.refresh();
      this.$root.$emit("bv::show::modal", "Results");
    }
  }
};
</script>