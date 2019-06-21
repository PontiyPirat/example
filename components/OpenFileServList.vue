<template>
  <b-modal id="OpenFileServList" size="lg">
    <div slot="modal-title">Список проектов</div>
    <b-table v-if="loaded" :items="projectsData" :fields="fields">
      <template slot="actions" slot-scope="row">
        <b-btn variant="primary" @click="loadProj(row.index)">Открыть</b-btn>
      </template>
    </b-table>
    <div slot="modal-footer">
      <b-btn @click="loadProjs">Обновить</b-btn>
      <b-btn @click="close">Закрыть</b-btn>
    </div>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        {
          key: "projectName",
          label: "Имя проекта"
        },
        {
          key: "description",
          label: "Описание"
        },
        {
          key: "actions",
          label: "Действия"
        }
      ],
      projectsData: [],
      loaded: false
    };
  },
  methods: {
    close: function() {
      this.$root.$emit("bv::hide::modal", "OpenFileServList");
    },
    loadProjs: function() {
      this.loaded = false;
      let isConnected = this.$store.getters["auth/user"];
      if (!isConnected) {
        this.$root.$emit("bv::hide::modal", "SaveTZServ");
        alert("Для работы с сервером необходимо авторизоваться");
      } else {
        this.projectsData = [];
        this.$store.getters["url/getStrapiObj"].axios
          .get(this.$store.getters["url/getUrl"] + "/users/me")
          .then(response => {
            // Handle success.
            response.data.projects.forEach(project => {
              this.projectsData.push({
                projectName: project.projectName,
                description: project.description
              });
            });
            this.loaded = true;
          })
          .catch(error => {
            // Handle error.
            console.log("An error occurred:", error);
          });
      }
    },
    loadProj(index) {
      initProblem();
      ProblemText = this.projectsData[index].description;
      ParseFromString();
      sceneManager.refresh();
      this.$root.$emit("bv::hide::modal", "OpenFileServList");
    }
  }
};
</script>
