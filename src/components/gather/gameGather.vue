<template>
  <div class="gameGather-wrapper">
    <div class="gameGather">
      <h3 class="signn" style="margin-bottom: 20px">경기 모집</h3>
      <label for="gather_date"></label>
      <input
        type="datetime-local"
        id="gather_date"
        v-model="gather_date"
        required
      />
      <span v-if="gather_date === ''" class="error-message"
        >경기일자를 선택해주세요</span
      >

      <label for="stadium"></label>
      <select id="stadium" v-model="selectedStadium" required>
        <option disabled value="">경기장을 선택해주세요</option>
        <option
          v-for="stadium in stadiums"
          :key="stadium.seq"
          :value="stadium.seq"
        >
          {{ stadium.stadium_name }}
        </option>
      </select>

      <div v-if="selectedStadium" class="selectedStadium">
        <p>대관비 : {{ selectedStadiumInfo.stadium_price }}</p>
        <p>구장 위치 : {{ selectedStadiumInfo.stadium_address }}</p>
        <KakaoMap class="kmap" :options="mapOption"></KakaoMap>
      </div>

      <label for="gather_announcement"></label>
      <textarea
        id="gather_announcement"
        v-model="gather_announcement"
        placeholder="모집 공고"
        style="width: 400px; height: 100px"
        required
      ></textarea>
      <span v-if="gather_announcement === ''">모집공고를 입력해주세요</span>

      <button
        @click="requestPayment"
        class="gameGather-button"
        style="margin-top: 15px"
      >
        결제 및 등록하기
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";
import KakaoMap from "@/components/map/KakaoMap.vue";
import { Bootpay } from "@bootpay/client-js";
export default {
  name: "gameGather",
  components: {
    KakaoMap,
  },
  data() {
    return {
      gather_date: "",
      selectedStadium: "",
      gather_announcement: "",
      stadiums: [
        {
          seq: 1,
          stadium_name: "방배배수지체육공원",
          stadium_address: "서울특별시 서초구 방배3동 남부순환로296길",
          stadium_img: "bbstadium.png",
          stadium_price: "100,000원",
          lat: 37.472513,
          lng: 126.992405,
        },
        {
          seq: 2,
          stadium_name: "노량진 축구장",
          stadium_address: "서울특별시 동작구 노량진동 노들로 688",
          stadium_img: "nrjstadium.png",
          stadium_price: "100,000원",
          lat: 37.515313,
          lng: 126.941091,
        },
        {
          seq: 3,
          stadium_name: "스카이돔 축구장",
          stadium_address: "서울특별시 구로구 고척제1동 279-4",
          stadium_img: "skystadium.png",
          stadium_price: "100,000원",
          lat: 37.496475,
          lng: 126.867208,
        },
        {
          seq: 4,
          stadium_name: "탄천축구장",
          stadium_address: "서울특별시 송파구 삼학사로2길 49",
          stadium_img: "tcstadium.png",
          stadium_price: "100,000원",
          lat: 37.49652,
          lng: 127.100316,
        },
        {
          seq: 5,
          stadium_name: "서울월드컵 보조경기장",
          stadium_address: "서울특별시 마포구 성산동 499",
          stadium_img: "wcstadium.png",
          stadium_price: "100,000원",
          lat: 37.5715,
          lng: 126.898204,
        },
      ],
      selectedStadiumInfo: {},
      mapOption: {
        center: {
          lat: 37.501477,
          lng: 127.03966,
        },
        level: 3,
      },
    };
  },
  methods: {
    async requestPayment() {
      try {
        const response = await Bootpay.requestPayment({
          // 결제 요청 옵션들
          application_id: "6466bf8b3049c8001c9687c7",
          price: 100,
          order_name: "Kitty-Football-Club",
          order_id: "TEST_ORDER_ID",
          pg: "이니시스",
          method: "카드",
          user: {
            id: "회원아이디",
            username: "회원이름",
            phone: "01000000000",
            email: "test@test.com",
          },
          extra: {
            open_type: "iframe",
            card_quota: "0,2,3",
            escrow: false,
          },
        });
        console.log(response); // 결제 요청 결과를 출력하거나 처리합니다.
        this.gameGather();
        alert("결제 완료 및 등록 되었습니다.");
      } catch (error) {
        console.error(error); // 오류 처리를 합니다.
      }
    },
    gameGather() {
      console.log(this.selectedStadium);
      console.log(this.gather_date);
      console.log(typeof this.gather_date);

      console.log(this.gather_announcement);
      if (this.gather_date === "" || this.gather_announcement === "") {
        alert("모든 항목을 입력해주세요.");
        return;
      }

      // 공고 올리기
      const API_URL = "http://localhost:9999/gather/make";

      const jsessionIdCookie = document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith("JSESSIONID="));
      let jsessionId = "";
      if (jsessionIdCookie) {
        jsessionId = jsessionIdCookie.split("=")[1];
      }
      axios({
        headers: {
          //"Content-Type": "application/x-www-form-urlencoded",

          Cookie: `JSESSIONID=${jsessionId}`,
        },
        url: API_URL,
        method: "POST",
        withCredentials: true,

        data: {
          gather_date: this.gather_date,
          stadium_id: this.selectedStadium,
          gather_announcement: this.gather_announcement,
        },
      })
        .then((res) => {
          if (res.data) {
            router.push({ name: "home" });
          } else {
            alert("팀 공고 만들기에 실패하였습니다.");
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            // 401 Unauthorized 에러 처리

            alert("로그인이 필요한 서비스입니다.");

            router.push({ name: "login" });
          } else {
            // 다른 에러 처리
            console.error(error);
          }
        });
    },
  },
  watch: {
    selectedStadium(value) {
      // 경기장 선택이 변경될 때마다 실행되는 함수
      if (value) {
        this.selectedStadiumInfo = this.stadiums.find(
          (stadium) => stadium.seq === value
        );
        this.mapOption.center = {
          lat: this.selectedStadiumInfo.lat,
          lng: this.selectedStadiumInfo.lng,
        };
      } else {
        this.selectedStadiumInfo = {};
        this.mapOption.center = {
          lat: 37.501477,
          lng: 127.03966,
        };
      }
    },
  },
};
</script>

