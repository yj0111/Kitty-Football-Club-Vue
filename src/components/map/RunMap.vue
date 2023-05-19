<template>
  <div>
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
import KakaoMap from "@/components/map/KakaoMap.vue";
import api from "@/service/api";
export default {
  name: "RunMap",
  components: {
    KakaoMap,
  },
  mounted() {
    api.harbor.all((res) => {
      console.log("[목록]", res.harbors);
      this.harbors = res.harbors;
    });
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

<style scoped>
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
