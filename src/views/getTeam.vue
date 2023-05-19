<template>
  <div>
    <h2>팀 구하기 페이지입니당~~~</h2>
    <input type="text" placeholder="검색어" />
    <button>검색</button>

    <br />
    <br />
    <div class="container">
      <div class="inner-div">
        <div class="image-container">
          <img src="@/assets/1684498751299_오유정_취업사진.jpg" />
        </div>
        유정팀 어찌고 저찌고 어찌고 저찌고 어찌고 저찌고 어찌고 저찌고
      </div>
      <div class="inner-div"></div>
      <div class="inner-div">아아</div>
      <div class="inner-div">아아</div>
    </div>
    <div class="container">
      <div class="inner-div">아아</div>
      <div class="inner-div">아아</div>
      <div class="inner-div">아아</div>
      <div class="inner-div">아아</div>
    </div>
    <div class="container">
      <div class="inner-div">아아</div>
      <div class="inner-div">아아</div>
      <div class="inner-div">아아</div>
      <div class="inner-div">아아</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}

.inner-div {
  margin: 10px;
  width: 200px;
  height: 150px;
  background-color: lightblue;
  border-color: lightgray;
  border-radius: 10px;
}
.image-container {
  vertical-align: middle;
  width: 75px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
}

.image-container img {
  vertical-align: middle;
  width: 50px;
  height: 50px;
  object-fit: cover;
}
</style>
