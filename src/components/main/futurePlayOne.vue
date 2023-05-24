<template>
  <div class="OneContainer">
    <div style="font-size: 18px; font-weight: 700; color: white">
      다음 경기 일정
    </div>
    <div class="date">{{ play.game_date }}</div>
    <div class="playCon">
      <div class="teamName">{{ play.team1_name }}</div>
      <div class="topbox">
        <div class="topimgBox">
          <img
            :src="require(`@/assets/${play.team1_logo}`)"
            alt=""
            class="teamLogo"
          />
        </div>
      </div>
      <div class="VS">VS</div>
      <div class="topbox">
        <div class="topimgBox">
          <img
            :src="require(`@/assets/${play.team2_logo}`)"
            alt=""
            class="teamLogo"
          />
        </div>
      </div>
      <div class="teamName">{{ play.team2_name }}</div>
    </div>
    <div class="stadium">
      <spqn class="icons"></spqn>
      <span>{{ play.stadium_name }}</span>
    </div>
    <div>시분초어케할겨</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "futurePlayOne",
  data() {
    return {
      play: {},
    };
  },
  created() {
    const REST_API = "http://localhost:9999";
    const API_URL = `${REST_API}/main/recordOne`;
    axios({
      url: API_URL,
      method: "GET",
    })
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          this.play = res.data;
        } else {
          alert("메인의 다음 경기 일정 데이터가 없다");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
<style scoped>
.OneContainer {
  font-family: "NanumBarunGothic";
  margin: 0 auto;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  width: 468px;
  height: 568px;
  padding: 44px 32px;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(16.5px);
  letter-spacing: 1px;
  font-weight: 500;
}
.playCon {
  display: flex;
}
.date {
  margin-top: 32px;
  margin-bottom: 15px;
  text-align: center;
  font-size: 12px;
  font-weight: 700;
  color: hsla(0, 0%, 100%, 0.5);
}
.stadium {
  margin-top: 40px;
  margin-bottom: 40px;
  text-align: center;
  font-size: 13px;
  font-weight: 700;
  color: #fff;
  opacity: 0.5;
}
.icons {
  content: "";
  display: inline-block;
  /* position: relative;
  top: -2px; */
  width: 15px;
  height: 18px;
  margin-right: 8px;
  vertical-align: middle;
  background: url(@/assets/mainposition.png) 50% 50% / contain no-repeat;
}
.playCon {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: hsla(0, 0%, 100%, 0.5);
  height: 100px;
  /* padding-top: 20px;
  padding-bottom: 20px; */
}
.teamName {
  flex: 1.3;
  font-size: 15px;
  color: white;
}
.teamLogo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.topimgBox {
  width: 70px;
  height: 70px;
  overflow: hidden;
}
.topbox {
  justify-content: center;
  display: flex;
  flex: 1;
}
.VS {
  flex: 2;
  font-size: 22px;
}
</style>
