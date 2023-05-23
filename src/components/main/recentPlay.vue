<template>
  <div class="containerPlay">
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
          <div
            :class="{
              win: true,
              lose: record.team2_score < record.team1_score,
            }"
          >
            : {{ record.team2_score }}
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
          this.records = "최근 경기가 없어요~";
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
  font-family: "NanumBarunGothic";
  padding: 0 20px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 500px;
  background-color: #102137;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.8);
  letter-spacing: 2px;
  border-radius: 10px;
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
  flex: 1;
}
.box {
  flex: 1;
}
.teamName {
  font-size: 22px;
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
  width: 120px;
  height: 120px;

  overflow: hidden;
}
.nameCon {
  display: flex;
  flex: 2;
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
  color: #cdfe61;
}
.lose {
  color: white;
}
.score {
  font-size: 26px;
  color: #cdfe61;
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  margin-bottom: 110px;
}
.date {
  font-size: 16px;
  color: white;
  margin-bottom: 50px;
}
</style>
