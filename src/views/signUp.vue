<template>
  <div>
    <h4 class="team_list_h4">회원가입</h4>
    <div class="container">
      <form @submit.prevent="submitForm" class="signup">
        <label for="id"></label>
        <input
          type="text"
          id="id"
          v-model="user_id"
          placeholder="아이디를 입력해주세요"
        />
        <span v-if="user_id === ''">아이디를 입력해주세요</span>

        <label for="password"></label>
        <input
          type="password"
          id="password"
          v-model="user_password"
          placeholder="비밀번호를 입력해주세요"
        />
        <span v-if="user_password === ''">비밀번호를 입력해주세요</span>

        <label for="passwordConfirm"></label>
        <input
          type="password"
          id="passwordConfirm"
          v-model="passwordConfirm"
          placeholder="비밀번호를 한번 더 입력해주세요"
        />
        <span v-if="user_password !== passwordConfirm"
          >비밀번호가 일치하지 않습니다.</span
        >

        <label for="name"></label>
        <input
          type="text"
          id="name"
          v-model="user_name"
          placeholder="이름을 입력해주세요"
        />
        <span v-if="user_name === ''">이름을 입력해주세요</span>

        <label for="phone"></label>
        <input
          type="text"
          id="phone"
          v-model="user_phone"
          placeholder="휴대폰 번호"
        />
        <span v-if="user_phone === ''">휴대폰 번호를 입력해주세요</span>
        <span v-else-if="!isValidPhone(user_phone)"
          >숫자(11자리)만 입력해주세요</span
        >

        <label for="email"></label>
        <input
          type="text"
          id="email"
          v-model="user_email"
          placeholder="이메일을 입력해주세요"
        />
        <span v-if="user_email === ''">이메일을 입력해주세요</span>
        <span v-else-if="!isValidEmail(user_email)"
          >이메일 형식으로 입력해주세요</span
        >

        <label for="birth"></label>
        <input
          type="text"
          id="birth"
          v-model="user_birth"
          placeholder="생일을 입력해주세요"
        />
        <span v-if="user_birth === ''">숫자(8자리)만 입력해주세요</span>

        <div>
          <input
            type="text"
            v-model="postcode"
            placeholder="우편번호"
            style="width: 310px"
          />
          <span style="padding-left: 25px">
            <input
              type="button"
              @click="execDaumPostcode()"
              value="찾기"
              style="width: 65px"
            /><br />
          </span>
        </div>
        <input
          type="text"
          v-model="user_address"
          id="address"
          placeholder="주소"
        /><br />

        <div style="text-align: center">
          <input type="file" ref="fileInput" @change="previewImage" />
          <img :src="imagePreview" class="image-preview" />
        </div>

        <button @click="signUp" class="signup-button">회원가입</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignupForm",
  data() {
    return {
      user_id: "",
      user_password: "",
      passwordConfirm: "",
      user_name: "",
      user_phone: "",
      user_email: "",
      user_birth: "",
      user_address: "",
      imagePreview: null,
      kakaoId: "",
    };
  },
  created() {
    this.kakaoId = this.$route.query.id;
  },
  methods: {
    previewImage(event) {
      const file = event.target.files[0];
      this.imagePreview = URL.createObjectURL(file);
    },
    isValidPhone(phone) {
      const phoneRegex = /^\d{10,11}$/;
      return phoneRegex.test(phone);
    },
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    execDaumPostcode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          if (this.user_address !== "") {
            this.user_address = "";
          }
          if (data.userSelectedType === "R") {
            // 사용자가 도로명 주소를 선택했을 경우
            this.user_address = data.roadAddress;
          } else {
            // 사용자가 지번 주소를 선택했을 경우(J)
            this.user_address = data.jibunAddress;
          }

          // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
          if (data.userSelectedType === "R") {
            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
              this.user_address += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if (data.buildingName !== "" && data.apartment === "Y") {
              this.user_address +=
                this.user_address !== ""
                  ? `, ${data.buildingName}`
                  : data.buildingName;
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if (this.user_address !== "") {
              this.user_address = `${this.user_address}`;
            }
          } else {
            this.user_address = "";
          }
          // 우편번호를 입력한다.
          this.postcode = data.zonecode;
        },
      }).open();
    },
    signUp(event) {
      if (
        this.user_id === "" ||
        this.user_password === "" ||
        this.passwordConfirm === "" ||
        this.user_name === "" ||
        this.user_phone === "" ||
        this.user_email === "" ||
        this.user_birth === "" ||
        this.user_address === ""
      ) {
        alert("모든 항목을 입력해주세요");
        return;
      }

      if (this.user_password !== this.passwordConfirm) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }

      event.preventDefault();

      const file = this.$refs.fileInput.files[0];
      const formData = new FormData();

      // 사용자 정보 추가
      formData.append("user_id", this.user_id);
      formData.append("user_password", this.user_password);
      formData.append("user_name", this.user_name);
      formData.append("user_phone", this.user_phone);
      formData.append("user_email", this.user_email);
      formData.append("user_birth", this.user_birth);
      formData.append("user_address", this.user_address);
      formData.append("user_kakao_id", this.kakaoId);

      // 파일 추가
      formData.append("file", file);

      //유효성 검사 후 통과되면 회원가입 진행
      let User = {
        user_id: this.user_id,
        user_password: this.user_password,
        user_name: this.user_name,
        user_phone: this.user_phone,
        user_email: this.user_email,
        user_birth: this.user_birth,
        user_address: this.user_address,
      };
      console.log(User);
      this.$store.dispatch("signUp", formData);
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

.signup {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
}

.signup label {
  margin-bottom: 5px;
}

.signup input {
  padding: 10px 20px;
  width: 400px;
  height: 50px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.signup #address {
  width: 100%;
}

.signup-button {
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

.signup-button:hover {
  background-color: gray;
  color: black;
}

.signup span {
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
