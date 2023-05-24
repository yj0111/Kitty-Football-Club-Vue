<template>
  <div class="gatherDetail">
    <div class="containerGather" @click="openModal(details)">
      <div class="imgBox">
        <img
          :src="require(`@/assets/${details.stadium_img}`)"
          alt=""
          class="stadiumImg"
        />
      </div>
      <div class="contextBox">
        <div class="context1">
          <div class="stadium_name">{{ details.stadium_name }}</div>
          <div class="stadium_address">{{ details.stadium_address }}</div>
        </div>
        <div class="context2">
          <div class="gather_date">경기 날짜 :{{ details.gather_date }}</div>
          <div class="stadium_price">대관비 : 100,000 원</div>
        </div>
      </div>
      <div style="font-size: 17px; font-weight: bold; margin-top: 20px">
        구장시설
      </div>

      <div class="iconContainer">
        <div class="icon">
          <div class="icon-wrap">
            <img
              src="https://pzfutball.com/public_images/facility/size_on.png"
              alt="Futsal Image"
              class="image"
            />
          </div>
          <div>규장 규격</div>
          <div>38 X 16</div>
        </div>
        <div class="icon">
          <div class="icon-wrap">
            <img
              src="https://pzfutball.com/public_images/facility/rental_off.png"
              alt="Futsal Image"
              class="image"
            />
          </div>
          <div>용품 대여</div>
        </div>
        <div class="icon">
          <div class="icon-wrap">
            <img
              src="https://pzfutball.com/public_images/facility/futsal_on.png"
              alt="Futsal Image"
              class="image"
            />
          </div>
          <div>풋살화 대여</div>
          <div>구장 문의</div>
        </div>
        <div class="icon">
          <div class="icon-wrap">
            <img
              src="https://pzfutball.com/public_images/facility/outdoor_on.png"
              alt="Futsal Image"
              class="image"
            />
          </div>
          <div>실외 구장</div>
        </div>
      </div>
      <div class="iconContainer">
        <div class="icon">
          <div class="icon-wrap">
            <img
              src="https://pzfutball.com/public_images/facility/parking_on.png"
              alt="Futsal Image"
              class="image"
            />
          </div>
          <div>주차장</div>
          <div>GS타워 선착순 4대</div>
        </div>
        <div class="icon">
          <div class="icon-wrap">
            <img
              src="https://pzfutball.com/public_images/facility/restroom_on.png"
              alt="Futsal Image"
              class="image"
              style="width: 40px"
            />
          </div>
          <div>화장실</div>
        </div>
        <div class="icon">
          <div class="icon-wrap">
            <img
              src="https://pzfutball.com/public_images/facility/shower_off.png"
              alt="Futsal Image"
              class="image"
              style="width: 35px"
            />
          </div>
          <div>샤워실</div>
        </div>
        <div class="icon">
          <div class="icon-wrap">
            <img
              src="https://pzfutball.com/public_images/facility/store_on.png"
              alt="Futsal Image"
              class="image"
              style="width: 35px"
            />
          </div>
          <div>매점</div>
          <div>마트 내 음료판매</div>
        </div>
      </div>
      <div style="font-size: 17px; font-weight: bold; margin-top: 20px">
        구장위치
      </div>
      <div class="mapInfo">
        <KakaoMap class="kmap" :options="mapOption"></KakaoMap>
      </div>
      <div class="textwrap">
        <div
          style="
            font-size: 17px;
            font-weight: bold;
            margin-top: 20px;
            margin-bottom: 20px;
          "
        >
          이것만은 꼭!
        </div>
        <div class="ggog">■ 축구장 예약시간 준수 (이용시간 15분 전 대기)</div>
        <div class="ggog">■ 시설 사용 후 정리정돈 ( 쓰레기 반드시 처리 )</div>
        <div class="ggog">
          ■ 축구장 내 취사, 흡연 및 음주, 지나친 소음행위 금지 (적발 시 즉시
          퇴장 및 향후 이용불가)
        </div>
        <div class="ggog">
          ■ 고의 및 과실로 인한 시설물 훼손 및 파손시 사용자가 배상함을 원칙으로
          함
        </div>
        <div class="ggog">
          ■ 잔디보호와 부상방지를 위하여 스터드가 있는 축구화(SG, FG, HG, AG)는
          착용이 금지되며 풋살화(TF)만 착용 가능
        </div>
        <div class="ggog">■ 휴식 및 대기는 구장 휴식 공간 이용</div>
        <div class="ggog">
          ■ 위 내용이 지켜지지 않을 경우 환불 없이 퇴장조치 될 수 있으니 예약시
          꼭 참고
        </div>
      </div>
      <div style="text-align: center">
        <button @click="regist" class="insertBtn">참여하기</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import KakaoMap from "@/components/map/KakaoMap.vue";
