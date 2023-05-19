<template>
  <div class="container">
    <div id="app">
      <header-nav></header-nav>
      <mainBanner></mainBanner>
      <recent-play></recent-play>
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script>
import { RouterView } from "vue-router";
import HeaderNav from "./components/HeaderNav.vue";
import mainBanner from "./components/main/mainBanner.vue";
import recentPlay from "./components/main/recentPlay.vue";
export default {
  components: {
    HeaderNav,
    RouterView,
    mainBanner,
    recentPlay,
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  margin: 0 auto;
}
</style>
