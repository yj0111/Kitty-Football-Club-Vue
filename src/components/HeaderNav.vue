<template>
  <header>
    <nav>
      <img alt="Vue logo" src="@/assets/logo.png" width="100px" />
      <router-link :to="{ name: 'createTeam' }">팀만들기 </router-link>
      <router-link :to="{ name: 'getTeam' }">팀구하기 </router-link>
      <router-link :to="{ name: 'myTeam' }">우리팀 </router-link>
      <router-link :to="{ name: 'footballNews' }">축구소식</router-link>
      <router-link :to="{ name: 'login' }">로그인</router-link>
    </nav>
  </header>
</template>

<script>
export default {};
</script>

<style>
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
