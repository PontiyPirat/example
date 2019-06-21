<template>
    <b-modal id="PersonalData">
        <div slot='modal-title'>
            Личные данные
        </div>
        <b-form @submit.stop.prevent="onSubmit" @reset="onReset">
            <b-form-group  label='Имя:'>
                <b-form-input v-model='firstName' type='text' required></b-form-input>
            </b-form-group>

            <b-form-group  label='Фамилия:'>
                <b-form-input v-model='secondName' type='text' required></b-form-input>
            </b-form-group>
            
            <b-form-group  label='Отчество:'>
                <b-form-input v-model='nameFromFather' type='text' required></b-form-input>
            </b-form-group>
            
            <b-form-group  label='Дата Рождения:'>
                <b-form-input v-model='date' type='date' required></b-form-input>
            </b-form-group>

            <b-form-group  label='Организация:' description='Например: Нет, Университет, Название предприятия и т.д'>
                <b-form-input v-model='organization' type='text' required></b-form-input>
            </b-form-group>
            
            <b-form-group label='Серия и номер паспорта:' description='Без пробелов'>
                <b-form-input v-model='passportId' type='number' required></b-form-input>
            </b-form-group>
            
            <b-form-group label='Полное название место выдачи паспорта:'>
                <b-form-input v-model='passportData' type='text' required></b-form-input>
            </b-form-group>

            <b-form-group>
                <b-form-checkbox id="checkLicense" v-model="status"
                                 value="accepted"
                                 unchecked-value="not_accepted">
                    <div onselectstart="return false">I accept the terms and use</div>
                </b-form-checkbox>
            </b-form-group>

            <b-form-group>
                <b-form-textarea readonly>
                  {{licenseText}}
                </b-form-textarea>
            </b-form-group>
            
            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
        <div slot='modal-footer'>
        </div>
    </b-modal>
</template>

<script>
export default {
  data() {
    return {
      licenseText: "a",
      firstName: "",
      secondName: "",
      nameFromFather: "",
      date: null,
      organization: "",
      passportId: null,
      passportData: "",
      status: "not_accepted"
    };
  },
  // beforeMount() {
  //   this.$store.getters['url/getStrapiObj'].axios
  //   .get(this.$store.getters['url/getUrl']+"/agreements/5c08745d1a0eeb3f3ce2bc66")
  //    .then(response => {
  //      let smth = response.data.Text;
  //      console.log(smth);
  //      this.licenseText = ""+smth;
  //    })
  //    .catch(error => {
  //      console.log("An error occurred:", error);
  //    });
  // },
  methods: {
    async onSubmit() {
      try {
        let response = await this.$store.getters['url/getStrapiObj'].createEntry("Userextrainfos", {
          firstName: this.firstName,
          secondName: this.secondName,
          nameFromFather: this.nameFromFather,
          organization: this.organization,
          passportId: this.passportId,
          passportData: this.passportData,
          dateOfBirth: this.date,
          status: this.status
        });
        if (response == 0) {
          alert("You should sign agreement!");
        } else {
          this.$root.$emit("bv::hide::modal", "PersonalData");
        }
      } catch (e) {
        alert("Something wrong!");
      }
    },
    onReset() {
      this.firstName = null;
      this.secondName = null;
      this.nameFromFather = null;
      this.date = null;
      this.organization = null;
      this.passportId = null;
      this.passportData = null;
      this.status = "not_accepted";
    }
  }
};
</script>

