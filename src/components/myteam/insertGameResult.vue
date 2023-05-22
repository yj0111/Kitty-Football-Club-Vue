<template>
  <div class="containerInsert">
    <div class="insertTitle">
      <div class="title">경기 날짜</div>
      <div class="title"></div>
      <div class="title">팀</div>
      <div class="title">점수</div>
      <div class="title">점수</div>
      <div class="title">팀</div>
      <div class="title"></div>
      <div class="title"></div>
    </div>
    <div class="insertContent" v-for="(record, i) in records" :key="i">
      <div class="date content">{{ record.game_date }}</div>
      <div class="logo content">
        <div class="imgBox">
          <img
            :src="require(`@/assets/${record.team1_logo}`)"
            alt=""
            class="teamLogo"
          />
        </div>
      </div>
      <div class="name content">{{ record.team1_name }}</div>
      <div class="goal content">
        <input
          type="text"
          class="Input"
          placeholder="득점"
          v-model="record.team1_score"
        />
      </div>
      <div class="goal content">
        <input
          type="text"
          class="Input"
          placeholder="득점"
          v-model="record.team2_score"
        />
      </div>
      <div class="name content">{{ record.team2_name }}</div>
      <div class="logo content">
        <div class="imgBox">
          <img
            :src="require(`@/assets/${record.team2_logo}`)"
            alt=""
            class="teamLogo"
          />
        </div>
      </div>
      <div class="btn content">
        <button @click="insert(record)">등록하기</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "insertGameResult",
  data() {
    return {
      records: [],
    };
  },
  created() {
    const REST_API = "http://localhost:9999";
    const API_URL = `${REST_API}/team/myteamGameList`;

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

  methods: {
    insert(record) {
      let Game = {
        team1_score: record.team1_score,
        team2_score: record.team2_score,
        team1_id: record.team1_id,
        team2_id: record.team2_id,
        game_id: record.game_id,
      };
      console.log(Game);
      const REST_API = "http://localhost:9999";
      const API_URL = `${REST_API}/team/teamRecording`;
      axios({
        url: API_URL,
        method: "PUT",
        data: Game,
      })
        .then((res) => {
          if (res.data) {
            alert("등록 완료");
          } else {
            alert("회원가입에 실패하였습니다.");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.containerInsert {
  display: flex;
  flex-direction: column;
}
.insertTitle {
  display: flex;
  font-size: 20px;
  align-items: center;
}
.insertContent {
  display: flex;
  align-items: center;
  font-size: 15px;
}
.imgBox {
  width: 35px;
  height: 35px;
  border-radius: 70%;
  overflow: hidden;
}
.teamLogo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.content {
  flex: 1;
  text-align: center;
  vertical-align: middle;
}
.title {
  text-align: center;
  vertical-align: middle;
  flex: 1;
}
.Input {
  width: 80px;
}
.logo {
  display: flex;
  justify-content: center;
}
</style>
