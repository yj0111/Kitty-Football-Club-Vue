<template>
  <div class="teamDetail">
    <div
      class="detail"
      v-for="(detail, i) in details"
      :key="i"
      @click="openModal(detail)"
    >
      <div class="box">
        <h2>{{ detail.team_name }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "teamDetail",
  props: ["teamId"], // teamId 값을 props로 받음
  data() {
    return {
      team_name: null,
      details: [],
    };
  },

  created() {
    this.fetchUsers(); // fetchUsers() 메서드를 created() 훅에서 호출
  },

  methods: {
    fetchUsers() {
      const REST_API = "http://localhost:9999";
      const API_URL = `${REST_API}/teamDetail/detail/${this.teamId}`;
      axios
        .get(API_URL)
        .then((response) => {
          this.details = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    formatDate(date) {
      return date.split(" ")[0];
    },
    openModal(detail) {
      this.$emit("box-clicked", detail);
    },
  },
};
</script>

<style scoped>
.logopic {
  width: 50px;
  height: 80px;
  object-fit: cover;
}

.teamDetail {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding-left: 30px;
}

.detail {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  cursor: pointer;
}

.box {
  display: flex;
  position: relative;
  width: 240px;
  height: 120px;
  margin: 10px;
  padding: 20px;
  border-radius: 10px;
  overflow: hidden;
  background-color: #f4f4f4;
  transition: transform 0.2s;
  border-color: #dbdbdb;
}

.box:hover {
  transform: scale(1.05);
}

.pic {
  width: 80px;
  height: 80px;
}

.detailInfo {
  flex-grow: 1;
  display: flex;
  font-size: 14px;
  flex-direction: column;
  justify-content: center;
  padding-left: 10px;
}

.detailName {
  font-size: 15px;
  font-weight: bold;
  color: black;
}
</style>
