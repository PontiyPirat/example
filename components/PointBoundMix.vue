<template>
    <b-modal id="PointBoundMix">
        <div slot='modal-title'>
            Смешанные граничные условия
        </div>
        <b-form>
            <b-form-group label='Коэффициент упругой опоры по первой координате'>
                <b-form-input v-model='alfX' type='number' required></b-form-input>
            </b-form-group>
            <b-form-group label='Коэффициент упругой опоры по второй координате'>
                <b-form-input v-model='alfY' type='number' required></b-form-input>
            </b-form-group>
            <b-form-group label='Коэффициент упругой опоры по третьей координате'>
                <b-form-input v-model='alfZ' type='number' required></b-form-input>
            </b-form-group>
            <b-form-group label='Коэффициент упругой заделки вокруг первой координаты'>
                <b-form-input v-model='kapX' type='number' required></b-form-input>
            </b-form-group>
            <b-form-group label='Коэффициент упругой заделки вокруг второй координаты'>
                <b-form-input v-model='kapY' type='number' required></b-form-input>
            </b-form-group>
            <b-form-group label='Коэффициент упругой заделки вокруг третьей координаты'>
                <b-form-input v-model='kapZ' type='number' required></b-form-input>
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
      alfX: null,
      alfY: null,
      alfZ: null,
      kapX: null,
      kapY: null,
      kapZ: null
    };
  },
  methods: {}
};
</script>

