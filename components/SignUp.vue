<template>

<b-modal id="Register">
  <div slot='modal-title'>Регистрация</div>
  <b-form @submit.stop.prevent="handleSubmit">
    <b-form-group label='Username'>
      <b-form-input v-model='username' type='text' placeholder="Enter your username"/>
    </b-form-group>
    <b-form-group label='Email'>
      <b-form-input  v-model='email' type="email" placeholder="Enter your email" required/>
    </b-form-group>
    <b-form-group label='Пароль'>
      <b-form-input v-model='password' type="password" placeholder="Enter your password" required/>
    </b-form-group>
    <b-btn type="submit" variant='primary'>Submit</b-btn>
    <b-btn v-b-modal.Login variant='secondary'>Есть аккаунт</b-btn>
  </b-form>
  <div slot='modal-footer'></div>
</b-modal>

</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: "",
      username: "",
      loading: false
    };
  },
  methods: {
    async handleSubmit() {
      try {
        this.loading = true;
        const response = await this.$store.getters['url/getStrapiObj'].register(
          this.username,
          this.email,
          this.password
        );
        this.loading = false;
        this.setUser(response.user);
        this.$root.$emit("bv::hide::modal", "Register");
      } catch (err) {
        this.loading = false;
        alert(err.message || "An error occurred.");
      }
    },
    ...mapMutations({
      setUser: "auth/setUser"
    })
  }
};
</script>