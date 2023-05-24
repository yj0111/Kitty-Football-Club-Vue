<template>
  <div class="TeamModal">
    <div class="modal-content">
      <div class="modal-scroll">
        <slot></slot>
      </div>
      <button class="modal-close" @click="closeModal">닫기</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.TeamModal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  overflow: auto;
  font-family: "NanumBarunGothic";
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  width: 900px;
  height: 700px;
  max-height: 700px; /* 추가: 최대 높이를 설정하여 내용이 넘칠 경우 스크롤 표시 */
  overflow-y: auto; /* 추가: 내용이 넘칠 경우 세로 스크롤 표시 */
}
.modal-scroll {
  margin-bottom: 20px; /* 추가: 스크롤과 버튼 사이에 여백을 추가합니다. */
}
.modal-close {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: lightgray;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.modal-close:hover {
  background-color: gray;
}
</style>
