<template>
  <div class="TeamList">
    <div
      class="team"
      v-for="(team, i) in teams"
      :key="i"
      @click="openModal(team)"
    >
      <div class="box">
        <div class="teamInfo">
          <div class="teamName" style="text-align: left">
            {{ team.team_name }}
          </div>
          <div class="teamBirth">창단: {{ formatDate(team.team_birth) }}</div>
          <div class="content">{{ team.team_content }}</div>
        </div>
        <div class="logo">
          <img
            :src="require(`@/assets/${team.team_logo}`)"
            alt="로고입니당"
            class="teamLogo"
            id="logo"
          />
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
      originalTeams: [], // 추가: 원본 팀 목록을 저장할 변수
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
          this.originalTeams = res.data; // 원본 팀 목록 저장
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
    filterTeams(searchText) {
      this.teams = this.originalTeams.filter((team) =>
        `${team.team_name}`.includes(searchText)
      );
    },
  },
};
</script>
<style scoped>
.teamBirth {
  color: whitesmoke;
}
.teamLogo {
  width: 140px;
  height: 130px;
  object-fit: cover;
}

.TeamList {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0px 180px;
}
.content {
  font-size: 15px;
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
  width: 500px;
  height: 170px;
  margin: 10px;
  padding: 20px 40px;
  border-radius: 10px;
  overflow: hidden;
  background-color: #034f36;
  transition: transform 0.2s; /* 추가: 호버 효과를 위한 transition 설정 */
  border-color: #dbdbdb;
}

.box:hover {
  transform: scale(1.05); /* 추가: 호버 시 크기를 조금 키웁니다. */
}

.logoWrapper {
  width: 160px;
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo {
  width: 140px;
  height: 130px;
}

.teamInfo {
  flex: 1.3;
  display: flex;
  font-size: 14px;
  flex-direction: column;
  justify-content: center;
  padding-left: 10px; /* 로고와 팀 정보 사이의 간격 설정 */
  color: white;
}

.teamName {
  font-size: 35px;
  font-weight: bold;
  color: white;
}
</style>
