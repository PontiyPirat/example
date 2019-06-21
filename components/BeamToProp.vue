<template>
    <b-modal id="BeamToProp">
        <div slot='modal-title'>
            Поменять свойства стержней
        </div>
        <b-form>
            <b-form-group label='Начальный номер стержня'>
                <b-form-input v-model='beamBeg' type='number' required></b-form-input>
            </b-form-group>
            <b-form-group label='Последний номер стержня'>
                <b-form-input v-model='beamEnd' type='number' required></b-form-input>
            </b-form-group>
            <b-form-group label='Материал'>
                <b-form-input v-model='mat' type='number' required></b-form-input>
            </b-form-group>
            <b-form-group label='Группа свойств'>
                <b-form-input v-model='prop' type='number' required></b-form-input>
            </b-form-group>
            <b-button type='submit' variant='primary'>Принять</b-button>
            <b-button type='reset' variant='secondary'>Принять и закрыть</b-button>
        </b-form>
        <div slot='modal-footer'></div>
    </b-modal>
</template>

<script>
export default {
  data() {
    return {
      beamBeg: null,
      beamEnd: null,
      mat: null,
      prop: null
    };
  },
  methods: {}
};
</script>

