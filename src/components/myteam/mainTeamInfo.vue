<template>
  <div class="teamDetailContainer">
    <div class="teamDetail">
      <div class="detail">
        <img
          :src="require(`@/assets/${details.team_logo}`)"
          alt="로고입니당"
          class="teamLogo"
          id="logo"
        />
      </div>
      <div class="detail1">
        <div class="teamInfo" style="width: 400px; margin-top: 12px">
          <div class="teamName">{{ details.team_name }}</div>
          <div class="teamRank">현재 랭킹 : {{ details.ranking }} 위</div>
          <div class="teamWin">
            {{ details.team_win }}승 {{ details.team_draw }}무
            {{ details.team_lose }}패
          </div>
          <div class="teamCnt">팀원 :{{ details.total_cnt }}명</div>
          <div class="teamAnnouncement">
            소개 글 :
            {{ details.team_announcement }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "teamDetail",
  props: ["teamId"], // teamId 값을 props로 받음
  data() {
    return {
      details: {},
    };
  },

  created() {
    const REST_API = "http://localhost:9999";
    const API_URL = `${REST_API}/teamDetail/detail2`;

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
          this.details = res.data;
        } else {
          alert("안돼");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>

<style scoped>
.teamLogo {
  width: 100%;
  height: 100%;

  object-fit: cover;
}

.teamDetail {
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(16.5px);
  height: 568px;
  margin-right: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}
.teamDetailContainer {
  letter-spacing: 1.5px;
  margin: 0 auto;
  font-family: "NanumBarunGothic";
}
.detail {
  width: 300px;
  height: 300px;
  margin-left: 40px;
  overflow: hidden;
}
.detail1 {
  width: 465px;
  border: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
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
  font-weight: bold;
  font-size: 60px;
  text-align: left;
}
.teamRank {
  text-align: left;
  font-size: 40px;
  font-weight: 700;
  color: hsla(0, 0%, 100%, 0.5);
}
.teamCnt,
.teamWin {
  text-align: left;
  font-size: 25px;
  font-weight: 700;
  color: hsla(0, 0%, 100%, 0.5);
}

.teamAnnouncement {
  text-align: left;
  font-size: 25px;
  font-weight: 700;
  color: hsla(0, 0%, 100%, 0.5);
}
.teamInfo {
  text-indent: 50px;
}
</style>
