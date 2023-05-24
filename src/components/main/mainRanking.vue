<template>
  <div class="RankingContainer">
    <div style="font-size: 18px; font-weight: 700; color: white">리그 순위</div>
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
          <div class="topWin">{{ top.team_win }}승</div>
          <div class="topWin">{{ top.team_draw }}무</div>
          <div class="topWin">{{ top.team_lose }}패</div>
        </div>
      </div>
    </div>
    <div class="twoContainer">
      <div
        style="
          display: flex;
          font-size: 12px;
          font-weight: 400;
          color: #777;
          margin-top: 20px;
        "
      >
        <div style="flex: 1">순위</div>
        <div style="width: 24px"></div>
        <div style="flex: 1; text-align: left; text-indent: 10px">팀</div>
        <div style="flex: 1">포인트</div>
        <div style="flex: 2; display: flex">
          <div style="flex: 1">승</div>
          <div style="flex: 1">무</div>
          <div style="flex: 1">패</div>
        </div>
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
        <div class="winCon">
          <div class="teamWin">{{ rank.team_win }}</div>
          <div class="teamWin">{{ rank.team_draw }}</div>
          <div class="teamWin">{{ rank.team_lose }}</div>
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
  width: 360px;
  height: 568px;
  padding: 44px 32px;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(16.5px);
  letter-spacing: 2px;
  font-weight: 500;
}
.twoContainer {
  width: 296px;
  font-family: "NanumBarunGothic";
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
}
.topRank {
  font-family: "NanumBarunGothic";
  display: flex;
  height: 160px;
  color: white;
}
.ranking {
  margin-top: 11px;
  color: white;
  height: 46px;
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
  font-size: 12px;
}
.winCon {
  display: flex;
  flex: 2;
}
.imgBox {
  width: 24px;
  height: 24px;
  overflow: hidden;
}
.teamRank {
  font-size: 12px;
  font-weight: 400;
  color: #777;
  flex: 1;
}
.teamName {
  font-size: 13px;
  font-weight: 400;

  flex: 1;
}
.teamScore {
  font-size: 13px;
  font-weight: 400;
  color: white;
  flex: 1;
}
.teamWin {
  font-size: 13px;
  font-weight: 400;
  color: #777;
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
  width: 80px;
  height: 80px;
  overflow: hidden;
}
.topRanknig {
  text-align: center;
  font-size: 30px;
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
  margin-bottom: 14px;
}
.topName {
  font-size: 26px;
  margin-bottom: 10px;
}
.topScore {
  font-size: 14px;
  margin-bottom: 10px;
}
.winContainer {
  display: flex;
}
.topWin {
  font-size: 14px;
  flex: 1;
  width: 60px;
  text-align: center;
}
</style>
