<template>
  <div class="containerPlay">
    <div class="play1" v-for="(record, i) in records" :key="i">
      <div class="box">
        <img
          :src="require(`@/assets/${record.team1_logo}`)"
          alt=""
          class="teamLogo"
        />
      </div>
      <div class="teamName">{{ record.team1_name }}</div>
      <div class="teamScore">
        {{ record.team1_score }} : {{ record.team2_score }}
      </div>
      <div class="teamName">{{ record.team2_name }}</div>
      <div class="box">
        <img
          :src="require(`@/assets/${record.team2_logo}`)"
          alt=""
          class="teamLogo"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "recentPlay",
  data() {
    return {
      records: [],
    };
  },

  created() {
    const REST_API = "http://localhost:9999";
    const API_URL = `${REST_API}/main/record`;
    axios({
      url: API_URL,
      method: "GET",
    })
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          this.records = res.data;
        } else {
          alert("실 패 ");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
.containerPlay {
  padding: 0 20px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 500px;
  background-color: #102137;
}
.play1 {
  font-size: 10px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 500px;
}
.teamLogo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.box {
  width: 80px;
  height: 80px;
  border-radius: 70%;
  overflow: hidden;
}
.teamName {
  font-size: 16px;
  color: #8e8e8e;
}
.teamScore {
  font-size: 23px;
  color: #cdfe61;
}
</style>
