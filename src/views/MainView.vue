<template>
  <div>
    <mainBanner></mainBanner>

    <div class="containerMainView">
      <div class="twoCont">
        <div class="recent">
          <recentPlay></recentPlay>
        </div>
        <div class="playOne">
          <futurePlayOne></futurePlayOne>
        </div>
        <div class="Ranking">
          <mainRanking></mainRanking>
        </div>
      </div>
    </div>
    <div class="Play">
      <futurePlay></futurePlay>
    </div>
  </div>
</template>

<script>
import mainBanner from "@/components/main/mainBanner.vue";
import mainRanking from "@/components/main/mainRanking.vue";
import futurePlay from "@/components/main/futurePlay.vue";
import recentPlay from "@/components/main/recentPlay.vue";
import futurePlayOne from "@/components/main/futurePlayOne.vue";

export default {
  components: {
    mainBanner,
    mainRanking,
    futurePlay,
    recentPlay,
    futurePlayOne,
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
  align-items: baseline;
  padding-bottom: 100px;
}
.playOne {
  margin-right: 30px;
  margin-left: 30px;
}

.Play {
  padding-top: 120px;
  padding-bottom: 120px;
  background: #000 url(@/assets/mainback3.png) 50% 50% / cover no-repeat;
  width: 100%;
  margin: 0 auto;
}
</style>
