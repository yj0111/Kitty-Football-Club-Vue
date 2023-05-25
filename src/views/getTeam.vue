<template>
  <div class="getTeam">
    <h4 class="team_list_h4">전체 팀 리스트</h4>
    <div class="search-container">
      <input
        type="text"
        placeholder="팀 이름"
        class="search-input"
        v-model="searchText"
      />

      <button class="search-button">검색</button>
    </div>
    <team-list ref="teamList" @box-clicked="openModal"></team-list>
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
      selectedTeamId: null,
      searchText: "",
    };
  },
  methods: {
    openModal(teamId) {
      this.selectedTeamId = teamId;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
  },
  watch: {
    searchText(newText) {
      this.$refs.teamList.filterTeams(newText);
      console.log(newText);
    },
  },
};
</script>

<style scoped>
.getTeam {
  font-family: "NanumBarunGothic";
}
.team_list_h4 {
  text-align: center;
  padding-top: 30px;
  padding-bottom: 30px;
  font-weight: bolder;
}

.search-container {
  margin-right: 192px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 40px;
  padding-top: 50px;
  padding-right: 248px;
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
