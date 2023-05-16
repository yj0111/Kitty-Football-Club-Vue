import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "@/router";

Vue.use(Vuex);

const REST_API = "http://localhost:9999";
export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
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
          if (res != null) {
            commit;
            console.log(res);
            router.push({ name: "home" });
          } else {
            alert("잘못입력하셨습니다");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  modules: {},
});
