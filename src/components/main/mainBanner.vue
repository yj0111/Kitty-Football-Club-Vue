<template>
  <div>
    <vueper-slides :dragging-distance="50">
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
          title: "팀만들러 가자~",
          content: "오예",
          // You can also provide a URL for the image.
          image: require("@/assets/시나모롤1.jpg"),
          link: "http://localhost:8080/createTeam",
        },
        {
          title: "우리팀 보러 가자~",
          content: "하핫",
          // You can also provide a URL for the image.
          image: require("@/assets/시나모롤2.jpg"),
          link: "http://localhost:8080//myTeam",
        },
        {
          title: "클럽에 가입해 보자~",
          content: "고고고",
          // You can also provide a URL for the image.
          image: require("@/assets/시나모롤3.jpg"),
          link: "http://localhost:8080/getTeam",
        },
        {
          title: "소식을 보러 가자",
          content: "소식소식",
          // You can also provide a URL for the image.
          image: require("@/assets/시나모롤4.jpg"),
          link: "http://localhost:8080/footballNews",
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
  color: #102137;
}
.banner:hover {
  text-decoration: none;
}
.banner {
  background-size: 800px;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
