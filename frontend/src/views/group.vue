<template>
  <v-container fluid class="pt-0 ma-0">
    <!-- admin dialog -->
    <template v-if="isAdmin">
      <v-dialog v-if="menuDialog" v-model="menuDialog">
        <v-card>
          <v-container>
            <v-row>
              <v-col class="mx-auto">
                <v-btn name="delete_group" text @click="deleteGroup = true">
                  Supprimer le groupe
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
        <v-dialog v-if="deleteGroup" v-model="deleteGroup">
          <v-card>
            <p>
              Êtes vous sûre de vouloir supprimer le groupe ? Les données
              associées au groupe tels que les posts et commentaires seront
              supprimé.
            </p>
            <v-btn name="confirm_group_delete" text @click="deleteGroupRequest">
              Oui
            </v-btn>
            <v-btn
                name="go_back"
                text
                @click="
                deleteGroup = false;
                menuDialog = false;
              "
            >
              Non
            </v-btn>
          </v-card>
        </v-dialog>
      </v-dialog>
      <v-dialog
          v-if="modify_photo_profile"
          width="500"
          :fullscreen="$vuetify.breakpoint.xsOnly"
          v-model="modify_photo_profile"
          @input="
          newsrcimg = undefined;
          inputFile = undefined;
        "
      >
        <v-card>
          <v-container>
            <v-row>
              <v-col cols="12" class="mx-auto" md="6">
                <div class="img-profil-wrapper rounded-circle">
                  <img
                      class="img-profile"
                      alt="image à changer"
                      :src="newsrcimg"
                      v-if="newsrcimg"
                  />
                </div>
              </v-col>
              <v-col cols="10" md="6" class="mx-auto">
                <v-file-input
                    accept="image/png, image/jpeg"
                    @change="parseImage($event)"
                    v-model="inputFile"
                ></v-file-input>
                <v-btn name="update_profil_image" @click="updateImg('img')">
                  Mettre à jour
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>
      <v-dialog
          v-if="modify_photo_banner"
          width="500"
          :fullscreen="$vuetify.breakpoint.xsOnly"
          v-model="modify_photo_banner"
          @input="
          newsrcimg = undefined;
          inputFile = undefined;
        "
      >
        <v-card>
          <v-container>
            <v-row>
              <v-col cols="12" class="mx-auto" md="6">
                <img
                    class="img-profile"
                    alt="image à changer"
                    :src="newsrcimg"
                    v-if="newsrcimg"
                />
              </v-col>
              <v-col cols="10" md="6" class="mx-auto">
                <v-file-input
                    accept="image/png, image/jpeg"
                    @change="parseImage($event)"
                    v-model="inputFile"
                ></v-file-input>
                <v-btn name="update_banner_image" @click="updateImg('banner')">
                  Mettre à jour
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>
    </template>
    <!-- comment dialog for mobile devices -->
    <v-dialog v-if="$vuetify.breakpoint.xs" v-model="activeComment">
      <commentCard :key="comment_key"/>
    </v-dialog>
    <v-row>
      <v-container fluid class="pt-0">
        <v-row>
          <v-btn
              icon
              class="modify--background pa-3"
              @click="modify_photo_banner = true"
              v-if="isAdmin"
              aria-label="modify_banner"
              name="admin_open_modify_banner"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-container
              fluid
              class="banner-block pa-0 d-flex align-center justify-center"
              :style="{ 'background-image': 'url(' + bannerUrl + ')' }"
              style="background-size : cover"
          >
            <div class="position-relative">
              <div
                  class="img-profil-wrapper rounded-circle d-flex align-items-center justify-center"
              >
                <img
                    :src="imgUrl"
                    :alt="'photo de profil de ' + groupName"
                    class="img-profil"
                />
              </div>
              <v-btn
                  name="admin_modify_group_img"
                  icon
                  class="modify--profile--img pa-0 ma-0 rounded-circle"
                  @click="modify_photo_profile = true"
                  v-if="isAdmin"
                  aria-label="modify_photo"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </div>
          </v-container>

        </v-row>
        <v-row>
          <v-col cols="4">

          </v-col>
          <v-col cols="4">
            <div class="name-card-wrapper mt-2">
              <v-card class="name-card">
                <h1>{{ groupName }}</h1>
              </v-card>
            </div>
          </v-col>
          <v-col cols="4">
            <v-row>
              <v-col cols="12" md="9">
                <v-btn class="ml-auto" name="join_group" @click="joinGrouphandler()">
                  {{ isMember ? "Quitter" : "Rejoindre" }}
                </v-btn>
              </v-col>

                <v-btn class="ml-auto" aria-label="open_options" name="open_menu" icon @click="menuDialog = true">
                  <v-icon>
                    mdi-dots-horizontal
                  </v-icon>
                </v-btn>

            </v-row>
          </v-col>

        </v-row>

      </v-container>
    </v-row>
    <v-row >
      <v-container>
        <div class="d-flex flex-column-reverse flex-md-row">
          <v-col>
            <v-row>
              <v-col cols="12" md="8" class="mx-auto">
                <postCreator
                    ref="postcreator"
                    v-if="isMember"
                    @send-post="getDataTable()"
                />
              </v-col>
            </v-row>
            <h2 class="white--text">Posts du groupe</h2>
            <template v-if="posts === null"></template>
            <template v-else-if="posts.length === 0">
              <p class="white--text">Aucun post dans le groupe</p>
            </template>
            <template v-else-if="posts.length > 0">
              <v-row justify="center" class="mt-5 pt-5">
                <v-col cols="11" md="6">
                  <v-row
                      justify="center"
                      v-for="post in posts"
                      :key="'post_' + post.postId"
                  >
                    <v-col>
                      <postCard :post="post" :dataId="post.postId"/>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col
                    cols="11"
                    md="5"
                    lg="4"
                    class="pl-3"
                    v-if="$vuetify.breakpoint.mdAndUp && activeComment"
                >
                  <commentCard :key="comment_key"/>
                </v-col>
              </v-row>
              <div class="pagination">
                <div class="block-icon">
                  <button
                      :disabled="links.first === links.last"
                      @click="getDataTable(links.first)"
                      aria-label="first"
                  >
                    <v-icon>mdi-page-first</v-icon>
                  </button>
                  <button
                      :disabled="links.prev === null || links.prev === links.next"
                      @click="getDataTable(links.prev)"
                      aria-label="previous"
                  >
                    <v-icon>mdi-chevron-left</v-icon>
                  </button>
                  <span class="current-page">{{ current_page }}</span>
                  <button
                      :disabled="links.next === null || links.prev === links.next"
                      @click="getDataTable(links.next)"
                      aria-label="next"
                  >
                    <v-icon>mdi-chevron-right</v-icon>
                  </button>
                  <button
                      aria-label="last"
                      :disabled="links.first === links.last"
                      @click="getDataTable(links.last)"
                  >
                    <v-icon>mdi-page-last</v-icon>
                  </button>
                </div>
              </div>
            </template>
          </v-col>
          <v-col cols="12" md="3">
            <div id="description" class="position-md-sticky">
              <h2 class="white--text">
                Description
                <v-btn
                    name="edit_description"
                    class="position-absolute"
                    icon
                    v-if="isAdmin"
                    @click="
                    input_description = description;
                    edit_description = true;
                  "
                    aria-label="edit_description"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </h2>
              <p v-if="!edit_description" class="white--text">{{ description }}</p>
              <template v-else-if="edit_description">
                <v-text-field
                    outlined
                    class="white--text"
                    label="edition"
                    v-model="input_description"
                >
                </v-text-field>
                <div class="d-flex">
                  <v-btn name="update_desc" text @click="sendUpdate">
                    Mettre à jour
                  </v-btn>
                  <v-btn name="cancel_description_update" text @click="edit_description = false">
                    Annuler
                  </v-btn>
                </div>
              </template>
            </div>
          </v-col>
        </div>
      </v-container>
    </v-row>
    <options @snackbar="activateSnack($event.color, $event.msg)" @reload-post="getDataTable()"/>
    <optionComment @reload-comment="comment_key++"/>
  </v-container>
