<template>
  <div>
    <h4 class="team_list_h4">축구 소식</h4>
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
.team_list_h4 {
  text-align: center;
  padding-top: 30px;
  padding-bottom: 30px;
  font-weight: bolder;
}
</style>
