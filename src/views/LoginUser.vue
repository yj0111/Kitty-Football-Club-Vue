<template>
  <div class="login-form">
    <h2>로그인</h2>
    <hr />
    <label for="id-input"></label>
    <input
      type="text"
      id="id-input"
      placeholder="아이디를 입력해주세요"
      v-model="user_id"
    />
    <label for="pw"></label>
    <input
      type="password"
      id="pw"
      placeholder="비밀번호를 입력해주세요"
      v-model="user_password"
    />
    <button @click="Login" class="login-button">로그인</button>
    <div>
      <router-link to="/signUp" class="text-dark">
        <small>회원가입</small></router-link
      >
      <span class="text-dark"><small> | </small></span>

      <router-link to="signUp" class="text-dark">
        <small>아이디 찾기</small></router-link
      >
      <span class="text-dark"><small> | </small></span>
      <router-link to="signUp" class="text-dark">
        <small>비밀번호 찾기</small></router-link
      >
    </div>
    <div class="text-center">
      <a id="kakao-login-btn" @click="kakaoLogin()">
        <img
          src="@/assets/kakao_login.png"
          width="400px"
          height="65px"
          alt="카카오 로그인 버튼"
      /></a>
      <br />
      <a id="naver-login-btn" @click="naverLogin()">
        <img
          src="@/assets/naver_login.png"
          width="411px"
          height="75px"
          alt="네이버 로그인 버튼"
      /></a>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import axios from "axios";
export default {
  name: "LoginUser",
  data() {
    return {
      user_id: "",
      user_password: "",
      codes: "",
      Navercode: "",
      state: "",
      isNaver: false,
      isKakao: false,
    };
  },
  //카카오로그인이다
  created() {
    this.create();
    //   if (this.state) {
    //this.getToken2();
    // } else {
    this.getToken();
    //  }

    //네이버
  },
  methods: {
    create() {
      this.codes = this.$route.query.code;
      console.log(this.codes);
      //네이버
      this.Navercode = this.$route.query.code;

      console.log(this.state);
    },
    kakaoLogin() {
      window.location.href =
        "https://kauth.kakao.com/oauth/authorize?client_id=0d71d6cba5e7587e9e8f923fe4fa9212&redirect_uri=http://localhost:8080/login&response_type=code";
    },
    getToken() {
      const REST_API = "http://localhost:9999";
      const API_URL = `${REST_API}/kfc/kakaoCallback`;
      const params = {
        code: this.codes,
      };
      axios({
        url: API_URL,
        method: "GET",
        params: params,
        withCredentials: true,
      })
        .then((res) => {
          console.log(res.data);
          if (res.data.key == "signUp") {
            alert("회원이 아닙니다 가입해 주세요!");
            router.push({ name: "signUp", query: { id: res.data.id } });
          } else {
            alert("일단 성공스");
            this.$store.commit("LOGIN_DATA", res.data);
            router.push({ name: "home" });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //네이버 로그인이다

    naverLogin() {
      this.state = "ecfrh2a4teorujk1km9q4hhfhbk7ab3o0svpdv";
      window.location.href = `https://nid.naver.com/oauth2.0/authorize?client_id=gaTGmrrb4UV7xeZFXhjb&redirect_uri=http://localhost:8080/login&response_type=code&state=${this.state}`;
    },
    getToken2() {
      const REST_API = "http://localhost:9999";
      const API_URL = `${REST_API}/kfc/naverCallback`;
      const params = {
        Navercode: this.Navercode,
        state: this.state,
      };
      axios({
        url: API_URL,
        method: "GET",
        params: params,
        withCredentials: true,
      })
        .then((res) => {
          console.log(res.data);
          if (res.data == "signUp") {
            alert("회원이 아닙니다 가입해 주세요!");
            router.push({ name: "signUp" });
          } else {
            alert("일단 성공스");
            this.$store.commit("LOGIN_DATA", res.data);
            router.push({ name: "home" });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //여기부턴 그냥로그인
    Login() {
      let User = {
        user_id: this.user_id,
        user_password: this.user_password,
      };
      this.$store.dispatch("Login", User);
    },
  },
};
</script>

<style>
.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-form label {
  margin-bottom: 5px;
}

.login-form input {
  padding: 22px, 20px;
  width: 400px;
  height: 55px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.login-button {
  padding: 10px 20px;
  background-color: #cdfe61;
  width: 400px;
  color: black;
  height: 65px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:click {
  background-color: gray;
  color: black;
}
</style>
