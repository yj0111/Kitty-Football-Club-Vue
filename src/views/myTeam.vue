<template>
  <div>
    <RouterView></RouterView>
    <UserList></UserList>
  </div>
</template>

<script>
import UserList from "@/components/team/UserList.vue";
export default {
  name: "myTeam",
  components: {
    UserList,
  },
};
</script>
