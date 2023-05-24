<template>
  <div class="containerPlay">
    <div style="font-size: 18px; font-weight: 700; color: white">
      지난 경기 결과
    </div>
    <div class="play1" v-for="(record, i) in records" :key="i">
      <div class="nameCon">
        <div class="box">
          <div class="imgBox">
            <img
              :src="require(`@/assets/${record.team1_logo}`)"
              alt=""
              class="teamLogo"
            />
          </div>
        </div>
        <div class="teamName">{{ record.team1_name }}</div>
      </div>

      <div class="teamScore">
        <div class="date">{{ record.game_date }}</div>
        <div class="score">
          <div
            :class="{
              win: true,
              lose: record.team1_score < record.team2_score,
            }"
          >
            {{ record.team1_score }}&nbsp;
          </div>
          <span>:&nbsp;</span>
          <div
            :class="{
              win: true,
              lose: record.team2_score < record.team1_score,
            }"
          >
            {{ record.team2_score }}
          </div>
        </div>
      </div>

      <div class="nameCon">
        <div class="box">
          <div class="imgBox">
            <img
              :src="require(`@/assets/${record.team2_logo}`)"
              alt=""
              class="teamLogo"
            />
          </div>
        </div>
        <div class="teamName">{{ record.team2_name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "mainRecord",
  data() {
    return {
      records: [],
    };
  },
  created() {
    const REST_API = "http://localhost:9999";
    const API_URL = `${REST_API}/team/myteamRecord`;

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
      },
      url: API_URL,
      method: "GET",
      withCredentials: true,
    })
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          this.records = res.data;
        } else {
          alert("전적을 못 가져와");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>

<style scoped>
.containerPlay {
  font-family: "NanumBarunGothic";
  padding: 0 20px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: 324px;
  height: 568px;
  padding: 44px 32px;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(16.5px);
  letter-spacing: 2px;
}
.play1 {
  border-top: 1px solid hsla(0, 0%, 85%, 0.1);
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
  flex: 1;
}
.box {
  flex: 1;
}
.teamName {
  font-size: 13px;
  flex: 1;

  color: white;
  margin-top: 20px;
}
.teamScore {
  display: flex;
  flex-direction: column;
  flex: 1;
  text-align: center;
  justify-content: center;
}
.imgBox {
  width: 80px;
  height: 80px;

  overflow: hidden;
}
.nameCon {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
}
/* .scoreCont {
    font-family: "NanumBarunGothic";
    color: #102137;
    min-width: 69px;
    height: 30px;
    margin: 0px 2px;
    padding: 0px 16px;
    font-size: 12px;
    font-weight: 700;
    text-align: center;
    border: 2px solid rgb(68, 68, 68);
    border-radius: 17px;
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    transition: border 0.4s ease 0s, background-color 0.4s ease 0s,
      top 0.2s ease 0s;
  } */
.win {
  color: #f2cd00;
}
.lose {
  color: white;
}
.score {
  font-size: 24px;
  font-weight: 700;
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  margin-bottom: 110px;
}
.date {
  font-size: 14px;
  font-weight: 700;
  color: hsla(0, 0%, 100%, 0.5);
  margin-bottom: 30px;
}
</style>
