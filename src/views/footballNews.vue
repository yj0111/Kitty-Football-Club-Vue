<template>
  <div>
    <h2>유튜브 전용페이지</h2>
    <youtube-search></youtube-search>
    <hr />
    <youtube-video-detail></youtube-video-detail>
    <hr />
    <youtube-search-result></youtube-search-result>
  </div>
</template>

<script>
import YoutubeSearch from "../components/youtube/YoutubeSearch.vue";
import YoutubeSearchResult from "../components/youtube/YoutubeSearchResult.vue";
import YoutubeVideoDetail from "../components/youtube/YoutubeVideoDetail.vue";

export default {
  name: "YoutubeView",
  components: {
    YoutubeSearch,
    YoutubeSearchResult,
    YoutubeVideoDetail,
  },
};
</script>

<style scoped>
h2 {
  color: red;
}
</style>
