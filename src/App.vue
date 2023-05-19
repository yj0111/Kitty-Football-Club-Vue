<template>
  <div class="container">
    <div id="app">
      <header-nav></header-nav>
      <RouterView></RouterView>
    </div>
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

<style scoped>
.container {
  width: 100%;
  margin: 0 auto;
}
</style>
