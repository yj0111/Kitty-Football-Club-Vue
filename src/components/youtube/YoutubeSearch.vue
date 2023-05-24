<template>
  <div class="button-group">
    <button
      class="custom-button"
      @click="setKeywordAndSearch('쿠팡플레이 [2023 K리그1] 14R  vs ')"
      :class="{ active: keyword === '쿠팡플레이 [2023 K리그1] 14R  vs ' }"
    >
      K리그
    </button>
    <button
      class="custom-button"
      @click="setKeywordAndSearch('spotv [22/23 PL 37R] ')"
    >
      프리미어리그
    </button>
    <button
      class="custom-button"
      @click="setKeywordAndSearch('spotv [22/23 라리가 35R] ')"
    >
      라리가
    </button>
    <button
      class="custom-button"
      @click="setKeywordAndSearch('[22/23 세리에A 36R]')"
    >
      세리에A
    </button>
  </div>
</template>

<script>
export default {
  name: "YoutubeSearch",
  data() {
    return {
      keyword: "",
    };
  },
  methods: {
    setKeywordAndSearch(value) {
      this.keyword = value;
      this.search();
    },
    search() {
      this.$store.dispatch("searchYoutube", this.keyword);
    },
  },
};
</script>

<style scoped>
.active {
  background-color: #0c1c2e;
}
.button-group {
  text-align: center;
}
.custom-button {
  background-color: #102137;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 18px;
  margin-right: 8px;
  font-size: 14px;
  cursor: pointer;
}

.custom-button:hover {
  background-color: #0c1c2e;
}
</style>
