import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "@/router";

Vue.use(Vuex);

const REST_API = "http://localhost:9999";
export default new Vuex.Store({
  state: {
    loginData: {},
  },
  getters: {},
  mutations: {
    LOGIN_DATA(state, payload) {
      state.loginData = payload;
    },
  },
  actions: {
    //로그인!!!!!!!!
    Login({ commit }, User) {
      const API_URL = `${REST_API}/kfc/login`;
      axios({
        url: API_URL,
        method: "POST",
        params: User,
      })
        .then((res) => {
          if (res.data) {
            commit("LOGIN_DATA", res.data);

            router.push({ name: "home" });
          } else {
            alert("잘못입력하셨습니다");
            const input = document.getElementById("id-input");
            input.focus();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  modules: {},
});
