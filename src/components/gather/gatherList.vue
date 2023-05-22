<template>
  <div class="gatherList">
    <h2>모집일정</h2>
    <div class="row">
      <div class="col-md-12">
        <span class="h3" @click="changedateM">
          <b-icon icon="chevron-double-left"></b-icon>
        </span>
        <span class="selectday h3">{{ selectDay }}</span>
        <span class="h3" @click="changedateP">
          <b-icon icon="chevron-double-right"></b-icon>
        </span>
        <div></div>
        <date-picker
          class="mt-3"
          v-model="selectDay"
          valueType="format"
        ></date-picker>
      </div>
    </div>
    <div class="match-list">
      <div class="box" v-for="gather in gatherList" :key="gather.gatherNo">
        <div class="match-info">
          <div class="team-name">경기장 위치 :{{ gather.stadium_name }}</div>
          <div class="team-name">경기일:{{ gather.gather_date }}</div>
          <div class="team-name">현재 인원 :{{ gather.player_cnt }}</div>
          <div class="vsmatchtime">{{ gather.gather_announcement }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import axios from "axios";

export default {
  name: "gatherList",
  components: { DatePicker },
  data() {
    return {
      selectDay: "",
      gatherList: [],
      year: "",
      month: "",
      date: "",
    };
  },
  computed: {},
  methods: {
    changedateM() {
      let d = new Date(this.selectDay);
      d.setDate(d.getDate() - 1);
      this.selectDay = d;
      this.setTime(d);
    },
    changedateP() {
      let d = new Date(this.selectDay);
      d.setDate(d.getDate() + 1);
      this.selectDay = d;
      this.setTime(d);
    },
    fetchGatherList() {
      const REST_API = "http://localhost:9999";
      const API_URL = `${REST_API}/gather/gatherList`;
      const jsessionIdCookie = document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith("JSESSIONID="));
      let jsessionId = "";
      if (jsessionIdCookie) {
        jsessionId = jsessionIdCookie.split("=")[1];
      }

      axios({
        headers: {
          Cookie: `JSESSIONID=${jsessionId}`,
        },
        url: API_URL,
        method: "GET",
        withCredentials: true,
        params: {
          year: this.year,
          month: this.month,
          date: this.date,
        },
      }).then((res) => {
        this.gatherList = res.data;
      });
    },

    setTime(today) {
      this.year = today.getFullYear(); // 년도
      if (today.getMonth() + 1 < 10) {
        this.month = "0" + (today.getMonth() + 1);
      } else {
        this.month = today.getMonth() + 1;
      }

      if (today.getDate() < 10) {
        this.date = "0" + today.getDate();
      } else {
        this.date = today.getDate();
      }
      this.day = today.getDay();
      this.selectDay = this.year + "-" + this.month + "-" + this.date;
    },
  },
  created() {
    let today = new Date();
    this.selectDay = this.setTime(today);
    this.fetchGatherList();
  },
  watch: {
    selectDay: {
      handler() {
        this.fetchGatherList();
      },
    },
  },
};
</script>

<style scoped>
.box {
  display: flex; /* 추가: 내부 요소를 좌우로 정렬하기 위해 flex 컨테이너로 설정 */
  position: relative;
  width: 240px; /* 한 줄에 3개의 box를 표시하도록 조정 */
  height: 120px; /* 높이도 원하는 크기로 조정 가능 */
  margin: 10px;
  padding: 20px;
  border-radius: 10px;
  overflow: hidden;
  background-color: #f4f4f4;
  transition: transform 0.2s; /* 추가: 호버 효과를 위한 transition 설정 */
  border-color: #dbdbdb;
}
</style>
