<template>
  <div class="container">
    <div class="gameGather">
      <h4 class="team_list_h4">경기 공고 등록</h4>
      <label for="gather_date">경기 일시</label>
      <input
        type="datetime-local"
        id="gather_date"
        v-model="gather_date"
        required
      />

      <label for="stadium">경기장 선택</label>
      <select id="stadium" v-model="selectedStadium" required>
        <option
          v-for="stadium in stadiums"
          :key="stadium.seq"
          :value="stadium.seq"
        >
          {{ stadium.stadium_name }}
        </option>
      </select>

      <div v-if="selectedStadium">
        <p>이미지: {{ selectedStadiumInfo.stadium_img }}</p>
        <p>가격: {{ selectedStadiumInfo.stadium_price }}</p>
        <p>위치</p>
        <div class="mapInfo">
          <KakaoMap class="kmap" :options="mapOption"></KakaoMap>
          <p style="height: 30px">
            {{ selectedStadiumInfo.stadium_address }}
          </p>
        </div>
      </div>

      <label for="gather_announcement">공고를 입력하세요:</label>
      <textarea
        id="gather_announcement"
        v-model="gather_announcement"
        placeholder="모집공고를 입력하세요."
        style="width: 400px; height: 100px"
        required
      ></textarea>
      <span v-if="gather_announcement === ''">모집공고를 입력해주세요</span>

      <button @click="gameGather" class="gameGather-button">등록하기</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";
import KakaoMap from "@/components/map/KakaoMap.vue";

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
          stadium_address: "경기장 1번 주소",
          stadium_img: "경기장 1번 이미지 URL",
          stadium_price: "1번 경기장 가격",
          lat: 37.472513,
          lng: 126.992405,
        },
        {
          seq: 2,
          stadium_name: "노량진 축구장",
          stadium_address: "경기장 2번 주소",
          stadium_img: "경기장 2번 이미지 URL",
          stadium_price: "2번 경기장 가격",
          lat: 37.515313,
          lng: 126.941091,
        },
        {
          seq: 3,
          stadium_name: "스카이돔 축구장",
          stadium_address: "경기장 3번 주소",
          stadium_img: "경기장 3번 이미지 URL",
          stadium_price: "3번 경기장 가격",
          lat: 37.496475,
          lng: 126.867208,
        },
        {
          seq: 4,
          stadium_name: "탄천축구장",
          stadium_address: "경기장 4번 주소",
          stadium_img: "경기장 4번 이미지 URL",
          stadium_price: "4번 경기장 가격",
          lat: 37.49652,
          lng: 127.100316,
        },
        {
          seq: 5,
          stadium_name: "서울월드컵 보조경기장",
          stadium_address: "경기장 5번 주소",
          stadium_img: "경기장 5번 이미지 URL",
          stadium_price: "5번 경기장 가격",
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
.team_list_h4 {
  text-align: center;
  padding-top: 30px;
  padding-bottom: 30px;
  font-weight: bolder;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.gameGather {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
}

.gameGather label {
  margin-bottom: 5px;
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

.gameGather-button {
  padding: 10px 20px;
  background-color: #cdfe61;
  width: 100%;
  color: black;
  height: 50px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.gameGather-button:hover {
  background-color: gray;
  color: black;
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
  width: 500px;
  height: 300px;
  border-radius: 20px;
}

.mapInfo {
  border-radius: 20px;
  background-color: lightgray;
}
</style>
