<template>
  <div v-if="video" class="video-container">
    <iframe
      width="1000"
      height="600"
      :src="videoURL"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "YoutubeVideoDetail",
  computed: {
    ...mapState(["video"]),
    videoURL() {
      const videoId = this.video.id.videoId;
      return `https://www.youtube.com/embed/${videoId}`;
    },
  },
};
</script>

<style scoped>
.video-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
}
</style>
