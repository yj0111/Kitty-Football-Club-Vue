<template>
  <div class="container">
    <div id="app">
      <header-nav></header-nav>
      <futurePlay></futurePlay>
      <teamManagement></teamManagement>
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script>
import { RouterView } from "vue-router";
import HeaderNav from "./components/HeaderNav.vue";
import futurePlay from "./components/main/futurePlay.vue";
import teamManagement from "./components/myteam/teamManagement.vue";
export default {
  components: {
    HeaderNav,
    RouterView,
    futurePlay,
    teamManagement,
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  margin: 0 auto;
}
</style>
