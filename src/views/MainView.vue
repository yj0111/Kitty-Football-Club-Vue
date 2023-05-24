<template>
  <div>
    <mainBanner></mainBanner>
    <!-- <div class="Play">
      <futurePlay></futurePlay>
    </div> -->
    <div class="containerMainView">
      <!-- <div class="twoCont">
        <div class="Ranking">
          <mainRanking></mainRanking>
        </div>

        <div class="recent">
          <recentPlay></recentPlay>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import mainBanner from "@/components/main/mainBanner.vue";
//import mainRanking from "@/components/main/mainRanking.vue";
//import futurePlay from "@/components/main/futurePlay.vue";
//import recentPlay from "@/components/main/recentPlay.vue";

export default {
  components: {
    mainBanner,
    //mainRanking,
    // futurePlay,
    //recentPlay,
  },
  name: "MainView",
  data() {
    return {
      records: [],
    };
  },
};
</script>

<style scoped>
.containerMainView {
  background: url(@/assets/mainback.png) 50% 50% / cover no-repeat;
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
.Play {
  margin: 0 auto;
}
</style>
