import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginUser from "../views/LoginUser.vue";
import footballNews from "../views/footballNews.vue";
import PayBefore from "../views/PayBefore.vue";
import PcPay from "../views/PcPay.vue";
import PayComplete from "../views/PayComplete.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/createTeam",
    name: "createTeam",
    component: HomeView,
  },
  {
    path: "/getTeam",
    name: "getTeam",
    component: HomeView,
  },
  {
    path: "/footballNews",
    name: "footballNews",
    component: footballNews,
  },
  {
    path: "/login",
    name: "login",
    component: LoginUser,
  },
  {
    path: "/signUp",
    name: "signUp",
    component: HomeView,
  },
  // {
  //   path: "/youtube",
  //   name: "youtube",
  //   component: YoutubeView,
  // },
  {
    path: "/myTeam",
    component: HomeView,
    children: [
      {
        path: ":id",
        name: "main",
        component: HomeView,
      },
      {
        path: "schedule",
        name: "schedule",
        component: HomeView,
      },
      {
        path: "makeGame",
        name: "makeGame",
        component: HomeView,
      },
      {
        path: "record",
        name: "record",
        component: HomeView,
      },
      {
        path: "management",
        name: "management",
        component: HomeView,
      },
    ],
  },
  {
    path: "/",
    component: PayBefore,
    name: "PayBefore",
  },
  {
    path: "/PcPay",
    component: PcPay,
    name: "PcPay",
  },
  {
    path: "/PayComplete",
    component: PayComplete,
    name: "PayComplete",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
