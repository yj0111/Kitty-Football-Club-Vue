<template>
  <div class="concon">
    <div class="listText">멤버 리스트</div>
    <div class="UserList">
      <div class="user" v-for="(user, i) in users" :key="i">
        <div class="box">
          <div class="pic">
            <img
              :src="require(`@/assets/${user.user_pic}`)"
              alt="프로필사진"
              class="userpic"
              id="pic"
            />
          </div>
          <div class="userInfo">
            <div class="userName">{{ user.user_name }}</div>
            <div class="userBirth">{{ user.user_birth }}</div>
            <div class="userAddress">{{ user.user_address }}</div>
            <div class="userEmail">{{ user.user_email }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";
import swal from "sweetalert2";
export default {
  name: "UserList",
  props: ["teamId"], // teamId 값을 props로 받음
  data() {
    return {
      users: [],
    };
  },
  created() {
    const REST_API = "http://localhost:9999";
    const API_URL = `${REST_API}/teamManage/list2`;

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
          this.users = res.data;
        } else {
          alert("안돼");
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
  },
};
</script>

<style scoped>
.userpic {
  width: 200px;
  height: 100%;
  object-fit: cover;
}
.listText {
  text-indent: 252px;
  font-size: 18px;
  font-weight: 700;
  color: white;
}
.concon {
  width: 80%;
  margin: 0 auto;
}
.UserList {
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  font-family: "NanumBarunGothic";
  letter-spacing: 1.5px;
  justify-content: center;
  padding-bottom: 40px;
}

.user {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  cursor: pointer;
}

.box {
  display: flex;
  flex-direction: column;
  width: 240px;
  height: 300px;
  margin: 10px;
  padding: 20px;
  border-radius: 10px;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(16.5px);
  transition: transform 0.2s;
}

.box:hover {
  transform: scale(1.05);
}

.pic {
  width: 100%;
  height: 150px;
  margin-bottom: 10px;
  border-radius: 10px;
}

.userInfo {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-top: 14px;
}

.userName {
  font-size: 18px;

  font-weight: bold;
  color: white;
  text-align: left;
  margin-left: 0;
  width: 100px;
}

.userBirth {
  font-size: 14px;

  color: hsla(0, 0%, 100%, 0.5);
  width: 100px;
  text-align: left;
  margin-left: 0;
}

.userAddress {
  font-size: 13px;

  color: hsla(0, 0%, 100%, 0.5);
  width: 180px;
  text-align: left;
  margin-left: 0;
}
.userEmail {
  font-size: 13px;

  color: hsla(0, 0%, 100%, 0.5);
  width: 100px;
  margin-left: 0;
  text-align: left;
}
</style>
