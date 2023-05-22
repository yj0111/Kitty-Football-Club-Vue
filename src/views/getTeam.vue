<template>
  <div>
    <h4 class="team_list_h4">전체 팀 리스트</h4>
    <div>
      <img src="@/assets/team.png" class="team_pic" />
    </div>
    <div class="search-container">
      <input type="text" placeholder="검색어" class="search-input" />
      <button class="search-button">검색</button>
    </div>
    <team-list @box-clicked="openModal"></team-list>
    <team-modal v-if="showModal" @close="closeModal">
      <teamDetail :teamId="selectedTeamId"></teamDetail>
      <UserList :teamId="selectedTeamId"></UserList>
      <!-- userList.vue에 team_id 값을 전달 -->
    </team-modal>
  </div>
</template>

<script>
import Vue from "vue";
import VModal from "vue-js-modal";
import teamList from "@/components/team/teamList.vue";
import TeamModal from "@/components/TeamModal.vue";
import UserList from "@/components/team/UserList.vue";
import teamDetail from "@/components/team/teamDetail.vue";
Vue.use(VModal);

export default {
  components: {
    teamList,
    TeamModal,
    UserList,
    teamDetail,
  },
  data() {
    return {
      showModal: false,
      selectedTeamId: null, // 선택한 팀의 team_id 값을 저장할 변수
    };
  },
  methods: {
    openModal(teamId) {
      this.selectedTeamId = teamId; // 선택한 팀의 team_id 값을 저장
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
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

.search-container {
  display: flex;
  align-items: center;
  justify-content: flex-end; /* 수정: 입력 공간을 오른쪽 정렬 */
  margin-bottom: 40px;
  padding-top: 50px;
  padding-right: 50px;
}

.search-input {
  width: 350px;
  padding: 8px;
  border: 1px solid lightgray;
  border-radius: 5px;
  margin-right: 10px;
}

.search-button {
  padding: 8px 16px;
  background-color: lightgray;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-button:hover {
  background-color: gray;
}
.team_pic {
  width: 1100px;
  height: 400px;
}
</style>
