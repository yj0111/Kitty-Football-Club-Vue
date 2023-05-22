<template>
  <div class="TeamList">
    <div
      class="team"
      v-for="(team, i) in teams"
      :key="i"
      @click="openModal(team)"
    >
      <div class="box">
        <div class="logo">
          <img
            :src="require(`@/assets/${team.team_logo}`)"
            alt="로고입니당"
            class="teamLogo"
            id="logo"
          />
        </div>
        <div class="teamInfo">
          <div class="teamName" style="text-align: center">
            {{ team.team_name }}
          </div>
          <div class="teamBirth">창설: {{ formatDate(team.team_birth) }}</div>
          <div class="content">소개말: {{ team.team_content }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "teamList",
  data() {
    return {
      teams: [],
    };
  },

  created() {
    const REST_API = "http://localhost:9999";
    const API_URL = `${REST_API}/team/list`;
    axios({
      url: API_URL,
      method: "GET",
    })
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          this.teams = res.data;
        } else {
          alert("실패");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  methods: {
    formatDate(date) {
      return date.split(" ")[0];
    },
    openModal(team) {
      this.$emit("box-clicked", team.team_id);
    },
  },
};
</script>

<style scoped>
.teamLogo {
  width: 70px;
  height: 80px;
  object-fit: cover;
}

.TeamList {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding-left: 30px;
}

.team {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  cursor: pointer; /* 추가: 커서를 포인터로 변경하여 클릭 가능함을 나타냄 */
}

.box {
  display: flex; /* 추가: 내부 요소를 좌우로 정렬하기 위해 flex 컨테이너로 설정 */
  position: relative;
  width: 240px; /* 한 줄에 3개의 box를 표시하도록 조정 */
  height: 120px; /* 높이도 원하는 크기로 조정 가능 */
  margin: 10px;
  padding: 20px;
  border-radius: 10px;
  overflow: hidden;
  background-color: #f4f4f4;
  transition: transform 0.2s; /* 추가: 호버 효과를 위한 transition 설정 */
  border-color: #dbdbdb;
}

.box:hover {
  transform: scale(1.05); /* 추가: 호버 시 크기를 조금 키웁니다. */
}

.logo {
  width: 80px;
  height: 80px;
}

.teamInfo {
  flex-grow: 1; /* 추가: 남은 공간을 차지하도록 설정 */
  display: flex;
  font-size: 14px;
  flex-direction: column;
  justify-content: center;
  padding-left: 10px; /* 로고와 팀 정보 사이의 간격 설정 */
}

.teamName {
  font-size: 15px;
  font-weight: bold;
  color: black;
}
</style>
