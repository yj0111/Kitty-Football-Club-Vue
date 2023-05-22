<template>
  <div class="managementContainer">
    <div class="title">
      <div class="titleCont"></div>
      <div class="titleCont">이름</div>
      <div class="titleCont">생년월일</div>
      <div class="titleCont">이메일</div>
      <div class="titleCont">가입일</div>
      <div class="titleCont"></div>
    </div>
    <div class="content">
      <div class="person" v-for="(peoples, i) in people" :key="i">
        <div class="contents">
          <div class="imgBox">
            <img
              :src="require(`@/assets/${peoples.user_pic}`)"
              alt=""
              class="teamLogo"
            />
          </div>
        </div>
        <div class="contents">{{ peoples.user_name }}</div>
        <div class="contents">{{ peoples.user_birth }}</div>
        <div class="contents">{{ peoples.user_email }}</div>
        <div class="contents">{{ peoples.user_team_join_date }}</div>
        <button @click="Out(peoples.id)">추방하자</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "teamManagement",
  data() {
    return {
      people: [],
    };
  },
  created() {
    const REST_API = "http://localhost:9999";
    const API_URL = `${REST_API}/teamManage/list`;
    const jsessionIdCookie = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("JSESSIONID="));
    let jsessionId = "";
    if (jsessionIdCookie) {
      jsessionId = jsessionIdCookie.split("=")[1];
      console.log(jsessionId);
    }
    axios({
      url: API_URL,
      method: "GET",
      withCredentials: true,
    })
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          console.log(res.data);
          this.people = res.data;
        } else {
          alert("멤버가 없네요");
        }
      })
      .catch((err) => {
        console.log(err);
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
            alert("추방 완료");
          } else {
            alert("운영자만 가능해요");
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
.title {
  display: flex;
}
.titleCont {
  text-align: center;
  flex: 1;
}
.content {
  display: flex;
  flex-direction: column;
}
.person {
  display: flex;
}
.contents {
  flex: 1;
  text-align: center;
}
</style>
