<template>
  <div>
    <h3>검색 결과</h3>
    <div class="youtube-list">
      <youtube-video-item
        v-for="video in videos"
        :key="video.id.videoId"
        :video="video"
      ></youtube-video-item>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import YoutubeVideoItem from "./YoutubeVideoItem.vue";

export default {
  components: { YoutubeVideoItem },
  name: "YoutubeSearchResult",
  computed: {
    ...mapState(["videos"]),
  },
};
</script>

<style scoped>
.youtube-list {
  text-align: left;
}
</style>
