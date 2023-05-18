<template>
  <div ref="map"></div>
</template>

<script>
let kakao = window.kakao;
export default {
  props: ["options"],
  data() {
    return {
      mapInstance: null, // 데이터에 mapInstance 추가
    };
  },
  mounted() {
    kakao = kakao || window.kakao;
    console.log(this.$refs.map);

    var container = this.$refs.map;
    const { center, level } = this.options;
    this.mapInstance = new kakao.maps.Map(container, {
      center: new kakao.maps.LatLng(center.lat, center.lng),
      level: level,
    }); // this.mapInstance에 할당
    console.log(this.mapInstance);
  },
  watch: {
    "options.center"(cur) {
      console.log("[NEW CENTER]", cur.lat, cur.lng);
      this.mapInstance.setCenter(new kakao.maps.LatLng(cur.lat, cur.lng)); // this.mapInstance 사용
    },
  },
};
</script>

<style>
.kmap {
  height: 500px;
}
</style>
