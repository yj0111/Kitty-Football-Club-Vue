<template>
  <div id="app">
    <div>
      <div class="imgBox">
        <img :src="require(`@/assets/${user_pic}`)" alt="" class="teamLogo" />
      </div>
      {{ userName }}

      <!-- <input v-model="userName" type="text" /> -->
      : <input v-model="message" type="text" @keyup="sendMessage" />
      <div v-for="(item, idx) in recvList" :key="idx">
        <h3>{{ item.userName }}</h3>
        <h4>{{ item.content }}</h4>
      </div>
    </div>
  </div>
</template>

<script>
import Stomp from "webstomp-client";
import SockJS from "sockjs-client";
import { mapState } from "vuex";
export default {
  name: "LiveChatting",
  data() {
    return {
      message: "",
      recvList: [],
    };
  },
  computed: {
    ...mapState(["loginData"]),
    user_pic() {
      return this.loginData.user_pic;
    },
    userName() {
      return this.loginData.user_name;
    },
  },
  mounted() {
    const storedLoginData = localStorage.getItem("loginData");
    console.log(storedLoginData);
    if (storedLoginData) {
      const loginData = JSON.parse(storedLoginData);

      this.$store.commit("LOGIN_DATA", loginData);
      console.log(this.userName);
    }
  },
  created() {
    // App.vue가 생성되면 소켓 연결을 시도합니다.
    this.connect();
  },
  methods: {
    sendMessage(e) {
      if (e.keyCode === 13 && this.userName !== "" && this.message !== "") {
        this.send();
        this.message = "";
      }
    },
    send() {
      console.log("Send message:" + this.message);
      if (this.stompClient && this.stompClient.connected) {
        const msg = {
          userName: this.userName,
          content: this.message,
        };
        this.stompClient.send("/receive", JSON.stringify(msg), {});
      }
    },
    connect() {
      const serverURL = "http://localhost:9999";
      let socket = new SockJS(serverURL);
      this.stompClient = Stomp.over(socket);
      console.log(`소켓 연결을 시도합니다. 서버 주소: ${serverURL}`);
      this.stompClient.connect(
        {},
        (frame) => {
          // 소켓 연결 성공
          this.connected = true;
          console.log("소켓 연결 성공", frame);
          // 서버의 메시지 전송 endpoint를 구독합니다.
          // 이런형태를 pub sub 구조라고 합니다.
          this.stompClient.subscribe("/send", (res) => {
            console.log("구독으로 받은 메시지 입니다.", res.body);

            // 받은 데이터를 json으로 파싱하고 리스트에 넣어줍니다.
            this.recvList.push(JSON.parse(res.body));
          });
        },
        (error) => {
          // 소켓 연결 실패
          console.log("소켓 연결 실패", error);
          this.connected = false;
        }
      );
    },
  },
};
</script>
<style scoped>
.imgBox {
  width: 45px;
  height: 45px;
  border-radius: 70%;
  overflow: hidden;
}
.teamLogo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
