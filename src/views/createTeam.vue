<template>
  <div class="createTeam-wrapper">
    <div class="createTeam-form">
      <h3 class="signn" style="margin-bottom: 20px">팀 만들기</h3>
      <form @submit.prevent="submitForm" class="createTeam">
        <div style="text-align: center; padding-bottom: -30px">
          <span
            v-if="!imagePreview"
            class="profilePicture"
            style="
              text-align: left;
              margin-left: -105px;
              font-size: 13px;
              color: gray;
            "
            >팀 로고를 등록해주세요.</span
          >
          <img v-if="imagePreview" :src="imagePreview" class="image-preview" />
          <input
            type="file"
            id="file_input"
            ref="fileInput"
            @change="previewImage"
            style="font-size: 13px; margin-top: 15px"
          />
        </div>
        <label for="team_name"></label>
        <input
          type="text"
          id="team_name"
          v-model="team_name"
          placeholder="팀 이름을 입력해주세요 !"
          style="font-size: 13px"
        />
        <span v-if="team_name === ''" class="error-message"
          >팀 이름을 입력해주세요</span
        >

        <label for="team_content"></label>
        <textarea
          id="team_content"
          v-model="team_content"
          placeholder="우리는 어떤 팀인지 소개해주세요 !"
          style="width: 400px; height: 130px; resize: none"
        ></textarea>
        <span v-if="team_content === ''" class="error-message"
          >팀 소개말을 작성해주세요</span
        >

        <label for="team_announcement"></label>
        <textarea
          id="team_announcement"
          v-model="team_announcement"
          placeholder="이런 팀원을 원해요 !"
          style="width: 400px; height: 130px; margin-top: 5px"
        ></textarea>
        <span v-if="team_announcement === ''" class="error-message"
          >팀 공고를 입력해주세요</span
        >

        <button
          @click="createTeam"
          class="createTeam-button"
          style="margin-top: 15px"
        >
          팀 생성하기
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";
import swal from "sweetalert2";
export default {
  name: "createTeam",
  data() {
    return {
      team_name: "",
      team_content: "",
      team_announcement: "",
      imagePreview: null,
    };
  },

  methods: {
    previewImage(event) {
      const file = event.target.files[0];
      this.imagePreview = URL.createObjectURL(file);
    },
    createTeam(event) {
      if (
        this.team_name === "" ||
        this.team_content === "" ||
        this.team_announcement === ""
      ) {
        swal.fire({
          icon: "info",
          title: "모든 항목을 입력해주세요",
        });
        return;
      }
      event.preventDefault();

      const file = this.$refs.fileInput.files[0];
      const formData = new FormData();

      formData.append("team_name", this.team_name);
      formData.append("team_content", this.team_content);
      formData.append("team_announcement", this.team_announcement);

      // 파일 추가
      formData.append("file", file);
      //유효성 검사 후 통과되면 팀 생성 진행
      let Team = {
        team_name: this.team_name,
        team_content: this.team_content,
        team_announcement: this.team_announcement,
      };
      console.log(Team);

      //팀 만들기
      const REST_API = "http://localhost:9999";
      const API_URL = `${REST_API}/team/create`;

      const jsessionIdCookie = document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith("JSESSIONID="));
      let jsessionId = "";
      if (jsessionIdCookie) {
        jsessionId = jsessionIdCookie.split("=")[1];
        console.log(jsessionId);
      }
      axios({
        headers: {
          Cookie: `JSESSIONID=${jsessionId}`,
          "Content-Type": "multipart/form-data",
        },
        url: API_URL,
        method: "POST",
        data: formData,
        withCredentials: true,
      })
        .then((res) => {
          if (res.data) {
            swal.fire({
              icon: "success",
              title: "팀 생성 완료!",
            });
            router.push({ name: "getTeam" });
          } else {
            swal.fire({
              icon: "error",
              title: "팀 생성 실패!",
            });
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
};
</script>

<style scoped>
.createTeam-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1000px;
  background: url(@/assets/insertback.png) 50% 50% / cover no-repeat;
  width: 100%;
  margin: 0 auto;
}
.createTeam-form {
  /* padding-left: 100px;
  padding-right: 100px;
  padding-top: 100px; */
  padding: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* margin-top: 20px; 적절한 값으로 조정 */
  background-color: hsla(0, 0%, 100%, 0.9);
  backdrop-filter: blur(3px);
}

.createTeam-form input,
.signn,
.createTeam .error-message,
.profilePicture {
  font-family: "NanumBarunGothic";
}

.createTeam-form textarea {
  width: 400px;
  height: 130px;
  resize: none;
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-top: 2px;
  font-size: 13px;
  font-family: "NanumBarunGothic";
}

.createTeam {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
}

.createTeam label {
  margin-bottom: 5px;
}

.createTeam input {
  padding: 10px 20px;
  width: 400px;
  height: 50px;
  margin-bottom: 5px;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.createTeam-button {
  padding: 10px 20px;
  background-color: #034f36;
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

.createTeam-button:hover {
  background-color: #ddd;
  color: black;
  border-color: #ddd;
  border: 1px solid #ddd;
}

.createTeam span {
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
  object-fit: cover;
}
</style>
