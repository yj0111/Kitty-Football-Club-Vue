<template>
  <span @click="clickVideo">
    <img :src="video.snippet.thumbnails.medium.url" />
  </span>
</template>

<script>
export default {
  name: "YoutubeVideoItem",
  props: {
    video: {
      type: Object,
      required: true,
    },
  },
  methods: {
    clickVideo() {
      this.$store.dispatch("clickVideo", this.video);
    },
  },
};
</script>

<style></style>
