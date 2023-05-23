<template>
  <div>
    <div>100원이야</div>
    <button @click="requestPayment">결제하자</button>
  </div>
</template>

<script>
import { Bootpay } from "@bootpay/client-js";
export default {
  name: "goPay",
  data() {
    return {
      keyword: "",
    };
  },
  methods: {
    async requestPayment() {
      try {
        const response = await Bootpay.requestPayment({
          // 결제 요청 옵션들
          application_id: "6466bf8b3049c8001c9687c7",
          price: 100,
          order_name: "Kitty-Football-Club",
          order_id: "TEST_ORDER_ID",
          pg: "이니시스",
          method: "카드",
          user: {
            id: "회원아이디",
            username: "회원이름",
            phone: "01000000000",
            email: "test@test.com",
          },
          extra: {
            open_type: "iframe",
            card_quota: "0,2,3",
            escrow: false,
          },
        });
        console.log(response); // 결제 요청 결과를 출력하거나 처리합니다.
      } catch (error) {
        console.error(error); // 오류 처리를 합니다.
      }
    },
  },
};
</script>

<style></style>
