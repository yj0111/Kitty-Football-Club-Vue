<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-info">키티풋볼클럽 주식회사</div>
      <div class="footer-info2">
        대표이사: 박현철, 오유정 / 사업자등록번호: 123-45-67890
        <br />
        전화번호: (02)1994-1201 / 팩스: (02)1999-0111
        <br />
        주소: 서울특별시 강남구 역삼동 테헤란로 212 멀티캠퍼스
      </div>
      <div class="footer-copyright">
        Copyright ⓒ KITTY FOOTBALL CLUB All Rights Reserved.
      </div>
    </div>
  </footer>
</template>

<style>
.footer {
  background-color: #032016;
  font-family: "NanumBarunGothic";
  color: white;
  padding: 30px;
  height: 250px;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 30px;
}

.footer-info,
.footer-info2 {
  margin-bottom: 20px;
}

.footer-info1 {
  font-size: 15px;
}
.footer-info2 {
  font-size: 12px;
}
.footer-copyright {
  font-size: 12px;
}
</style>
