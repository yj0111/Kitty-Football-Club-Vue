<template>
  <div class="button-group">
    <button
      class="custom-button"
      @click="setKeywordAndSearch('[2023 K리그1] 14R ')"
    >
      K리그
    </button>
    <button class="custom-button" @click="setKeywordAndSearch('르세라핌')">
      르세라핌
    </button>
    <button class="custom-button" @click="setKeywordAndSearch('아이브')">
      아이브
    </button>
    <button class="custom-button" @click="setKeywordAndSearch('엔믹스')">
      엔믹스
    </button>
    <button class="custom-button" @click="setKeywordAndSearch('손흥민')">
      손흥민
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
.button-group {
  text-align: center;
}
.custom-button {
  background-color: #102137;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  margin-right: 8px;
  font-size: 14px;
  cursor: pointer;
}

.custom-button:hover {
  background-color: #0c1c2e;
}
</style>
