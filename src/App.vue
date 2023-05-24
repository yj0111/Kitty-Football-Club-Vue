<template>
  <div class="containerApp">
    <div id="app">
      <header-nav></header-nav>

      <RouterView></RouterView>
      <footer-nav></footer-nav>
    </div>
  </div>
</template>

<script>
import { RouterView } from "vue-router";
import HeaderNav from "./components/HeaderNav.vue";
import FooterNav from "./components/FooterNav.vue";
export default {
  components: {
    HeaderNav,
    FooterNav,
    RouterView,
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
