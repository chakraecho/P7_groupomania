<template>
  <v-container>
    <v-snackbar
    :color="snackbarColor"
    v-model="snackbar"
    timeout="3000"
    >
      {{snackbarMsg}}
    </v-snackbar>
    <v-row>
      <v-col>
        <h1>Centre de notification</h1>
      </v-col>
    </v-row>
    <v-row class="mt-4">
      <v-col>
        <v-container>
          <template v-if="notification === null">
            
          </template>
          <template v-else-if="notifications.length > 0">
            <v-row>
              <v-btn icon @click="deleteAll">
                <v-icon>
                  mdi-delete
                </v-icon>
              </v-btn>
            </v-row>
          <v-row v-for="notification in notifications" :key="notification.id">
            <v-col>
              <v-card>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="2" md="1">
                        <div class="profile--wrapper rounded-circle">
                          <img
                            class="profile--img"
                            :src="notification.creator.profilImgUrl"
                            :alt="
                              'image de profile de ' +
                                notification.creator.lastName +
                                ' ' +
                                notification.creator.firstName
                            "
                          />
                        </div>
                      </v-col>
                      <v-col>
                        <p v-if="notification.groupId === null">
                          {{ notification.creator.lastName }} {{ notification.creator.firstName }} à publié un post !
                        </p>
                        <p v-else>
                          {{ notification.creator.lastName }} {{ notification.creator.firstName }} à publié un post dans le groupe {{ notification.group.groupName}}
                        </p>
                      </v-col>
                      <v-btn icon @click="deleteNotif(notification.id)">
                        <v-icon>
                          mdi-close
                        </v-icon>
                      </v-btn>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
                      <div class="pagination">
              <div class="block-icon">
                <button
                  :disabled="links.first === links.last"
                  @click="getDataTable(links.first)"
                >
                  <v-icon>mdi-page-first</v-icon>
                </button>
                <button
                  :disabled="links.prev === null || links.prev === links.next"
                  @click="getDataTable(links.prev)"
                >
                  <v-icon>mdi-chevron-left</v-icon>
                </button>
                <span class="current-page">{{ current_page }}</span>
                <button
                  :disabled="links.next === null || links.prev === links.next"
                  @click="getDataTable(links.next)"
                >
                  <v-icon>mdi-chevron-right</v-icon>
                </button>
                <button
                  :disabled="links.first === links.last"
                  @click="getDataTable(links.last)"
                >
                  <v-icon>mdi-page-last</v-icon>
                </button>
              </div>
            </div>
          </template>
          <template v-else>
            <p>Aucune notifications, mangez un cookie et suivez des personnes </p>
          </template>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      notifications: null,
            current_page: 1,
      links: {},
      snackbar: false,
      snackbarMsg : "",
      snackbarColor : ""
    };
  },
  methods:{
    activateSnack(color, msg){
      this.snackbar = true
      this.snackbarColor = color
      this.snackbarMsg = msg
    },
    getDataTable(link){
      if(link === undefined){
        link = "http://localhost:3000/api/users/notification/" +this.$store.state.user.userId
      }
    fetch(
      link,
      { credentials: "include" }
    )
      .then(response =>
        response.json().then(res => {
          this.notifications = res.result;
          this.links = res.links,
          this.current_page = res.current_page
        })
      )
      .catch(error => console.log(error));
    },
    deleteNotif(id){
      fetch('http://localhost:3000/api/users/notification/' + id, {
        method:"delete",
        credentials: 'include'
      })
      .then(res => {
        if(res.ok){
          this.activateSnack("success", "notification supprimé !")
          this.getDataTable()
        }else {
          this.activateSnack("error", "erreur lors de la requête !")
        }
      })
      .catch(error => {
        console.log(error)
        this.activateSnack("error", "Echec lors de l'envoi de la requête !")
      })
    },
    deleteAll(){
      fetch('http://localhost:3000/api/users/notification', {
        method:'delete',
        credentials:'include'
      }).then(res => {
        if(res.ok){
          this.activateSnack("success", "notifications supprimé !")
          this.getDataTable()
        }else {
          this.activateSnack("error", "erreur lors de la requête !")
        }
      })
      .catch(error => {
        console.log(error)
        this.activateSnack("error", "Echec lors de l'envoi de la requête !")
      })
    }
  },
  mounted() {
    this.getDataTable()
  }
};
</script>

<style lang="scss">
.profile {
  &--wrapper {
    width: 100%;
  }
  &--img {
    width: 100%;
  }
}
</style>