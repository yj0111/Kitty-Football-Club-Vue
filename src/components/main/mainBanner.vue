<template>
  <div>
    <vueper-slides fade :touchable="false" fixed-height="700px">
      <vueper-slide
        class="banner"
        v-for="(slide, i) in slides"
        :key="i"
        :image="slide.image"
        :title="slide.title"
        :content="slide.content"
        :link="slide.link"
      />
    </vueper-slides>
  </div>
</template>

<script>
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
export default {
  name: "mainBanner",
  components: { VueperSlides, VueperSlide },
  data() {
    return {
      slides: [
        {
          title: "",
          content: "",
          // You can also provide a URL for the image.
          image: require("@/assets/banner3.jpg"),
          //  link: "http://localhost:8080/createTeam",
        },
        {
          title: "",
          content: "",
          // You can also provide a URL for the image.
          image: require("@/assets/banner1.jpg"),
          //   link: "http://localhost:8080//myTeam",
        },
        {
          title: "",
          content: "",
          // You can also provide a URL for the image.
          image: require("@/assets/banner7.jpg"),
          //  link: "http://localhost:8080/getTeam",
        },
        {
          title: "",
          content: "",
          // You can also provide a URL for the image.
          image: require("@/assets/banner5.jpg"),
          //  link: "http://localhost:8080/footballNews",
        },
      ],
    };
  },
};
</script>

<style>
.vueperslide__title {
  color: #102137;
  font-size: 30px;
}
.vueperslide__content {
  color: #102137;
  font-size: 20px;
}
.vueperslide__content-wrapper:hover {
  text-decoration: none;
}
.vueperslides__arrow {
  color: #ffffff;
}
.banner:hover {
  text-decoration: none;
}
.banner {
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
