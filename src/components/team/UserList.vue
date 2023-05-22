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
            alt="로고입니당"
            class="userpic"
            id="pic"
          />
        </div>
        <div class="userInfo">
          <div class="userName" style="text-align: center">
            {{ user.user_name }}
          </div>
          <div class="userBirth">
            {{ formatDate(user.user_birth) }}
          </div>
          <div class="content">{{ user.user_phone }}</div>
          <div class="content">{{ user.user_address }}</div>
          <div class="content">{{ user.user_email }}</div>
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
  width: 50px;
  height: 80px;
  object-fit: cover;
}

.UserList {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding-left: 30px;
}

.user {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  cursor: pointer;
}

.box {
  display: flex;
  position: relative;
  width: 240px;
  height: 120px;
  margin: 10px;
  padding: 20px;
  border-radius: 10px;
  overflow: hidden;
  background-color: #f4f4f4;
  transition: transform 0.2s;
  border-color: #dbdbdb;
}

.box:hover {
  transform: scale(1.05);
}

.pic {
  width: 80px;
  height: 80px;
}

.userInfo {
  flex-grow: 1;
  display: flex;
  font-size: 14px;
  flex-direction: column;
  justify-content: center;
  padding-left: 10px;
}

.userName {
  font-size: 15px;
  font-weight: bold;
  color: black;
}
</style>
