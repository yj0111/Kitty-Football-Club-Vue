<!-- #안되는 코드입니다. -->

<template>
  <div>
    <input type="file" @change="handleFileUpload" />
    <button @click="uploadImage">이미지 업로드</button>
    <br />
    <img :src="previewImageUrl" alt="미리보기 이미지" v-if="previewImageUrl" />
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      selectedFile: null,
      previewImageUrl: null,
      imageUrl: null,
    };
  },
  methods: {
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
      this.previewImage();
    },
    previewImage() {
      const reader = new FileReader();
      reader.onload = (event) => {
        this.previewImageUrl = event.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    },
    uploadImage() {
      const formData = new FormData();
      formData.append("image", this.selectedFile);

      axios
        .post("http://localhost:9999/upload", formData)
        .then((response) => {
          this.imageUrl = response.data.imageUrl;
          this.previewImageUrl = null; // 업로드 후 미리보기 이미지 초기화
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
