<template>
  <div>
    <side-nav></side-nav>
    <RouterView></RouterView>
  </div>
</template>

<script>
import SideNav from "@/components/SideNav.vue";
export default {
  name: "myTeam",
  components: {
    SideNav,
  },
};
</script>
