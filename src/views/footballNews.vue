<template>
  <div>
    <br />
    <youtube-search></youtube-search>

    <youtube-video-detail></youtube-video-detail>

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
.team_list_h4 {
  text-align: center;
  padding-top: 30px;
  padding-bottom: 30px;
  font-weight: bolder;
}
</style>
