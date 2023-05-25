<template>
  <div class="containerFuture2">
    <div class="title">
      <div class="day">{{ formatDate(daytoday) }}</div>
      <div class="day">{{ formatDate(daytomorrow) }}</div>
      <div class="day">{{ formatDate(dayAfterTomorrow) }}</div>
    </div>
    <div class="content">
      <div class="contentCol">
        <div class="contentDetail" v-for="(todays, i) in today" :key="i">
          <div class="gameCard">
            <div class="date">{{ todays.game_date }}</div>
            <div class="playContent">
              <div class="play">
                <div class="imgBox">
                  <img
                    :src="require(`@/assets/${todays.team1_logo}`)"
                    alt=""
                    class="teamLogo"
                  />
                </div>
                <div class="teamName">{{ todays.team1_name }}</div>
              </div>
              <div class="vs">VS</div>
              <div class="play">
                <div class="imgBox">
                  <img
                    v-if="todays.team2_logo !== ''"
                    :src="require(`@/assets/${todays.team2_logo}`)"
                    alt=""
                    class="teamLogo"
                  />
                  <img
                    v-else
                    src="@/assets/what_white.png"
                    alt=""
                    class="teamLogo"
                  />
                </div>
                <div class="teamName">{{ todays.team2_name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="contentCol">
        <div class="contentDetail" v-for="(tommos, i) in tommo" :key="i">
          <div class="gameCard">
            <div class="date">{{ tommos.game_date }}</div>
            <div class="playContent">
              <div class="play">
                <div class="imgBox">
                  <img
                    :src="require(`@/assets/${tommos.team1_logo}`)"
                    alt=""
                    class="teamLogo"
                  />
                </div>
                <div class="teamName">{{ tommos.team1_name }}</div>
              </div>
              <div class="vs">VS</div>
              <div class="play">
                <div class="imgBox">
                  <img
                    v-if="tommos.team2_logo !== ''"
                    :src="require(`@/assets/${tommos.team2_logo}`)"
                    alt=""
                    class="teamLogo"
                  />
                  <img
                    v-else
                    src="@/assets/what_white.png"
                    alt=""
                    class="teamLogo"
                  />
                </div>
                <div class="teamName">{{ tommos.team2_name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="contentCol">
        <div class="contentDetail" v-for="(sands, i) in sand" :key="i">
          <div class="gameCard">
            <div class="date">{{ sands.game_date }}</div>
            <div class="playContent">
              <div class="play">
                <div class="imgBox">
                  <img
                    :src="require(`@/assets/${sands.team1_logo}`)"
                    alt=""
                    class="teamLogo"
                  />
                </div>
                <div class="teamName">{{ sands.team1_name }}</div>
              </div>
              <div class="vs">VS</div>
              <div class="play">
                <div class="imgBox">
                  <img
                    v-if="sands.team2_logo !== ''"
                    :src="require(`@/assets/${sands.team2_logo}`)"
                    alt=""
                    class="teamLogo"
                  />
                  <img
                    v-else
                    src="@/assets/what_white.png"
                    alt=""
                    class="teamLogo"
                  />
                </div>
                <div class="teamName">{{ sands.team2_name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "futurePlay",
  data() {
    return {
      today: [],
      tommo: [],
      sand: [],
      daytoday: "",
      daytomorrow: "",
      dayAfterTomorrow: "",
    };
  },
  created() {
    const REST_API = "http://localhost:9999";
    const API_URL = `${REST_API}/main/gameList`;
    axios({
      url: API_URL,
      method: "GET",
    })
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          this.today = res.data.today;
          this.tommo = res.data.tommo;
          this.sand = res.data.sand;
        } else {
          this.ranking = "3일간의 경기가  없습니다!";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  //날짜 변환
  mounted() {
    const now = new Date();

    // 오늘 날짜
    this.daytoday = now;

    // 내일 날짜
    const tomorrowDate = new Date(now);
    tomorrowDate.setDate(now.getDate() + 1);
    this.daytomorrow = tomorrowDate;

    // 모래 날짜
    const dayAfterTomorrowDate = new Date(now);
    dayAfterTomorrowDate.setDate(now.getDate() + 2);
    this.dayAfterTomorrow = dayAfterTomorrowDate;
  },
  methods: {
    formatDate(date) {
      const year = date.getFullYear(); // 연도
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${year}.${this.padZero(month)}.${this.padZero(day)}`;
    },
    padZero(value) {
      return value.toString().padStart(2, "0");
    },
  },
};
</script>

<style scoped>
.containerFuture2 {
  margin: 0 auto;
  width: 1300px;
  font-family: "NanumBarunGothic";
  border-radius: 10px;
  margin-top: 30px;
  /* background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(16.5px); */
  letter-spacing: 1px;
  font-weight: 500;
}
.content {
  align-items: baseline;
  display: flex;
}
.title {
  display: flex;
}
.day {
  margin-top: 10px;
  flex: 1;
  text-align: center;
  color: white;
  vertical-align: middle;
}
.contentDetail {
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
}
.contentCol {
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-top: 20px;
}
.playContent {
  display: flex;
  align-items: center;
  text-align: center;
}
.play {
  margin-top: 20px;
  align-items: center;
  display: flex;
  flex-direction: column;
  flex: 2;
}
.vs {
  flex: 2;
  font-size: 22px;
  color: hsla(0, 0%, 100%, 0.5);
  letter-spacing: 2px;
  font-weight: bold;
}
.gameCard {
  padding: 22px 25px;
  width: 330px;
  height: 200px;
  /* background-color: #034f36; */
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(16.5px);
  opacity: 0.9;
  margin-bottom: 32px;

  border-radius: 10px;
}
.gameCard:hover {
  background-color: #034f36;
  opacity: 0.7;
}

.teamLogo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.imgBox {
  width: 75px;
  height: 75px;

  overflow: hidden;
}
.containerFuture {
  margin-top: 15px;
}
.date {
  font-size: 13px;
  font-weight: bold;
  font-family: "NanumBarunGothicBold";
  margin-left: 10px;
  color: hsla(0, 0%, 100%, 0.5);
}
.teamName {
  margin-top: 10px;
  font-size: 17px;
  color: white;
}
</style>