export default {
  name: "gatherDetail",
  components: {
    KakaoMap,
  },
  props: ["gatherId"],
  data() {
    return {
      details: {},
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
      mapOption: {
        center: {
          lat: 37.501477,
          lng: 127.03966,
        },
        level: 3,
      },
    };
  },
  created() {
    const REST_API = "http://localhost:9999";
    const API_URL = `${REST_API}/gather/gatherList/${this.gatherId}`;
    axios({
      url: API_URL,
      method: "GET",
    })
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          this.details = res.data;
          console.log(this.details);

          // 선택한 경기장 정보 찾기
          const selectedStadium = this.stadiums.find(
            (stadium) => stadium.stadium_name === this.details.stadium_name
          );

          // 경기장 정보가 있을 경우 맵의 중심 좌표 설정
          if (selectedStadium) {
            this.mapOption.center = {
              lat: selectedStadium.lat,
              lng: selectedStadium.lng,
            };
          }
        } else {
          this.details = "정보가 이상하네요!";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  methods: {
    regist() {
      const REST_API = "http://localhost:9999";
      const API_URL = `${REST_API}/player/applyGame/${this.gatherId}`;
      const jsessionIdCookie = document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith("JSESSIONID="));
      let jsessionId = "";
      if (jsessionIdCookie) {
        jsessionId = jsessionIdCookie.split("=")[1];
        console.log(jsessionId);
      }
      if (confirm("정말로 참여 신청하시겠습니까?")) {
        axios({
          headers: {
            Cookie: `JSESSIONID=${jsessionId}`,
          },
          url: API_URL,
          method: "POST",
          withCredentials: true,
        })
          .then((res) => {
            console.log(res.data);
            if (res.data == 1) {
              console.log(res.data);
              alert("등록 완료");
            } else {
              alert("인원이 꽉 찼어요");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    openModal(detail) {
      this.$emit("box-clicked", detail);
    },
  },
};
</script>

<style scoped>
.imgBox {
  width: 100%;
  height: 300px;
  overflow: hidden;
}
.stadiumImg {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.contextBox {
  margin-top: 15px;
  display: flex;
}
.context1 {
  flex: 2;
}
.context2 {
  flex: 1;
}
.stadium_price {
  text-align: right;
  margin-right: 35px;
  font-size: 16px;
  color: #fb404b;
  font-weight: normal;
}
.stadium_name {
  text-indent: 35px;
  font-size: 16px;
  font-weight: 600;
}
.gather_date {
  text-align: right;
  margin-right: 35px;
  font-size: 14px;
  font-weight: lighter;
}
.stadium_address {
  text-indent: 35px;
  font-size: 14px;
  font-weight: lighter;
}
.iconContainer {
  margin-top: 20px;
  display: flex;
  align-items: center;
}
.icon {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;
  text-align: center;

  height: 95px;
  flex: 1;
  font-size: 13px;
  font-weight: bold;
  color: black;
}
.image {
  width: 50px;
  object-fit: cover;
}
.ggog {
  margin-bottom: 8px;
  font-size: 14px;
  text-align: left;
}
.insertBtn {
  margin-top: 15px;
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

.insertBtn:hover {
  background-color: #ddd;
  color: black;
  border-color: #ddd;
  border: 1px solid #ddd;
}
.textwrap {
  text-indent: 30px;
}
.kmap {
  width: 500px;
  height: 300px;
  border-radius: 20px;
}
.mapInfo {
  margin-left: 170px;
  margin-top: 18px;
}
</style>
