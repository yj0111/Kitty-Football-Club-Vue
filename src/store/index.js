import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "@/router";
Vue.use(Vuex);

const REST_API = "http://localhost:9999";

export default new Vuex.Store({
  state: {
    loginData: {},
    signUpData: {},
    videos: [],
    video: null,
  },
  getters: {},
  mutations: {
    LOGIN_DATA(state, payload) {
      state.loginData = payload;
      localStorage.setItem("loginData", JSON.stringify(payload));
      console.log(state.loginData);
    },
    LOGOUT_DATA(state) {
      state.loginData = {};
      localStorage.removeItem("loginData");
      console.log("data" + state.loginData);
    },
    SIGNUP_DATA(state, payload) {
      state.signUpData = payload;
    },

    SEARCH_YOUTUBE(state, videos) {
      state.videos = videos;
    },
    CLICK_VIDEO(state, video) {
      state.video = video;
    },
  },
  actions: {
    //카카오로그인!!!!!!!!

    //로그인
    Login({ commit }, User) {
      console.log(User);

      const API_URL = `${REST_API}/kfc/login`;
      axios({
        url: API_URL,
        method: "POST",
        params: User,

        withCredentials: true,
      })
        .then((res) => {
          if (res.data.message == "success") {
            console.log(res.data);
            commit("LOGIN_DATA", res.data);
            router.push({ name: "home" });
          } else {
            alert("아이디 또는 비밀번호가 잘못 되었습니다.");
            const input = document.getElementById("id-input");
            input.focus();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //로그아웃!
    Logout({ commit }) {
      const API_URL = `${REST_API}/logout`;
      axios({
        headers: {
          Cookie: `JSESSIONID=${this.jsessionId}`,
        },
        url: API_URL,
        method: "POST",
        withCredentials: true,
      })
        .then((res) => {
          console.log(res);
          if (res.data.message == "success") {
            commit("LOGOUT_DATA");
            router.replace({ name: "login" });
            location.reload();
          } else {
            alert("로그아웃 실패.");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //회원가입
    signUp({ commit }, User) {
      const API_URL = `${REST_API}/kfc/signup`;
      axios({
        headers: {
          "Content-Type": "multipart/form-data",
        },
        url: API_URL,
        method: "POST",
        data: User,
      })
        .then((res) => {
          if (res.data) {
            commit("SIGNUP_DATA", res.data);
            router.push({ name: "home" });
          } else {
            alert("회원가입에 실패하였습니다.");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //유튜브
    searchYoutube({ commit }, payload) {
      const URL = "https://www.googleapis.com/youtube/v3/search";
      const API_KEY = "AIzaSyBZSH08XpKjDAwshjSXw6UhIeyVraRxTu0";
      axios({
        url: URL,
        method: "GET",
        params: {
          key: API_KEY,
          part: "snippet",
          q: payload,
          type: "video",
          maxResults: 10,
        },
      })
        .then((res) => {
          commit("SEARCH_YOUTUBE", res.data.items);
        })
        .catch((err) => console.log(err));
    },
    //payload : 비디오 객체가 들어온다.
    clickVideo({ commit }, payload) {
      commit("CLICK_VIDEO", payload);
    },
  },
  modules: {},
});
