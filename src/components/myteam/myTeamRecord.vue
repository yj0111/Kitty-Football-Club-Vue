<template>
  <div class="containerRecord">
    <div class="leftContainer">
      <div class="imgBox">
        <img
          :src="require(`@/assets/${ranking.team_logo}`)"
          alt=""
          class="teamLogo"
        />
      </div>
      <div class="teamName">{{ ranking.team_name }}</div>
    </div>
    <div class="rightContainer">
      <div class="rank">현재 {{ ranking.ranking }} 위입니다</div>
      <div class="score">승점 : {{ ranking.score }}</div>
      <div class="recordBox">
        <div class="record">승</div>
        <div class="record">무</div>
        <div class="record">패</div>
      </div>
      <div class="recordBox">
        <div class="record">{{ ranking.team_win }}</div>
        <div class="record">{{ ranking.team_draw }}</div>
        <div class="record">{{ ranking.team_lose }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "myTeamRecord",
  data() {
    return {
      ranking: {},
    };
  },
  created() {
    const REST_API = "http://localhost:9999";
    const API_URL = `${REST_API}/team/myteamRank`;

    const jsessionIdCookie = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("JSESSIONID="));
    let jsessionId = "";
    if (jsessionIdCookie) {
      jsessionId = jsessionIdCookie.split("=")[1];
      console.log(jsessionId);
    }
    axios({
      headers: {
        Cookie: `JSESSIONID=${jsessionId}`,
        "Content-Type": "multipart/form-data",
      },
      url: API_URL,
      method: "GET",
      withCredentials: true,
    })
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          this.ranking = res.data;
        } else {
          alert("팀랭킹을 못가져온다!");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>

<style scoped>
.containerRecord {
  display: flex;
  background-color: red;
  width: 500px;
  height: 500px;
}
.leftContainer {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.rightContainer {
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-evenly;
}
.teamLogo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.imgBox {
  width: 200px;
  height: 200px;
  overflow: hidden;
  margin: 0 auto;
  margin-top: 70px;
}
.teamName {
  font-size: 30px;
  text-align: center;
  vertical-align: middle;
}
.rank {
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  vertical-align: middle;
}
.score {
  font-size: 25px;
  text-align: center;
  vertical-align: middle;
}
.recordBox {
  display: flex;
  align-items: center;
}
.record {
  font-size: 20px;
  text-align: center;
  vertical-align: middle;
  flex: 1;
}
</style>
