<template>
  <div class="header">
    <div class="link">
      <router-link :to="{ name: 'listGather' }" class="routerLink">
        경기 공고
      </router-link>
    </div>
    <div class="link">
      <router-link :to="{ name: 'gameGather' }" class="routerLink"
        >경기 주최</router-link
      >
    </div>
    <div class="link">
      <router-link :to="{ name: 'LiveChatting' }" class="routerLink"
        >채팅</router-link
      >
    </div>
    <div class="link">
      <router-link :to="{ name: 'teamManagement' }" class="routerLink"
        >팀 관리</router-link
      >
    </div>
  </div>
</template>

<script scoped>
export default {
  name: "SideNav",
};
</script>

<style scoped>
.header {
  margin-top: 16px;
  background-color: #a8a8a8;
  border-radius: 24px;
  width: 470px;
  justify-content: space-around;
  align-items: center;
  display: flex;
  height: 40px;
}
.link {
  color: white;
  text-decoration: none;
}
.routerLink {
  font-size: 14px;
  color: white;
}
.routerLink:hover {
  text-decoration: none;
  color: #8e8e8e; /* 호버 상태일 때의 링크 색상 설정 */
}
</style>
