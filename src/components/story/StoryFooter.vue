<template lang="pug">
div
    //router-link(:to="{name: 'storySettings'}")
    //    i.fa.fa-cog
    //    | Story settings

    a(:href="bugs.url", target="_blank")
        i.fa.fa-bug
        | Report a bug
</template>

<script>
    import pkg from '../../../package.json';
    export default {
        data() {
            return {
                bugs: pkg.bugs,
            };
        },
    };
</script>