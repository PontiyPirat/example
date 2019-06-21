<template>
  <div>
    <Sign-in/>
    <Sign-up/>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <router-link tag="a" class="navbar-brand" to="/" exact>Beam Project</router-link>
        <div class="collapse navbar-collapse justify-content-end">
          <ul class="navbar-nav">
            <li v-if="user">
              <b-dropdown variant="link" no-caret>
                <template slot="button-content">Hello {{user.username}}</template>
                <b-dropdown-item @click="openProfile">Личный кабинет</b-dropdown-item>
              </b-dropdown>
            </li>
            <li v-if="user">
              <button class="btn btn-secondary" @click="logout">Logout</button>
            </li>
            <li v-if="!user">
              <b-btn v-b-modal.Login variant="link">Логин</b-btn>
            </li>
            <li v-if="!user">
              <b-btn v-b-modal.Register variant="link">Регистрация</b-btn>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <b-modal id="modal-xl" size="xl" title="Extra Large Modal">Hello Extra Large Modal!</b-modal>
  </div>
</template>

<script>
import index from "../pages/index.vue";
import SignIn from "../components/SignIn.vue";
import SignUp from "../components/SignUp.vue";
//import Strapi from "strapi-sdk-javascript/build/main";
// const apiUrl = process.env.API_URL || "http://localhost:1337";
// const strapi = new Strapi(apiUrl);
import { mapMutations } from "vuex";
export default {
  components: {
    SignIn,
    SignUp
  },
  data() {
    return {};
  },
  computed: {
    user() {
      return this.$store.getters["auth/user"];
    }
  },
  methods: {
    openProfile: function() {
      if (this.$store.getters["auth/user"]) {
        let route = this.$router.resolve({ path: "/profile" });
        window.open(route.href, "_blank");
      } else {
        alert("Возникла ошибка авторизации, обновите страницу!");
      }
    },
    logout: async function() {
      await this.$store.getters["url/getStrapiObj"].clearToken();
    },
    ...mapMutations({
      logout: "auth/logout"
    })
  }
};
</script>