<template lang="pug">
article.codeEditor
    label.codeArea
        strong Edit story script
        code-mirror(:options="jsEditorOptions", :code="getScript", @code-changed="saveScript")
</template>

<script>
    import CodeMirror from './CodeMirror.vue';
    import {mapGetters, mapActions,} from 'vuex';

    export default {
        name: 'script-editor',

        mounted() {
            import('codemirror-jshint-async').then(({register,}) => register());
        },

        computed: mapGetters([
            'jsEditorOptions',
            'getScript',
        ]),

        methods: {
            ...mapActions([
                'saveScript',
                'openScript',
            ]),
        },

        beforeRouteEnter(to, from, next) {
            next((vm) => {
                vm.openScript();
            });
        },

        components: {
            CodeMirror,
        },
    };
</script>