<template>
  <header>
    <nav>
      <div class="links">
        <div class="logo">
          <img alt="Vue logo" src="@/assets/logo.png" width="100px" />
        </div>
        <div class="link">
          <router-link :to="{ name: 'createTeam' }">팀만들기</router-link>
        </div>
        <div class="link">
          <router-link :to="{ name: 'getTeam' }">팀구하기</router-link>
        </div>
        <div class="link">
          <router-link :to="{ name: 'myTeam' }">우리팀</router-link>
        </div>
        <div class="link">
          <router-link :to="{ name: 'footballNews' }">축구소식</router-link>
        </div>
        <div class="link">
          <router-link :to="{ name: 'login' }">
            <b-iconstack font-scale="2.5">
              <b-icon
                stacked
                icon="person-circle"
                variant="info"
                scale="0.75"
              ></b-icon>
            </b-iconstack>
          </router-link>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {};
</script>

<style>
nav {
  background-color: white;
  padding: 30px;
}

.logo-links {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  margin-right: 10px;
}

.links {
  display: flex;
  justify-content: center;
  gap: 60px;
}

.link {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

.link.router-link-exact-active {
  color: #42b983;
}

.link:hover {
  color: #42b983;
}
</style>
