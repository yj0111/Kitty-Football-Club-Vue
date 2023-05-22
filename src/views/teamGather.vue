<template>
  <div>
    <h2>주최맨</h2>
    <gameGather></gameGather>
  </div>
</template>

<script>
import gameGather from "@/components/gather/gameGather.vue";

export default {
  name: "teamGather",
  components: {
    gameGather,
  },
};
</script>