<style scoped>
.gameGather-wrapper {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  height: 100vh;
  font-family: "NanumBarunGothic";
}

.gameGather {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  margin-top: 50px; /* 적절한 값으로 조정 */
}

.selectedStadium {
  width: 400px;
}
.gameGather label {
  margin-bottom: 5px;
}
.error-message {
  font-size: 11px;
}
.gameGather input {
  padding: 10px 20px;
  width: 400px;
  height: 50px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.gameGather select {
  padding: 10px 20px;
  width: 400px;
  height: 50px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
}

#gather_announcement {
  width: 400px;
  height: 130px;
  resize: none;
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-top: 2px;
  font-size: 13px;
  font-family: "NanumBarunGothic";
}
.gameGather-button {
  padding: 10px 20px;
  background-color: #102137;
  width: 400px;
  color: #f5f6ff;
  height: 62px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 15px;
  font-family: "NanumBarunGothic";
  transition: background-color 0.3s;
}

.gameGather-button:hover {
  background-color: #ddd;
  color: black;
  border-color: #ddd;
  border: 1px solid #ddd;
}

.gameGather span {
  color: red;
  width: 250px;
  font-size: 13px;
  margin-right: 140px;
}

.image-preview {
  text-align: center;
  max-width: 200px;
  max-height: 200px;
  margin-top: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
}
.kmap {
  width: 400px;
  height: 300px;
  border-radius: 20px;
}

.mapInfo {
  border-radius: 20px;
  background-color: lightgray;
}
.stadiumImg {
  width: 100px;
  height: 100px;
}
</style>
