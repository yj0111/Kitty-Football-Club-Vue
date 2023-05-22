<template>
  <div class="RankingContainer">
    <div class="ranking">
      <div class="teamRank">랭크</div>
      <div class="box">로고</div>
      <div class="teamName">이름</div>
      <div class="teamScore">승점</div>
      <div class="teamWin">승</div>
      <div class="teamWin">무</div>
      <div class="teamWin">패</div>
    </div>
    <div class="ranking" v-for="(rank, i) in ranking" :key="i">
      <div class="teamRank">{{ rank.ranking }}</div>
      <div class="box">
        <div class="imgBox">
          <img
            :src="require(`@/assets/${rank.team_logo}`)"
            alt=""
            class="teamLogo"
          />
        </div>
      </div>
      <div class="teamName">{{ rank.team_name }}</div>
      <div class="teamScore">{{ rank.score }}</div>
      <div class="teamWin">{{ rank.team_win }}</div>
      <div class="teamWin">{{ rank.team_draw }}</div>
      <div class="teamWin">{{ rank.team_lose }}</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MainRanking",
  data() {
    return {
      ranking: [],
    };
  },
  created() {
    const REST_API = "http://localhost:9999";
    const API_URL = `${REST_API}/team/teamrank`;
    axios({
      url: API_URL,
      method: "GET",
    })
      .then((res) => {
        if (res.data) {
          this.ranking = res.data;
        } else {
          this.ranking = "팀이 없네요!";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
.RankingContainer {
  padding: 0 20px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 500px;
  background-color: #102137;
}
.ranking {
  height: 50px;
  background-color: yellow;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
}
.teamLogo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.box {
  flex: 1;
  font-size: 12px;
}
.imgBox {
  width: 35px;
  height: 35px;
  border-radius: 70%;
  overflow: hidden;
}
.teamRank {
  font-size: 12px;
  flex: 1;
}
.teamName {
  font-size: 12px;
  flex: 1;
}
.teamScore {
  font-size: 12px;
  flex: 1;
}
.teamWin {
  font-size: 12px;
  flex: 1;
}
</style>
