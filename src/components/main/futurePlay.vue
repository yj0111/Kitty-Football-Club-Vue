<template>
  <div class="containerFuture">
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
                <div>{{ todays.team1_name }}</div>
              </div>
              <div class="vs">VS</div>
              <div class="play">
                <div class="imgBox">
                  <img
                    :src="require(`@/assets/${todays.team2_logo}`)"
                    alt=""
                    class="teamLogo"
                  />
                </div>
                <div>{{ todays.team2_name }}</div>
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
                <div>{{ tommos.team1_name }}</div>
              </div>
              <div class="vs">VS</div>
              <div class="play">
                <div class="imgBox">
                  <img
                    :src="require(`@/assets/${tommos.team2_logo}`)"
                    alt=""
                    class="teamLogo"
                  />
                </div>
                <div>{{ tommos.team2_name }}</div>
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
                <div>{{ sands.team1_name }}</div>
              </div>
              <div class="vs">VS</div>
              <div class="play">
                <div class="imgBox">
                  <img
                    :src="require(`@/assets/${sands.team2_logo}`)"
                    alt=""
                    class="teamLogo"
                  />
                </div>
                <div>{{ sands.team2_name }}</div>
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
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${this.padZero(month)}-${this.padZero(day)}`;
    },
    padZero(value) {
      return value.toString().padStart(2, "0");
    },
  },
};
</script>

<style scoped>
.content {
  display: flex;
}
.title {
  display: flex;
}
.day {
  flex: 1;
  text-align: center;
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
}
.play {
  display: flex;
  flex-direction: column;
  flex: 2;
}
.vs {
  flex: 1;
}
.gameCard {
  width: 200px;
  height: 150px;
  background-color: lightslategrey;
  margin-bottom: 32px;
}
.teamLogo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.imgBox {
  width: 70px;
  height: 70px;
  border-radius: 70%;
  overflow: hidden;
}
.containerFuture {
  margin-top: 15px;
}
</style>
