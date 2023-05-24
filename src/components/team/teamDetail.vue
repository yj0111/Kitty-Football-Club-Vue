<template>
  <div class="teamDetail">
    <div class="detail" @click="openModal(details)">
      <img
        :src="require(`@/assets/${details.team_logo}`)"
        alt="로고입니당"
        class="teamLogo"
        id="logo"
        style="width: 200px; height: 200px"
      />
    </div>
    <div class="detail1">
      <div
        class="teamInfo"
        style="width: 400px; margin-top: 12px; text-indent: 40px"
      >
        <div class="teamName">{{ details.team_name }}</div>
        <div class="teamRank">현재 랭킹 : {{ details.ranking }} 위</div>
        <div class="teamWin">
          {{ details.team_win }}승 {{ details.team_draw }}무
          {{ details.team_lose }}패
        </div>
        <div class="teamCnt">팀원 :{{ details.total_cnt }}명</div>
        <div class="teamAnnouncement">
          {{ details.team_announcement }}
        </div>
      </div>
    </div>
    <div style="margin-top: 20px">
      <button @click="joinTeam" class="joinTeam-button">가입 신청</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";
import swal from "sweetalert2";
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
              swal.fire({
                icon: "success",
                title: "팀 가입 완료!",
              });
              router.push({ name: "myTeam" });
            } else {
              swal.fire({
                icon: "error",
                title: "팀 가입 실패!",
              });
            }
          })
          .catch((error) => {
            if (error.response.status === 401) {
              // 401 Unauthorized 에러 처리
              swal.fire({
                icon: "info",
                title: "로그인이 필요한 서비스 입니다",
              });
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
.teamLogo {
  width: 200px;
  height: 180px;
}

.teamDetail {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  background-color: #102137;
  width: 100%;
  height: 200px;
  border-radius: 10px;
  font-family: "NanumBarunGothic";
}

.detail {
  margin-left: 40px;
}
.detail1 {
  width: 465px;
  border: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  cursor: pointer;
  color: white;
}

.joinTeam-button {
  width: 100px;
  height: 50px;
  border-style: none;
  border-radius: 10px;
  color: #102137;
  background-color: #cdfe61;
  vertical-align: middle;
}
.teamName {
  font-size: 50px;
  text-align: left;
}
.teamRank {
  text-align: left;
  color: #8e8e8e;
}
.teamCnt,
.teamWin {
  text-align: left;
  font-size: 14px;
  color: #8e8e8e;
}

.teamAnnouncement {
  text-align: left;
  color: #cdfe61;
}
</style>
