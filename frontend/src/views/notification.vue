<template>
  <v-container >
    <v-row>
      <v-col>
        <h1  class="white--text">Centre de notification</h1>
      </v-col>
    </v-row>
    <v-row class="mt-4">
      <v-col>
        <v-container>
          <template v-if="notifications === null"> </template>
          <template v-else-if="notifications.length > 0">
            <v-row>
              <v-btn name="delete_all_notif" @click="deleteAll" aria-label="delete_all">
                <v-icon>
                  mdi-delete
                </v-icon>
                Supprimer tous les notifications
              </v-btn>
            </v-row>

            <v-row v-for="notification in notifications" :key="notification.id">
              <v-col>
                <v-card>
                  <v-card-text class="pa-0">
                    <v-container>
                      <v-row>
                        <v-col cols="2" md="1">
                          <div class="profile--wrapper rounded-circle">
                            <img
                              class="profile--img rounded-circle"
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
                            {{ notification.creator.lastName }}
                            {{ notification.creator.firstName }} à publié un
                            post !
                          </p>
                          <p v-else>
                            {{ notification.creator.lastName }}
                            {{ notification.creator.firstName }} à publié un
                            post dans le groupe
                            {{ notification.group.groupName }}
                          </p>
                        </v-col>
                        <v-btn name="delete_notif" aria-label="delete_one" icon @click="deleteNotif(notification.id)">
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
            <p  class="white--text">
              Aucune notifications, mangez un cookie et suivez des personnes
            </p>
          </template>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "notification",

  metaInfo: {
      title: "notifications - groupomania",
      meta: [
        {
          name: "description",
          content: "Centre de notifications de l'utilisateur groupomania."
        }
      ]
  },

  data() {
    return {
      notifications: null,
      current_page: 1,
      links: {}
    };
  },
  methods: {
    activateSnack(color, msg) {
      this.$store.dispatch("activateSnack", { color, msg });
    },
    getDataTable(link) {
      if (link === undefined) {
        link =process.env.VUE_APP_BACKEND + "/api/users/notification/" +this.$store.state.user.userId;
      }
      fetch(link, { credentials: "include" })
        .then(response =>
          response.json().then(res => {
            this.notifications = res.result;
            (this.links = res.links), (this.current_page = res.current_page);
          })
        )
        .catch(error => console.log(error));
    },
    deleteNotif(id) {
      fetch(process.env.VUE_APP_BACKEND + "/api/users/notification/" + id, {
        method: "delete",
        credentials: "include"
      })
        .then(res => {
          if (res.ok) {
            this.activateSnack("success", "notification supprimé !");
            this.getDataTable();
          } else {
            this.activateSnack("error", "erreur lors de la requête !");
          }
        })
        .catch(error => {
          console.log(error);
          this.activateSnack("error", "Echec lors de l'envoi de la requête !");
        });
    },
    deleteAll() {
      fetch(process.env.VUE_APP_BACKEND + "/api/users/notification", {
        method: "delete",
        credentials: "include"
      })
        .then(res => {
          if (res.ok) {
            this.activateSnack("success", "notifications supprimé !");
            this.getDataTable();
          } else {
            this.activateSnack("error", "erreur lors de la requête !");
          }
        })
        .catch(error => {
          console.log(error);
          this.activateSnack("error", "Echec lors de l'envoi de la requête !");
        });
    }
  },
  mounted() {
    this.getDataTable();
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
    border: 2px grey solid;
  }
}

</style>