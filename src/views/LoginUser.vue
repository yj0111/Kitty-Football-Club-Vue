<template>
  <div class="login-wrapper">
    <div class="login-form">
      <h3 class="loginn" style="margin-bottom: 50px">로그인</h3>
      <label class="label" for="id-input"></label>
      <input
        type="text"
        id="id-input"
        placeholder="아이디"
        v-model="user_id"
        style="font-size: 13px"
      />
      <label for="pw"></label>
      <input
        type="password"
        id="pw"
        placeholder="비밀번호"
        v-model="user_password"
        style="font-size: 13px"
      />
      <button @click="Login" class="login-button" style="margin-top: 15px">
        로그인
      </button>
      <div class="submenu" style="padding-top: 20px">
        <router-link to="/signUp" class="text-dark">
          <small class="submenu-text">회원가입</small>
        </router-link>
        <span class="text-dark"><small> | </small></span>
        <router-link to="signUp" class="text-dark">
          <small class="submenu-text">아이디 찾기</small>
        </router-link>
        <span class="text-dark"><small> | </small></span>
        <router-link to="signUp" class="text-dark">
          <small class="submenu-text">비밀번호 찾기</small>
        </router-link>
      </div>
      <div class="btns" style="padding-top: 30px">
        <a id="kakao-login-btn" @click="kakaoLogin()">
          <img
            src="@/assets/kakao_login.png"
            width="64px"
            height="64px"
            alt="카카오 로그인 버튼"
        /></a>

        <a
          id="naver-login-btn"
          @click="naverLogin()"
          style="padding-left: 20px"
        >
          <img
            src="@/assets/naver_login.png"
            width="64px"
            height="64px"
            alt="네이버 로그인 버튼"
        /></a>
      </div>
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
            alert("일단 성공");
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

<style scoped>
.login-wrapper {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  height: 100vh;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 16px;
  margin-top: 50px; /* 적절한 값으로 조정 */
}

input {
  width: 340px;
  height: 54px;
  padding: 0px 11px 1px 15px;
  margin-bottom: 10px;
}

.login-form label {
  margin-bottom: 5px;
}

.login-form input {
  padding: 22px 20px;
  width: 400px;
  height: 55px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.login-form input,
.loginn,
.submenu-text {
  font-family: "NanumBarunGothic";
}

.login-button {
  padding: 10px 20px;
  background-color: #102137;
  width: 400px;
  color: #f5f6ff;
  height: 62px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 15px;
  font-family: "NanumBarunGothic";
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #ddd;
  color: black;
  border-color: #ddd;
  border: 1px solid #ddd;
}

.btns {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
}

.btns a {
  margin-right: 20px;
}

.image-wrapper {
  display: flex;
  align-items: center;
}

.image {
  width: 600px;
  height: 750px;
  border-radius: 28px;
}
</style>
