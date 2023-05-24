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

          <button @click="Out(user.id)" class="btn" style="align-items: center">
            팀원 강퇴
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swal from "sweetalert2";
import axios from "axios";
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
          //alert("안돼");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {
    Out(id) {
      const jsessionIdCookie = document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith("JSESSIONID="));
      let jsessionId = "";
      if (jsessionIdCookie) {
        jsessionId = jsessionIdCookie.split("=")[1];
        console.log(jsessionId);
      }

      const REST_API = "http://localhost:9999";
      const API_URL = `${REST_API}/teamManage/kickOut`;
      axios({
        headers: {
          Cookie: `JSESSIONID=${jsessionId}`,
          "Content-Type": "application/json",
        },
        url: API_URL,
        method: "PUT",
        withCredentials: true,
        data: id,
      })
        .then((res) => {
          if (res.data) {
            swal.fire({
              icon: "success",
              title: "팀원 강퇴 완료!",
            });
          } else {
            swal.fire({
              icon: "info",
              title: "운영자만 관리가 가능합니다.",
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
.btn {
  margin-top: 15px;
  padding: 10px 20px;
  background-color: #034f36;
  width: 200px;
  color: #f5f6ff;
  height: 30px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 15px;
  font-family: "NanumBarunGothic";
  transition: background-color 0.3s;
  text-align: center;
  align-items: center;
  display: flex;
  justify-content: center;
}
.btn:hover {
  background-color: #ddd;
}
.concon {
  background: url(@/assets/mainback.png) 50% 50% / cover no-repeat;
  width: 100%;
  margin: 0 auto;
  padding: 100px;
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
}

.box {
  display: flex;
  flex-direction: column;
  width: 240px;
  height: 350px;
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
  width: 100%;
}

.userName {
  font-size: 18px;
  font-weight: bold;
  color: white;
  text-align: left;
  margin-left: 0;
  width: 100%;
}

.userBirth {
  font-size: 14px;

  color: hsla(0, 0%, 100%, 0.5);
  width: 100%;
  text-align: left;
  margin-left: 0;
}

.userAddress {
  font-size: 13px;
  color: hsla(0, 0%, 100%, 0.5);
  width: 170px;
  text-align: left;
  margin-left: 0;
}
.userEmail {
  font-size: 13px;

  color: hsla(0, 0%, 100%, 0.5);
  width: 100%;
  margin-left: 0;
  text-align: left;
}

.teamLogo {
  object-fit: cover;
}
</style>
