<template>
  <div class="chat-container">
    <div class="chat-history">
      <p style="margin-left: 5px">실시간 채팅</p>
      <hr />
      <div v-for="(item, idx) in recvList" :key="idx" class="message">
        <div class="img-box2">
          <img
            :src="require(`@/assets/${item.user_pic}`)"
            alt=""
            class="teamLogo"
          />
        </div>
        <div class="user-name1">{{ item.userName }}</div>
        <div class="message-content">{{ item.content }}</div>
      </div>
    </div>

    <div class="message-input">
      <input
        v-model="message"
        type="text"
        @keyup.enter="sendMessage"
        placeholder="메시지를 입력하세요"
      />
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
    console.log(this.userName);
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
          user_pic: this.user_pic,
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
            console.log(this.recvList);
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
.chat-container {
  display: flex;
  flex-direction: column;
  height: 480px;
  margin: 0 auto;
  box-sizing: border-box;
  border-radius: 5px;
  font-family: "NanumBarunGothic";
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.img-box {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  overflow: hidden;
}
.img-box2 {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  overflow: hidden;
}

.teamLogo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-name {
  margin-left: 10px;
  font-weight: bold;
}
.user-name1 {
  margin-left: 10px;
  color: gray;
  margin-top: 2px;
  font-size: 14px;
}

.chat-history {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  background-color: #ffffff;
  border: 1px solid #eaeaea;
  border-radius: 5px;

  width: 323px;
  margin-left: 20px;
}

.message {
  margin-bottom: 10px;
  border-radius: 5px;
  display: flex;
}

.message-content {
  margin-top: 1px;
  font-size: 14px;
  margin-left: 20px;
  font-weight: bold;
}

.message-input {
  display: flex;
  align-items: center;
  margin-left: 20px;
}

.message-input input {
  flex: 1;
  padding: 10px;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  background-color: #ffffff;
}
</style>
