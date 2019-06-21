<template>
    <b-modal id="DelLineBoundary">
        <div slot='modal-title'>
            Удаление всех ГУ в линиях
        </div>
        <b-form>
            <b-form-group label='Номер начальной линии'>
                <b-form-input v-model='delLineBoundBegNum' type='number' required></b-form-input>
            </b-form-group>
            <b-form-group label='Номер конечной линии'>
                <b-form-input v-model='delLineBoundEndNum' type='number' required></b-form-input>
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
      delLineBoundBegNum: null,
      delLineBoundEndNum: null
    };
  },
  methods: {}
};
</script>

