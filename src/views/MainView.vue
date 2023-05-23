<template>
  <div class="containerFuture">
    <mainBanner></mainBanner>
    <mainRanking></mainRanking>
    <futurePlay></futurePlay>
    <recentPlay></recentPlay>
  </div>
</template>

<script>
import mainBanner from "@/components/main/mainBanner.vue";
import mainRanking from "@/components/main/mainRanking.vue";
import futurePlay from "@/components/main/futurePlay.vue";
import recentPlay from "@/components/main/recentPlay.vue";

export default {
  components: {
    mainBanner,
    mainRanking,
    futurePlay,
    recentPlay,
  },
  name: "SideNav",
  data() {
    return {
      records: [],
    };
  },
};
</script>

<style scoped></style>
