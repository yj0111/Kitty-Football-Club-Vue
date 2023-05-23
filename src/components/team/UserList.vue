<template>
  <div class="UserList">
    <div
      class="user"
      v-for="(user, i) in users"
      :key="i"
      @click="openModal(user)"
    >
      <div class="box">
        <div class="pic">
          <img
            :src="require(`@/assets/${user.user_pic}`)"
            alt="프로필사진"
            class="userpic"
            id="pic"
          />
        </div>
        <div class="userInfo">
          <div class="userName">{{ user.user_name }}</div>
          <div class="userBirth">{{ formatDate(user.user_birth) }}</div>
          <div class="userAddress">{{ user.user_address }}</div>
          <div class="userEmail">{{ user.user_email }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "UserList",
  props: ["teamId"], // teamId 값을 props로 받음
  data() {
    return {
      users: [],
    };
  },

  created() {
    this.fetchUsers();
  },

  methods: {
    fetchUsers() {
      const REST_API = "http://localhost:9999";
      const API_URL = `${REST_API}/teamManage/list/${this.teamId}`;

      axios
        .get(API_URL)
        .then((response) => {
          this.users = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    formatDate(date) {
      return date.split(" ")[0];
    },
    openModal(user) {
      this.$emit("box-clicked", user);
    },
  },
};
</script>

<style scoped>
.userpic {
  width: 200px;
  height: 100%;
  object-fit: cover;
}

.UserList {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding-left: 30px;
  font-family: "NanumBarunGothic";
}

.user {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  cursor: pointer;
}

.box {
  display: flex;
  flex-direction: column;
  width: 240px;
  height: 300px;
  margin: 10px;
  padding: 20px;
  border-radius: 10px;
  overflow: hidden;
  background-color: lightsteelblue;
  transition: transform 0.2s;
}

.box:hover {
  transform: scale(1.05);
}

.pic {
  width: 100%;
  height: 150px;
  margin-bottom: 10px;
  border-radius: 10px;
}

.userInfo {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-top: 14px;
}

.userName {
  font-size: 18px;
  font-weight: bold;
  color: #282828;
  text-align: left;
  margin-left: 0;
  width: 100px;
}

.userBirth {
  font-size: 13px;
  color: #757575;
  width: 100px;
  text-align: left;
  margin-left: 0;
}

.userAddress {
  font-size: 13px;
  color: #8e8e8e;
  width: 100px;
  text-align: left;
  margin-left: 0;
}
.userEmail {
  font-size: 13px;
  color: #8e8e8e;
  width: 100px;
  margin-left: 0;
  text-align: left;
}
</style>
