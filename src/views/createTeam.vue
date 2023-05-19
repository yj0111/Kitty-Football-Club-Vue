<template>
  <div class="container">
    <form @submit.prevent="submitForm" class="createTeam">
      <div style="text-align: center">
        <input type="file" ref="fileInput" @change="previewImage" />
        <img :src="imagePreview" class="image-preview" />
      </div>
      <label for="team_name"></label>
      <input
        type="text"
        id="team_name"
        v-model="team_name"
        placeholder="팀 이름을 입력해주세요"
      />
      <span v-if="team_name === ''">팀 이름을 입력해주세요</span>

      <label for="team_content"></label>
      <textarea
        id="team_content"
        v-model="team_content"
        placeholder="팀 소개를 입력해주세요"
        style="width: 400px; height: 100px"
      ></textarea>
      <span v-if="team_content === ''">팀 소개를 입력해주세요</span>

      <label for="team_announcement"></label>
      <textarea
        id="team_announcement"
        v-model="team_announcement"
        placeholder="팀 공고를 입력해주세요"
        style="width: 400px; height: 100px"
      ></textarea>
      <span v-if="team_announcement === ''">팀 공고를 입력해주세요</span>

      <button @click="createTeam" class="createTeam-button">팀 생성하기</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";
import { mapState } from "vuex";

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
  computed: {
    ...mapState({
      loginData: (state) => state.loginData,
    }),
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
        alert("모든 항목을 입력해주세요");
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

      axios({
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${sessionStorage.getItem("sessionToken")}`,
        },
        url: API_URL,
        method: "POST",
        data: formData,
      })
        .then((res) => {
          if (res.data) {
            router.push({ name: "home" });
          } else {
            alert("팀 만들기에 실패하였습니다.");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
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
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.createTeam-button {
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

.createTeam-button:hover {
  background-color: gray;
  color: black;
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
}
</style>
