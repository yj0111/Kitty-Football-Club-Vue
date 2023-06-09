import Vue from "vue";
import VueRouter from "vue-router";

import LoginUser from "../views/LoginUser.vue";
import footballNews from "../views/footballNews.vue";
import createTeam from "../views/createTeam.vue";
import getTeam from "../views/getTeam.vue";
import signUp from "../views/signUp.vue";
import myTeam from "../views/myTeam.vue";
import gameGather from "../views/teamGather.vue";
import listGather from "../views/listGather.vue";
import LiveChatting from "../components/myteam/LiveChatting";
import teamManagement from "../components/myteam/teamManagement.vue";
import MainView from "../views/MainView.vue";
import myTeamMain from "../views/myTeamMain.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: MainView,
  },
  {
    path: "/createTeam",
    name: "createTeam",
    component: createTeam,
  },
  {
    path: "/getTeam",
    name: "getTeam",
    component: getTeam,
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
    component: signUp,
  },

  {
    path: "/myTeam",
    name: "myTeam",
    component: myTeam,
    children: [
      {
        path: "",
        name: "myTeamMain",
        component: myTeamMain,
      },
      {
        path: "listGather",
        name: "listGather",
        component: listGather,
      },
      {
        path: "gameGather",
        name: "gameGather",
        component: gameGather,
      },
      {
        path: "LiveChatting",
        name: "LiveChatting",
        component: LiveChatting,
      },
      {
        path: "teamManagement",
        name: "teamManagement",
        component: teamManagement,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
