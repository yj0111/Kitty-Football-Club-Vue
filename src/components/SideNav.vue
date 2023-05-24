<template>
  <div class="header">
    <div class="link">
      <router-link :to="{ name: 'myTeamMain' }" class="routerLink">
        홈
      </router-link>
    </div>
    <div class="link">
      <router-link :to="{ name: 'listGather' }" class="routerLink">
        경기 공고
      </router-link>
    </div>
    <div class="link">
      <router-link :to="{ name: 'gameGather' }" class="routerLink">
        경기 주최
      </router-link>
    </div>
    <div class="link">
      <router-link :to="{ name: 'LiveChatting' }" class="routerLink">
        채팅
      </router-link>
    </div>
    <div class="link">
      <router-link :to="{ name: 'teamManagement' }" class="routerLink">
        팀 관리
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideNav",
};
</script>

<style scoped>
.header {
  font-family: "NanumBarunGothic";
  background-color: #d3d3d3f7;
  border-radius: 24px;
  width: 470px;
  justify-content: space-around;
  align-items: center;
  display: flex;
  height: 40px;
  margin-left: 658px;
}
.link {
  color: white;
  text-decoration: none;
}
.routerLink {
  font-size: 14px;
  color: #034f36;
}
.routerLink:hover {
  text-decoration: none;
  color: #8e8e8e;
}
</style>
