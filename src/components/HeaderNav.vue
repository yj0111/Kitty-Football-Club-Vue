<template>
  <div class="header">
    <div class="logo">
      <router-link :to="{ name: 'home' }" class="routerLink">
        <img
          alt="Vue logo"
          src="@/assets/KFC_logo-removebg-preview.png"
          width="150px"
        />
      </router-link>
    </div>
    <div class="link">
      <router-link :to="{ name: 'createTeam' }" class="routerLink"
        >팀만들기</router-link
      >
    </div>
    <div class="link">
      <router-link :to="{ name: 'getTeam' }" class="routerLink"
        >팀구하기</router-link
      >
    </div>
    <div class="link" style="position: relative">
      <router-link :to="{ name: 'myTeamMain' }" class="routerLink"
        >우리팀</router-link
      >
      <SideNav v-if="showSideNav" class="sideBar"></SideNav>
    </div>
    <div class="link">
      <router-link :to="{ name: 'footballNews' }" class="routerLink"
        >축구소식</router-link
      >
    </div>
    <div class="btnGroup">
      <b-icon icon="bell" class="bell" style=""></b-icon>
      <div class="link">
        <div v-if="jsessionId" class="routerLink loginB" @click="logout()">
          로그아웃
        </div>
        <router-link v-else :to="{ name: 'login' }" class="routerLink loginB">
          <div>로그인</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script scoped>
import { mapState } from "vuex";
import SideNav from "./SideNav.vue";
export default {
  name: "HeaderNav",
  comments: {
    SideNav,
  },
  data() {
    return {
      showSideNav: false,
      jsessionId: "",
    };
  },
  computed: {
    //배열형태라 [] 에 넣어주가
    ...mapState(["loginData"]),
  },
  watch: {
    loginData: {
      handler: "handleLoginSuccess",
      immediate: true,
    },
    $route(to) {
      this.handleRouteChange(to);
    },
  },
  methods: {
    handleRouteChange(to) {
      // 경로가 '/myteam/'로 시작하는 경우에만 showSideNav를 true로 설정
      this.showSideNav = to.path.startsWith("/myTeam/");
    },
    handleLoginSuccess() {
      const jsessionIdCookie = document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith("JSESSIONID="));
      if (jsessionIdCookie) {
        const jsessionId = jsessionIdCookie.split("=")[1];
        this.jsessionId = jsessionId;
      } else {
        this.jsessionId = "";
      }
    },
    logout() {
      this.$store.dispatch("Logout");
    },
  },
  components: { SideNav },
};
</script>

<style scoped>
.header {
  font-family: "NanumBarunGothic";
  height: 96px;

  justify-content: space-between;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 64px;
}
.link {
  font-weight: bold;
  color: #102137;
  text-decoration: none;
}
.routerLink {
  font-size: 16px;
  color: #102137;
}
.routerLink:hover {
  text-decoration: none;
  color: #8e8e8e; /* 호버 상태일 때의 링크 색상 설정 */
}

.loginB {
  font-family: "NanumBarunGothic";
  color: #102137;
  min-width: 69px;
  height: 30px;
  margin: 0px 2px;
  padding: 0px 16px;
  font-size: 12px;
  font-weight: 700;
  text-align: center;
  border: 2px solid rgb(68, 68, 68);
  border-radius: 17px;
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  transition: border 0.4s ease 0s, background-color 0.4s ease 0s,
    top 0.2s ease 0s;
}
.btnGroup {
  display: flex;
  align-items: center;
}
.bell {
  width: 25px;
  height: 25px;
  margin-right: 20px;
  color: #102137;
}
.loginB,
.bell:hover,
.logo:hover {
  cursor: pointer;
}
.sideBar {
  right: -176px;
  width: 387px;
  height: 27px;
  position: absolute;
  top: 33px;
  z-index: 1;
}
</style>
