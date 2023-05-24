<template>
  <div class="gatherList">
    <div class="row">
      <div style="margin-bottom: 30px">
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
    <div
      class="match-list"
      v-for="(gather, i) in gatherList"
      :key="i"
      @click="openModal(gather)"
    >
      <div class="box">
        <div class="match-info">
          <div class="game-date">
            {{ formatDate(gather.gather_date) }}
          </div>
          <div class="stadium_name">{{ gather.stadium_name }}</div>
          <div class="cnt">인원 : ( {{ gather.player_cnt }} / 11 )</div>
          <div class="gather_announcement">
            {{ gather.gather_announcement }}
          </div>
        </div>
        <div class="logoPic" style="margin-top: 20px">
          <img
            :src="require(`@/assets/${gather.team_logo}`)"
            alt=""
            class="teamLogo"
          />
          <span
            style="
              font-size: 30px;
              color: gray;
              font-weight: bold;
              padding-left: 20px;
              padding-right: 20px;
            "
            >vs</span
          >
          <img :src="require(`@/assets/what.png`)" alt="" class="teamLogo" />
        </div>
        <div class="gobutton" style="width: 150px">
          <p style="margin-top: 9px; font-size: 13px; cursor: pointer">
            경기 참여
          </p>
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
    formatDate(date) {
      if (!date) return ""; // date가 없을 경우 빈 문자열 반환

      const options = {
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      const formattedDate = new Date(date).toLocaleString("en-US", options);
      const [datePart, timePart] = formattedDate.split(", ");

      return `${datePart}\n${timePart}`;
    },
    openModal(gather) {
      console.log("박스 클릭했어요 제발");
      this.$emit("box-clicked", gather.gather_id);
    },
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
    this.setTime(today); // 초기값으로 오늘 날짜 설정
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
.gather_announcement {
  margin-top: 3px;
}
.game-date {
  font-size: 25px;
}
.stadium_name {
  font-size: 17px;
  color: gray;
  margin-top: 3px;
}
.cnt {
  font-size: 16px;
  color: gray;
  margin-top: 3px;
}
.gatherList {
  font-family: "NanumBarunGothic";
}
.box {
  flex-direction: row;
  display: flex; /* 추가: 내부 요소를 좌우로 정렬하기 위해 flex 컨테이너로 설정 */
  position: relative;
  border-radius: 3px;
  overflow: hidden;
  background-color: #fff;
  transition: transform 0.2s; /* 추가: 호버 효과를 위한 transition 설정 */
  border: 1px solid #e5e5e5;
  padding: 40px 44px 40px 40px;
  margin-left: 130px;
  margin-right: 130px;
  margin-bottom: 20px;
}

.gobutton {
  border: 1px solid white;
  background-color: #102137;
  color: white;
  width: 150px !important;
  height: 40px;
  border-radius: 10px;
  vertical-align: middle;
  text-align: center;
  flex: 0.6;
  margin-top: 37px;
}

.match-info {
  flex: 2;
}

.logoPic {
  flex: 2;
}
.row {
  justify-content: center;
}

.teamLogo {
  width: 70px;
  object-fit: cover;
}
</style>
