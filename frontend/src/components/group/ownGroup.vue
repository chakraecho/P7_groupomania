<template>
  <v-container fluid>
      
    <p v-if="groupList.length === 0">
      
        Vous n'appartenez à aucun groupe ! Vous pouvez soit créer un groupe ou
        en rechercher un !
      
    </p>
    <v-row v-for="(group, i) in groupList" :key="'group_' + i">
      <v-col>
        <v-card>
          <v-row>
            <v-col cols="4" md="2" lg="1">
              <img
                :src="group.group.imgUrl"
                :alt="'image de groupe de ' + group.group.name"
                class="ml-2 rounded-circle border"
              />
            </v-col>
            <v-col>
              {{ group.group.groupName }}
            </v-col>
            <v-col>
              <v-btn
                color="primary"
                @click="$router.push('/group/' + group.group.groupId)"
              >
                Y aller
              </v-btn>
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
    fetch("http://localhost:3000/api/group/list", { credentials: "include" })
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
</style>