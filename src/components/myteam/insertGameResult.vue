<template>
  <div class="containerInsert">
    <div class="insertContent" v-for="(record, i) in records" :key="i">
      <div class="dateContent">{{ formatDate(record.game_date) }}</div>
      <div class="nameContent">{{ record.team1_name }}</div>
      <div class="logoContent">
        <img
          :src="require(`@/assets/${record.team1_logo}`)"
          alt=""
          class="teamLogo"
        />
      </div>
      <div class="goalContent">
        <input
          type="text"
          class="Input"
          placeholder="득점"
          v-model="record.team1_score"
        />
      </div>
      <div class="VS">VS</div>
      <div class="goalContent">
        <input
          type="text"
          class="Input"
          placeholder="득점"
          v-model="record.team2_score"
        />
      </div>
      <div class="logoContent2">
        <img
          :src="require(`@/assets/${record.team2_logo}`)"
          alt=""
          class="teamLogo2"
        />
      </div>
      <div class="nameContent">{{ record.team2_name }}</div>
      <div>
        <button @click="insert(record)" class="gobutton">등록하기</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert2";

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
          swal.fire({
            icon: "error",
            title: "전적 조회 실패!!!",
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  },

  methods: {
    formatDate(date) {
      if (!date) return "";

      const options = {
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      const formattedDate = new Date(date).toLocaleString("en-US", options);
      const [datePart, timePart] = formattedDate.split(", ");

      return `${datePart}\n${timePart}`;
    },
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
            swal.fire({
              icon: "success",
              title: "등록 완료!!!",
            });
          } else {
            swal.fire({
              icon: "error",
              title: "등록 실패!!!",
            });
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
.logoContent {
  margin-bottom: 2px;
}
.logoContent2 {
  margin-bottom: 2px;
  flex: 1;
}
.gobutton {
  border: 1px solid white;
  background-color: #102137;
  color: white;
  width: 150px !important;
  height: 40px;
  border-radius: 10px;
  vertical-align: middle;
  text-align: center;
  flex: 0.6;
  margin-top: 26px;
}
.containerInsert {
  display: flex;
  flex-direction: column;
  font-family: "NanumBarunGothic";
}

.logoContent {
  flex: 1;
}
.nameContent {
  flex: 1;
  margin-top: 26px;
  text-align: center;
}

.goalContent {
  flex: 1;
  text-align: center;
  margin-top: 10px;
}
.VS {
  flex: 0.5;
  text-align: center;
  margin-top: 26px;
  font-size: 25px;
  color: gray;
  font-weight: bold;
}
.dateContent {
  font-size: 20px;
  flex: 2;
  margin-top: 26px;
}

.insertContent {
  flex-direction: row;
  display: flex; /* 추가: 내부 요소를 좌우로 정렬하기 위해 flex 컨테이너로 설정 */
  position: relative;
  border-radius: 3px;
  overflow: hidden;
  background-color: #fff;
  transition: transform 0.2s; /* 추가: 호버 효과를 위한 transition 설정 */
  border: 1px solid #e5e5e5;
  padding: 15px 40px;
  margin-left: 130px;
  margin-right: 130px;
  margin-bottom: 20px;
  height: 110px;
}

.teamLogo {
  width: 80px;
  height: 80px;
}
.teamLogo2 {
  width: 80px;
  height: 80px;
  margin-left: 35px;
}

.Input {
  width: 64px;
  height: 64px;
  border: 1px #ddd solid;
  border-radius: 20px;
  font-size: 20px;
  text-align: center;
}
</style>
