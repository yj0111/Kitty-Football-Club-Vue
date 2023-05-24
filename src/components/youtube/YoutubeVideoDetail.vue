<template>
  <div v-if="video" class="video-container">
    <div class="flex-container">
      <div class="video-wrapper">
        <iframe
          width="800"
          height="480"
          :src="videoURL"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
      <div class="live-chat-wrapper">
        <LiveChatting2></LiveChatting2>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import LiveChatting2 from "@/components/LiveChatting2.vue";

export default {
  name: "YoutubeVideoDetail",
  components: {
    LiveChatting2,
  },
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
}

.flex-container {
  display: flex;
  flex-direction: row;
}

.video-wrapper,
.live-chat-wrapper {
  flex: 1;
}
</style>
