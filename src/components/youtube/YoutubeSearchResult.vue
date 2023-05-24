<template>
  <div>
    <div class="youtube-list">
      <youtube-video-item
        v-for="(video, index) in visibleVideos"
        :key="video.id.videoId"
        :video="video"
        :index="index"
        :style="{ margin: '10px 10px' }"
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
    visibleVideos() {
      //9개의 영상
      return this.videos.slice(0, 9);
    },
  },
};
</script>

<style scoped>
.youtube-list {
  text-align: center;
  padding: 10px 100px;
  margin: 10px;
}
.youtube-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.youtube-list ::v-deep .youtube-video-item {
  margin: 10px;
}
</style>
