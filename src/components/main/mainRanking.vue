<template>
  <div class="RankingContainer">
    <!-- <div class="ranking">
      <div class="teamRank">랭크</div>
      <div class="box">로고</div>
      <div class="teamName">이름</div>
      <div class="teamScore">승점</div>
      <div class="teamWin">승</div>
      <div class="teamWin">무</div>
      <div class="teamWin">패</div>
    </div> -->

    <div class="topRank">
      <div class="topRanknig">{{ top.ranking }}</div>
      <div class="topbox">
        <div class="topimgBox">
          <img
            :src="require(`@/assets/${top.team_logo}`)"
            alt=""
            class="teamLogo"
          />
        </div>
      </div>
      <div class="nameContainer">
        <div class="topName">{{ top.team_name }}</div>
        <div class="topScore">{{ top.score }} Points</div>
        <div class="winContainer">
          <div class="topWin">W: {{ top.team_win }}</div>
          <div class="topWin">D: {{ top.team_draw }}</div>
          <div class="topWin">L :{{ top.team_lose }}</div>
        </div>
      </div>
    </div>
    <div class="twoContainer">
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
        <div class="teamScore">{{ rank.score }} Pts</div>
        <div class="winCon">
          <div class="teamWin">W:{{ rank.team_win }}</div>
          <div class="teamWin">D:{{ rank.team_draw }}</div>
          <div class="teamWin">L:{{ rank.team_lose }}</div>
        </div>
      </div>
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
      top: [],
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
          console.log(res.data);
          this.ranking = res.data.no;
          this.top = res.data.top[0];
          console.log(this.top);
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
  font-family: "NanumBarunGothic";
  margin: 0 auto;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  width: 700px;
  height: 700px;
  background-color: #102137;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.8);
  letter-spacing: 2px;
  border-radius: 10px;
}
.twoContainer {
  font-family: "NanumBarunGothic";
  padding: 0 60px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: 700px;
}
.topRank {
  font-family: "NanumBarunGothic";
  display: flex;
  background-color: #cdfe61;
  height: 250px;
  color: #102137;
}
.ranking {
  margin-top: 20px;
  color: white;
  height: 80px;
  background-color: #102137;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  border-bottom: 1px solid #dbdbdb;
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
.winCon {
  display: flex;
  flex: 1;
}
.imgBox {
  width: 55px;
  height: 55px;
  overflow: hidden;
}
.teamRank {
  font-size: 20px;
  flex: 1;
}
.teamName {
  font-size: 20px;
  flex: 1;
}
.teamScore {
  font-size: 17px;
  flex: 1;
}
.teamWin {
  font-size: 13px;
  flex: 1;
}

.topbox {
  flex: 2;
  align-self: flex-end;
  margin-bottom: 15px;
  justify-content: center;
}
.topimgBox {
  margin-left: 30px;
  width: 180px;
  height: 180px;
  overflow: hidden;
}
.topRanknig {
  text-align: center;
  font-size: 60px;
  flex: 1;
  align-self: flex-end;
  margin-bottom: 10px;
}
.nameContainer {
  margin-right: 40px;
  display: flex;
  flex-direction: column;
  flex: 3;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 50px;
}
.topName {
  font-size: 40px;
  margin-bottom: 10px;
}
.topScore {
  font-size: 25px;
  margin-bottom: 10px;
}
.winContainer {
  display: flex;
}
.topWin {
  font-size: 15px;
  flex: 1;
  width: 60px;
  text-align: center;
}
</style>
