<template>
  <v-container fluid>
    <p v-if="groupList === null">Chargement...</p>
    <p v-else-if="groupList.length === 0">
      
        Vous n'appartenez à aucun groupe ! Vous pouvez soit créer un groupe ou
        en rechercher un !
      
    </p>
    <v-row v-for="(group, i) in groupList" :key="'group_' + i">
      <v-col>
        <v-card  class="hoverable-item"               @click="$router.push('/group/' + group.group.groupId)">
          <v-row align="center">
            <v-col cols="4" md="2" lg="1">
              <img
                :src="group.group.imgUrl"
                :alt="'image de groupe de ' + group.group.name"
                class="ml-2 group-img rounded-circle border"
              />
            </v-col>
            <v-col>
              {{ group.group.groupName }}
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      groupList: null
    };
  },
  beforeCreate() {
    fetch(process.env.VUE_APP_BACKEND + "/api/group/list", { credentials: "include" })
      .then(response =>
        response.json().then(res => (this.groupList = res.result))
      )
      .catch(error => console.log(error));
  }
};
</script>

<style>
.border {
  border: solid 2px grey;
  object-fit: contain;
}

.group-img{
  width:60px;
  height:60px;
}

.hoverable-item{
  cursor: pointer;
}
</style>