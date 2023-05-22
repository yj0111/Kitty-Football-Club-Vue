<template>
  <div class="teamDetail">
    <div class="detail" @click="openModal(details)">
      <img
        :src="require(`@/assets/${details.team_logo}`)"
        alt="로고입니당"
        class="teamLogo"
        id="logo"
        width="100px"
      />
      <h2>{{ details.team_name }}</h2>
      <h4>랭킹: {{ details.ranking }}</h4>
      <h4>승점: {{ details.score }}</h4>
      <h4>승: {{ details.team_win }}</h4>
      <h4>패: {{ details.team_lose }}</h4>
      <h4>무: {{ details.team_draw }}</h4>
      <h4>공고: {{ details.team_announcement }}</h4>
      <h4>현재 인원: {{ details.total_cnt }}</h4>
      <button @click="joinTeam" class="joinTeam-button">가입 신청</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";

export default {
  name: "teamDetail",
  props: ["teamId"], // teamId 값을 props로 받음
  data() {
    return {
      details: {},
    };
  },

  created() {
    this.fetchUsers(); // fetchUsers() 메서드를 created() 훅에서 호출
  },

  methods: {
    fetchUsers() {
      const REST_API = "http://localhost:9999";
      const API_URL = `${REST_API}/teamDetail/detail/${this.teamId}`;

      axios
        .get(API_URL)
        .then((response) => {
          this.details = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    openModal(detail) {
      this.$emit("box-clicked", detail);
    },

    joinTeam() {
      const REST_API = "http://localhost:9999";
      const API_URL = `${REST_API}/teamDetail/join/${this.teamId}`;

      const jsessionIdCookie = document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith("JSESSIONID="));
      let jsessionId = "";
      if (jsessionIdCookie) {
        jsessionId = jsessionIdCookie.split("=")[1];
        console.log(jsessionId);
      }

      if (confirm("정말로 가입 신청하시겠습니까?")) {
        axios({
          headers: {
            Cookie: `JSESSIONID=${jsessionId}`,
          },
          url: API_URL,
          method: "POST",
          withCredentials: true,
        })
          .then((res) => {
            if (res.data) {
              alert("팀 가입 신청이 완료되었습니다.");
              router.push({ name: "home" });
            } else {
              alert("팀 가입에 실패하였습니다.");
            }
          })
          .catch((error) => {
            if (error.response.status === 401) {
              // 401 Unauthorized 에러 처리
              alert("로그인이 필요한 서비스입니다.");
              router.push({ name: "login" });
            } else {
              // 다른 에러 처리
              console.error(error);
            }
          });
      }
    },
  },
};
</script>

<style scoped>
.logopic {
  width: 50px;
  height: 80px;
  object-fit: cover;
}

.teamDetail {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding-left: 30px;
}

.detail {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  cursor: pointer;
}

.box {
  display: flex;
  position: relative;
  width: 240px;
  height: 120px;
  margin: 10px;
  padding: 20px;
  border-radius: 10px;
  overflow: hidden;
  background-color: #f4f4f4;
  transition: transform 0.2s;
  border-color: #dbdbdb;
}

.box:hover {
  transform: scale(1.05);
}

.pic {
  width: 80px;
  height: 80px;
}

.detailInfo {
  flex-grow: 1;
  display: flex;
  font-size: 14px;
  flex-direction: column;
  justify-content: center;
  padding-left: 10px;
}

.detailName {
  font-size: 15px;
  font-weight: bold;
  color: black;
}
</style>
