<template>
  <div id="app">
    <go-pay></go-pay>
    <live-chatting></live-chatting>
    <header-nav></header-nav>
    <RouterView></RouterView>
    <router-link to="/youtube">Youtube</router-link>
    <h3>카카오 맵</h3>
    <div class="map-area">
      <div class="harbors">
        <div
          class="harbor"
          v-for="hbr in harbors"
          :key="hbr.seq"
          @click="showOnMap(hbr)"
        >
          <h4>{{ hbr.place }}</h4>
        </div>
      </div>
      <kakaoMap class="kmap" :options="mapOption" />
    </div>
  </div>
</template>

<script>
import { RouterView } from "vue-router";
import HeaderNav from "./components/HeaderNav.vue";
import LiveChatting from "./components/LiveChatting.vue";
import KakaoMap from "./components/map/KakaoMap.vue";
import api from "./service/api";
<<<<<<< HEAD
=======
import goPay from "./components/payment/goPay.vue";
>>>>>>> 6e3457ade6c440505583b3f15c874ad47e0ada76

export default {
  mounted() {
    api.harbor.all((res) => {
      console.log("[목록]", res.harbors);
      this.harbors = res.harbors;
    });
  },
  components: {
    HeaderNav,
    RouterView,
    LiveChatting,
    KakaoMap,
<<<<<<< HEAD
=======
    goPay,
>>>>>>> 6e3457ade6c440505583b3f15c874ad47e0ada76
  },
  data() {
    return {
      mapOption: {
        center: {
          lat: 37.501477,
          lng: 127.03966,
        },
        level: 3,
      },
      harbors: [], //empty
    };
  },
  methods: {
    showOnMap(harbor) {
      console.log("[center]", harbor);
      this.mapOption.center = {
        lat: harbor.lat,
        lng: harbor.lng,
      };
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.map-area {
  display: flex;
  .harbors {
    .harbor {
      padding: 10px;
      border: 1px solid transparent;
      &:hover {
        background-color: skyblue;
        border-color: blue;
        cursor: pointer;
      }
      &:active {
        background-color: rgb(248, 173, 223);
        border-color: rgb(238, 119, 212);
      }
      h4 {
        margin: 0;
      }
    }
  }
  .kmap {
    flex: 1 1 auto;
  }
}
</style>
