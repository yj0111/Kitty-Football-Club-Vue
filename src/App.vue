<template>
  <div id="app">
    <header-nav></header-nav>
    <RouterView></RouterView>
  </div>
</template>

<script>
import { RouterView } from "vue-router";
import HeaderNav from "./components/HeaderNav.vue";
export default {
  components: {
    HeaderNav,
    RouterView,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
