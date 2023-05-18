<template>
  <div id="app">
    <live-chatting></live-chatting>
    <header-nav></header-nav>
    <RouterView></RouterView>
  </div>
</template>

<script>
import { RouterView } from "vue-router";
import HeaderNav from "./components/HeaderNav.vue";
import LiveChatting from "./components/LiveChatting.vue";

export default {
  components: {
    HeaderNav,
    RouterView,
    LiveChatting,
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
