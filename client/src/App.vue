<template>
  <div id="app">
    <div class="grid">
        <app-nav class="grid__sidebar"/>
        <app-content class="grid__content"/>
    </div>

  </div>
</template>
<script>
import Nav from './components/Nav';
import Content from './components/Content';
import { mapActions } from 'vuex';


export default {
    components: {
        appNav: Nav,
        appContent: Content
    },
    methods: {
        ...mapActions(['fetchProjects'])
    },
    async created() {
        // await this.fetchTasks();
        await this.fetchProjects();
    }
}
</script>
<style lang="scss">
    // #app {
    //     font-family: Avenir, Helvetica, Arial, sans-serif;
    //     -webkit-font-smoothing: antialiased;
    //     -moz-osx-font-smoothing: grayscale;
    //     //   text-align: center;
    //     color: #2c3e50;
    // }

    .grid {
        display: grid;
        // min-height: 40rem;
        height: 100vh;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 1fr 3fr;
        grid-template-areas: 
            "sidebar content";
        &__sidebar {
            grid-area: sidebar;
            background-color: $color-primary-light;
            border-right: solid 2px $color-primary-darker;
        }
        &__content {
             grid-area: content;
            background-color: $color-primary-dark;
        }

    }


</style>
