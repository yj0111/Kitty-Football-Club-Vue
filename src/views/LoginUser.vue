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
      <a id="kakao-login-btn">
        <img
          src="@/assets/kakao_login.png"
          width="400px"
          height="65px"
          alt="카카오 로그인 버튼"
      /></a>
      <br />
      <a id="naver-login-btn" href="">
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
export default {
  name: "LoginUser",
  data() {
    return {
      user_id: "",
      user_password: "",
    };
  },
  methods: {
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
