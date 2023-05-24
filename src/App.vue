<template>
  <div class="containerApp">
    <div id="app">
      <header-nav></header-nav>

      <RouterView></RouterView>
      <insertGameResult></insertGameResult>
      <FooterNavVue></FooterNavVue>
    </div>
  </div>
</template>

<script>
import { RouterView } from "vue-router";
import HeaderNav from "./components/HeaderNav.vue";
import insertGameResult from "./components/myteam/insertGameResult.vue";
import FooterNavVue from "./components/FooterNav.vue";
export default {
  components: {
    HeaderNav,
    RouterView,
    insertGameResult,
    FooterNavVue,
  },
};
</script>

<style>
.containerApp {
  width: 100%;
  /* margin: 0 auto; */
  margin: 0;
  padding: 0;

  box-sizing: border-box;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,
body {
  min-height: 100%;
  margin: 0 auto;
}
</style>
