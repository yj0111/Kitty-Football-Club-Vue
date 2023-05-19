<template>
  <div class="containerPlay">
    <div class="play1">
      <div>로고</div>
      <div>이름</div>
      <div>몇 : 몇</div>
      <div>이름</div>
      <div>로고</div>
    </div>
    <div class="play2"></div>
  </div>
</template>

<script>
export default {
  name: "recentPlay",
};
</script>

<style scoped>
.containerPlay {
  padding: 0 20px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 500px;
  background-color: #102137;
}
.play1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 250px;
  background-color: red;
}
.play2 {
  display: flex;
  width: 100%;
  height: 250px;
  background-color: blue;
}
</style>
