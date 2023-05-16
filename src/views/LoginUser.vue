<template>
  <div>
    <label for="id-input"></label>
    <input type="text" id="id-input" placeholder="아이디" v-model="user_id" />
    <label for="pw"></label>
    <input
      type="password"
      id="pw"
      placeholder="비밀번호"
      v-model="user_password"
    />
    <button @click="Login()">로그인</button>
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

<style></style>
