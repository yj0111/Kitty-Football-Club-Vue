<template>
  <div class="listGatherpage">
    <h4 class="team_list_h4">우리 팀 경기 리스트</h4>
    <gatherList @box-clicked="openModal"></gatherList>
    <team-modal2 v-if="showModal" @close="closeModal">
      <gatherDetail :gatherId="selectedGatherId"></gatherDetail>
    </team-modal2>
  </div>
</template>

<script>
import Vue from "vue";
import VModal from "vue-js-modal";
import TeamModal2 from "@/components/myteam/TeamModal2.vue";
import gatherList from "@/components/gather/gatherList.vue";
import gatherDetail from "@/components/myteam/gatherDetail.vue";
Vue.use(VModal);

export default {
  name: "listGather",
  components: {
    gatherList,
    TeamModal2,
    gatherDetail,
  },
  data() {
    return {
      showModal: false,
      selectedGatherId: null,
    };
  },
  methods: {
    openModal(gatherId) {
      console.log("모달 버튼 눌렀어요 ㅠㅠㅠㅠㅠ");
      this.selectedGatherId = gatherId;
      console.log(gatherId);
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
  },
};
</script>

<style scoped>
.listGatherpage {
  background-color: #f5f5f5;
  height: 860px;
}

.team_list_h4 {
  text-align: center;
  padding-top: 30px;
  padding-bottom: 30px;
  font-weight: bolder;
}
</style>
