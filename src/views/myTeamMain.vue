<template>
  <div>
    <div class="containerMyTeamMainView">
      <div class="topContainer">
        <div class="myTeaminfo">
          <mainTeamInfo></mainTeamInfo>
        </div>
        <div class="recordMyTeam">
          <mainRecordVue></mainRecordVue>
        </div>
      </div>
      <main-mamber-vue></main-mamber-vue>
    </div>
  </div>
</template>

<script>
import mainMamberVue from "@/components/myteam/mainMamber.vue";
import mainTeamInfo from "@/components/myteam/mainTeamInfo.vue";
import mainRecordVue from "@/components/myteam/mainRecord.vue";

export default {
  components: { mainMamberVue, mainTeamInfo, mainRecordVue },
  name: "MainView",
  data() {
    return {
      records: [],
    };
  },
};
</script>

<style scoped>
.topContainer {
  justify-content: center;
  padding: 100px;
  padding-bottom: 70px;
  display: flex;
}
.containerMyTeamMainView {
  background: url(@/assets/mainback.png) 50% 50% / cover no-repeat;
  width: 100%;
  margin: 0 auto;
}
</style>
