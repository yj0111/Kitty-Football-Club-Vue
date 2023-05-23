<template>
  <div>
    <mainBanner></mainBanner>
    <div class="containerMainView">
      <div class="twoCont">
        <div class="Ranking">
          <mainRanking></mainRanking>
        </div>
        <div class="recent">
          <recentPlay></recentPlay>
        </div>
      </div>
      <futurePlay></futurePlay>
    </div>
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

<style scoped>
.containerMainView {
  width: 100%;
  margin: 0 auto;
}
.twoCont {
  display: flex;
  justify-content: center;
  align-items: end;
}
.recent {
  margin-left: 100px;
}
</style>