</template>

<script>
import postCard from "@/components/post/post.vue";
import commentCard from "@/components/post/comment.vue";
import postCreator from "@/components/post/createPost.vue";
import options from "@/components/post/option.vue";
import optionComment from "@/components/post/option_comment.vue"

export default {
  name: "group",

  metaInfo() {
    return {
      title: this.groupName + ' - groupomania',
      meta: [{
        name: "description",
        content: `La page du groupe ${this.groupName} du réseau social Groupomania`
      }]
    }
  },

  components: {
    postCard,
    commentCard,
    postCreator,
    options,
    optionComment
  },
  data() {
    return {
      userId: this.$route.params.id,
      groupName: "",
      bannerUrl: "",
      imgUrl: "",
      description: "",
      isAdmin: false,
      isMember: false,
      edit_description: false,
      input_description: "",
      modify_photo_profile: false,
      modify_photo_banner: false,
      inputFile: undefined,
      newsrcimg: undefined,
      menuDialog: false,
      deleteGroup: false,
      links: {},
      current_page: 1,
      comment_key: 0
    };
  },
  computed: {
    activeComment: {
      get() {
        return this.$store.state.comment.active;
      }
    },
    posts: {
      get() {
        return this.$store.state.post.posts;
      }
    }
  },
  methods: {
    activateSnack(color, msg) {
      this.$store.dispatch("activateSnack", {color, msg});
    },
    getDataTable(link) {
      if (link === undefined) {
        link =
            process.env.VUE_APP_BACKEND + "/api/group/" + this.$route.params.id + "/post";
      }
      fetch(link, {credentials: "include"})
          .then(response =>
              response.json().then(res => {
                if (response.ok) {
                  this.$store.dispatch("post/loadPost", res.posts);
                  this.links = res.links;
                  this.current_page = res.current_page;
                } else {
                  this.activateSnack(
                      "error",
                      "Erreur lors de la récupération des posts utilisateur."
                  );
                }
              })
          )
          .catch(error => {
            this.activateSnack(
                "error",
                "Erreur lors de la récupération des posts utilisateur."
            );
            console.log(error);
          });
    },
    parseImage(evt) {
      var reader = new FileReader();
      reader.onload = e => {
        this.newsrcimg = e.target.result;
      };
      reader.readAsDataURL(evt);
    },
    sendUpdate() {
      fetch(process.env.VUE_APP_BACKEND + "/api/group/" + this.$route.params.id, {
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        method: "put",
        body: JSON.stringify({description: this.input_description})
      })
          .then(response =>
              response.json().then(res => {
                if (response.ok) {
                  this.activateSnack(
                      "success",
                      "Votre description à bien été mis à jour !"
                  );
                  this.edit_description = false;
                  this.description = res.group.description;
                } else {
                  this.activateSnack(
                      "error",
                      "Erreur lors de la requête, veuillez rééssayer"
                  );
                }
                this.getDataTable();
              })
          )
          .catch(error => {
            console.log(error);
            this.activateSnack(
                "error",
                "Erreur lors de la requête, veuillez rééssayer"
            );
            this.edit_description = false;
          });
    },
    updateImg(endpoint) {
      const body = new FormData();
      body.append("image", this.inputFile);
      fetch(
          process.env.VUE_APP_BACKEND + "/api/group/" +
          this.$route.params.id +
          "/" +
          endpoint,
          {
            credentials: "include",
            method: "put",
            body
          }
      )
          .then(response =>
              response.json().then(res => {
                if (response.ok) {
                  this.activateSnack("success", "Image modifié !");
                  if (endpoint === "img") {
                    this.imgUrl = res.group.imgUrl;
                  } else if (endpoint === "banner") {
                    this.bannerUrl = res.group.bannerUrl;
                  }
                  this.getDataTable();
                } else {
                  this.activateSnack("error", res.message);
                  this.getDataTable();
                }
              })
          )
          .catch(error => {
            console.log(error);
            this.activateSnack(
                "error",
                "Erreur lors de l'envoi au serveur ! Veuillez rééssayer."
            );
          });
    },
    deleteGroupRequest() {
      fetch(process.env.VUE_APP_BACKEND + "/api/group/" + this.$route.params.id, {
        credentials: "include",
        method: "delete"
      })
          .then(res => {
            if (res.ok) {
              this.activateSnack(
                  "success",
                  "Le groupe à bien été supprimé ! Vous allez être redirigé vers la page de feed !"
              );
              setTimeout(() => {
                this.$router.push("/");
              }, 3000);
            } else {
              this.activateSnack(
                  "error",
                  "Erreur lors de l'envoi de la requête, veuillez contacter un administrateur"
              );
            }
          })
          .catch(error => {
            console.log(error);
            this.activateSnack(
                "error",
                "Erreur lors de l'envoi de la requête, veuillez contacter un administrateur"
            );
            this.menuDialog = false;
            this.deleteGroup = false;
          });
    },
    joinGrouphandler() {
      if (this.isMember) {
        fetch(
            process.env.VUE_APP_BACKEND + "/api/group/" + this.$route.params.id + "/leave",
            {
              credentials: "include",
              method: "delete"
            }
        ).then(res => {
          if (!res.ok) {
            res.json().then(response => console.log(response.message));
            this.activateSnack("error", "Il y a eu une erreur.");
          } else {
            this.isMember = false;
            this.activateSnack("success", "vous avez quitté le groupe !");
          }
        });
      } else if (!this.isMember) {
        fetch(
            process.env.VUE_APP_BACKEND + "/api/group/" + this.$route.params.id + "/join",
            {
              credentials: "include",
              method: "get"
            }
        ).then(res => {
          if (!res.ok) {
            res.json().then(response => console.log(response.message));
            this.activateSnack("error", "Il y a eu une erreur.");
          } else {
            this.activateSnack("success", "Vous avez rejoins le groupe.");

            this.isMember = true;
          }
        });
      }
    }
  },

  beforeMount() {
    fetch(process.env.VUE_APP_BACKEND + "/api/group/" + this.$route.params.id, {
      credentials: "include"
    })
        .then(response =>
            response.json().then(resparse => {
              if (response.ok) {
                const res = resparse.group[0];
                this.groupName = res.groupName;
                this.bannerUrl = res.bannerUrl;
                this.imgUrl = res.imgUrl;
                this.description = res.description;
                if (resparse.role) {
                  this.isMember = true;
                }
                resparse.role === 1 ? (this.isAdmin = true) : (this.admin = false);
              } else {
                this.$router.push("/notfound");
              }
            })
        )
        .catch(error => console.log(error));

    this.getDataTable();
  }
};
</script>

<style lang="scss">
.position-relative {
  position: relative;
}

.modify {
  &--background {
    position: absolute;
    right: 0px;
  }

  &--profile {
    position: relative;

    &--img {
      position: absolute;
      bottom: 1em;
      right: 0;
      background: white;
      border: 1px solid grey;
    }
  }
}

.banner {
  &-block {
    height: 30vh;
    overflow: hidden;
  }
}

.img {
  &-banner {
    height: 100%;
    border: solid 1px grey;
  }

  &-profil {
    width: 80%;

    &-wrapper {
      width: 10vw;
      height: 10vw;
      background-color: white;
      overflow: hidden;
      position: relative;
    }
  }
}

.name-card {
  margin: auto;
  width: max-content;
  padding: 10px;

  &-wrapper {

    margin: auto;
    width: 100%;
  }
}

#description {
  position: sticky;
  top: 10vh;
}
</style>

<style lang="scss">
@media screen and (max-width: 960px) {
  .img-profil-wrapper {
    width: 100px;
    height: 100px;
  }
}
</style>

<style lang="scss">
@media screen and (min-width: 960px) {
  #description {
    position: sticky;
    top: 10vh;
  }
}
</style>