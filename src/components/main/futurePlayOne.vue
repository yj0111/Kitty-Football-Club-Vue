<template>
  <div class="OneContainer">
    <div style="font-size: 18px; font-weight: 700; color: white">
      다음 경기 일정
    </div>
    <div class="date">{{ play.game_date }}</div>
    <div class="playCon">
      <div class="teamName">{{ play.team1_name }}</div>
      <div class="topbox">
        <div class="topimgBox">
          <img
            :src="require(`@/assets/${play.team1_logo}`)"
            alt=""
            class="teamLogo"
          />
        </div>
      </div>
      <div class="VS">VS</div>
      <div class="topbox">
        <div class="topimgBox">
          <img
            :src="require(`@/assets/${play.team2_logo}`)"
            alt=""
            class="teamLogo"
          />
        </div>
      </div>
      <div class="teamName">{{ play.team2_name }}</div>
    </div>
    <div class="stadium">
      <span class="icons"></span>
      <span>{{ play.stadium_name }}</span>
    </div>
    <div class="count_down_day">
      <div class="count_box">
        <span class="count_label">일</span>
        <span class="count_num">{{ days }}</span>
      </div>
      <span class="count_span">:</span>
      <div class="count_box">
        <span class="count_label">시</span>
        <span class="count_num">{{ hours }}</span>
      </div>
      <span class="count_span">:</span>
      <div class="count_box">
        <span class="count_label">분</span>
        <span class="count_num">{{ minutes }}</span>
      </div>
      <span class="count_span">:</span>
      <div class="count_box">
        <span class="count_label">초</span>
        <span class="count_num">{{ seconds }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "futurePlayOne",
  data() {
    return {
      play: {},
      countdown: "", // 카운트 다운 표시를 위한 변수
      days: "",
      hours: "",
      minutes: "",
      seconds: "",
    };
  },
  created() {
    const REST_API = "http://localhost:9999";
    const API_URL = `${REST_API}/main/recordOne`;
    axios({
      url: API_URL,
      method: "GET",
    })
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          this.play = res.data;

          // 카운트 다운 시작
          this.startCountdown();
        } else {
          //alert("메인의 다음 경기 일정 데이터가 없다");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    startCountdown() {
      const gameDate = this.play.game_date; // 날짜를 그대로 가져옵니다.
      const [day, month, year, hour, minute] = gameDate.split(/[.: ]/); // 날짜를 구성 요소로 분할합니다.

      // 구성 요소를 기반으로 Date 객체를 생성합니다.
      const dateObj = new Date(
        parseInt(`20${year}`, 10) - 1,
        parseInt(month, 10) - 1,
        parseInt(day, 10) + 2,
        parseInt(hour, 10),
        parseInt(minute, 10)
      );

      // 1초마다 카운트 다운을 업데이트합니다.
      const interval = setInterval(() => {
        const now = new Date().getTime(); // 현재 시간을 밀리초로 가져옵니다.
        const oneDayAgo = now - 24 * 60 * 60 * 1000;
        const distance = dateObj - oneDayAgo; // 경기 일시와 현재 시간의 차이를 계산합니다.

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        this.countdown = `${days}일 ${hours}시간 ${minutes}분 ${seconds}초`;
        this.days = `${days}`;
        this.hours = `${hours}`;
        this.minutes = `${minutes}`;
        this.seconds = `${seconds}`;
        // 경기 시작 시간이 지나면 카운트 다운을 종료합니다.
        if (distance < 0) {
          clearInterval(interval);
          this.countdown = "경기 시작";
        }
      }, 1000); // 1초마다 갱신
    },
  },
};
</script>

<style scoped>
.count_box {
  width: 70px;
  height: 67px;
  border-style: 3px solid white;
  position: relative;
  width: 70px;
  height: 67px;
  font-size: 45px;
  font-weight: 700;
  background-color: #181818;
  color: white;
  border-radius: 6px;
  text-align: center;
}
.count_down_day {
  justify-content: center;
  display: flex;
  padding-top: 68px;
}
.count_span {
  font-size: 40px;
  line-height: 60px;
  margin: 6px;
  opacity: 2;
  color: white;
}
.count_num {
  position: relative;
  width: 70px;
  height: 67px;
  padding-top: 0.2em;
  font-size: 45px;
  font-weight: 700;
  background-color: #181818;
  color: white;
  border-radius: 6px;
}
.count_label {
  position: absolute;
  bottom: 100%;
  right: 0;
  font-size: 12px;
  font-weight: 400;
}
.countdown {
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  color: white;
  margin-top: 20px;
}
.OneContainer {
  font-family: "NanumBarunGothic";
  margin: 0 auto;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  width: 468px;
  height: 568px;
  padding: 44px 32px;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(16.5px);
  letter-spacing: 1px;
  font-weight: 500;
}
.playCon {
  display: flex;
}
.date {
  margin-top: 32px;
  margin-bottom: 15px;
  text-align: center;
  font-size: 13px;
  font-weight: 700;
  color: hsla(0, 0%, 100%, 0.5);
}
.stadium {
  margin-top: 40px;
  margin-bottom: 40px;
  text-align: center;
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  opacity: 0.5;
}
.icons {
  content: "";
  display: inline-block;
  /* position: relative;
  top: -2px; */
  width: 15px;
  height: 18px;
  margin-right: 8px;
  vertical-align: middle;
  background: url(@/assets/mainposition.png) 50% 50% / contain no-repeat;
}
.playCon {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: hsla(0, 0%, 100%, 0.5);
  height: 100px;
  /* padding-top: 20px;
  padding-bottom: 20px; */
}
.teamName {
  flex: 1.3;
  font-size: 15px;
  color: white;
}
.teamLogo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.topimgBox {
  width: 70px;
  height: 70px;
  overflow: hidden;
}
.topbox {
  justify-content: center;
  display: flex;
  flex: 1;
}
.VS {
  flex: 2;
  font-size: 22px;
}
</style>
