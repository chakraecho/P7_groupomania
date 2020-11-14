<template>
  <v-container fluid class="pt-0 ma-0">
    <template v-if="isUser">
      <v-dialog v-model="menuDialog" v-if="menuDialog">
        <v-card>
          <v-container>
            <v-row>
              <v-btn name="delete_account" text @click="deleteUser = true">
                Supprimer mon compte
              </v-btn>
            </v-row>
          </v-container>
        </v-card>
        <v-dialog v-model="deleteUser" v-if="deleteUser" persistent
          ><v-card>
            <v-container>
              <p>
                Etes vous sûre de vouloir supprimer votre Compte ? Toutes les
                données relative tels que post et commentaires seront supprimé
              </p>
              <v-btn name="confirm_delete" @click="deleteUserRequest()" class="mr-3">
                Oui
              </v-btn>
              <v-btn
                  name="cancel_delete"
                @click="
                  deleteUser = false;
                  menuDialog = false;
                "
                class="ml-3"
              >
                Non
              </v-btn>
            </v-container>
          </v-card>
        </v-dialog>
      </v-dialog>
      <v-dialog
        v-if="modify_photo_profile"
        width="500"
        v-model="modify_photo_profile"
        @input="
          newsrcimg = undefined;
          inputFile = undefined;
        "
      >
        <v-card>
          <v-container>
            <v-row>
              <v-col cols="12"  md="6">
                <div class="img-profil-wrapper rounded-circle mx-auto">
                  <img
                    class="img-profil"
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
                <v-btn name="update_profil_img" @click="updateImg('profil')">
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
              <v-col cols="12"  md="6">
                <img
                  class="img-banner-change mx-auto"
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
                <v-btn name="update_banner" @click="updateImg('banner')">
                  Mettre à jour
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>
    </template>
    <v-dialog v-if="$vuetify.breakpoint.xs" v-model="activeComment">
      <commentCard />
    </v-dialog>
    <v-row>
      <v-container fluid class="pt-0">
        <v-row>
          <v-btn
              name="modify_banner_button"
              aria-label="modify_banner"
            icon
            class="modify--background pa-3"
            @click="modify_photo_banner = true"
            v-if="isUser"
            ><v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-container
            fluid
            class="banner-block pa-0 d-flex align-center justify-center"
            :style="{ 'background-image': 'url(' + bannerUrl + ')' }"
            style="background-size : cover"
          >
            <div class="d-grid">
              <div class="photo-wrapper justify-self-center">
                <div class=" modify--profile">
                  <div
                    class="img-profil-wrapper rounded-circle d-flex align-items-center justify-center"
                  >
                    <img
                      :src="profilImgUrl"
                      :alt="'photo de profil de ' + firstName + ' ' + lastName"
                      class="img-profil"
                    />
                  </div>
                </div>
                <v-btn
                    name="modify_profil_button"
                    aria-label="modify_profil"
                  icon
                  class="modify--profile--img pa-0 ma-0 rounded-circle"
                  @click="modify_photo_profile = true"
                  v-if="isUser"
                  ><v-icon>mdi-pencil</v-icon>
                </v-btn>
              </div>
            </div>
          </v-container>
          <v-container>
            <v-row>
              <v-col cols="3">

              </v-col>
              <v-col cols="6">
                <div class="name-card-wrapper mt-2">
                  <v-card class="name-card">
                    <h1>{{ firstName }} {{ lastName }}</h1>
                  </v-card>
                </div>
              </v-col>
              <v-col cols="3">
                <div class="ml-auto mt-2 mr-2" v-if="!isUser">
                  <v-btn name="follow" color="primary" @click="follow">
                    {{ followed ? "Ne plus suivre" : "Suivre" }}
                  </v-btn>
                </div>
                <div class="menu--account" v-if="isUser">
                  <v-btn name="options" aria-label="open_option" icon @click="menuDialog = true">
                    <v-icon>
                      mdi-dots-horizontal
                    </v-icon>
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-row>
      </v-container>
    </v-row>
    <v-row class="flex-column-reverse flex-md-row">
      <v-col>
        <h2 class="white--text">Post de cet utilisateur</h2>
        <v-container class="mt-5 pt-5">
          <template v-if="posts === null"> </template>
          <template v-else-if="posts.length === 0">
            <p class="white--text">Cet utilisateur n'a aucun post</p>
          </template>
          <template v-else-if="posts.length > 0">
            <v-row justify="center">
              <v-col cols="12" md="6" lg="5">
                <v-row
                  justify="center"
                  v-for="post in posts"
                  :key="'post_' + post.postId"
                >
                  <v-col>
                    <postCard :post="post" :dataId="post.postId" />
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
                <commentCard id="comment-wrapper" />
              </v-col>
            </v-row>
            <div class="pagination text--white">
              <div class="block-icon">
                <button
                  :disabled="links.first === links.last"
                  @click="getDataTable(links.first)"
                  aria-label="first"
                >
                  <v-icon color="white">mdi-page-first</v-icon>
                </button>
                <button
                    aria-label="previous"
                  :disabled="links.prev === null || links.prev === links.next"
                  @click="getDataTable(links.prev)"
                >
                  <v-icon color="white">mdi-chevron-left</v-icon>
                </button>
                <span class="current-page white--text">{{ current_page }}</span>
                <button
                    aria-label="next"
                  :disabled="links.next === null || links.prev === links.next"
                  @click="getDataTable(links.next)"
                >
                  <v-icon color="white">mdi-chevron-right</v-icon>
                </button>
                <button
                    aria-label="last"
                  :disabled="links.first === links.last"
                  @click="getDataTable(links.last)"
                >
                  <v-icon color="white">mdi-page-last</v-icon>
                </button>
              </div>
            </div>
          </template>
        </v-container>
      </v-col>
      <v-col cols="12" md="3">
        <div id="description" class="position-md-sticky">
          <div class="d-flex flex-row">
            <h2 class="white--text">
              Description
            </h2>
            <v-btn
                name="modify_description_button"
                aria-label="edit_description"
              class="position-absolute"
              icon
              v-if="isUser"
              @click="
                input_description = description;
                edit_description = true;
              "
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </div>

          <p v-if="!edit_description"  class="white--text">{{ description }}</p>
          <template v-else-if="edit_description">
            <v-text-field name="edit" outlined label="edition"  class="white--text" v-model="input_description">
            </v-text-field>
            <div class="d-flex">
              <v-btn name="update" text @click="sendUpdate">
                Mettre à jour
              </v-btn>
              <v-btn name="cancel" text @click="edit_description = false">
                Annuler
              </v-btn>
            </div>
          </template>
        </div>
      </v-col>
    </v-row>
    <options @snackbar="activateSnack($event.color, $event.msg)" @reload-post="getDataTable()" />
    <option-comment @snackbar="activateSnack($event.color, $event.msg)" />
  </v-container>
</template>

<script>
import postCard from "@/components/post/post.vue";
import commentCard from "@/components/post/comment.vue";
import options from "@/components/post/option.vue";
import optionComment from "@/components/post/option_comment"

export default {
  name: "account",
  metaInfo() {
    return {
      title:
        this.$store.state.user.userId.toString() ===
        this.$route.params.id.toString()
          ? "Mon compte - groupomania"
          : this.getFullName + " - groupomania",
      meta: [
        {
          name: "description",
          content: `Compte groupomania de ${this.getFullName}`
        }
      ]
    };
  },
  components: {
    postCard,
    commentCard,
    options,
    optionComment
  },
  data() {
    return {
      userId: this.$route.params.id,
      firstName: "",
      lastName: "",
      bannerUrl: "",
      profilImgUrl: "",
      description: "",
      followed: false,
      edit_description: false,
      input_description: "",
      modify_photo_profile: false,
      modify_photo_banner: false,
      inputFile: undefined,
      newsrcimg: undefined,
      menuDialog: false,
      deleteUser: false,
      links: {},
      current_page: 1
    };
  },
  computed: {
    isUser() {
      return (
        this.$store.state.user.userId.toString() ===
        this.$route.params.id.toString()
      );
    },
    getFullName() {
      return this.firstName + " " + this.lastName;
    },
    activeComment: {
      get() {
        return this.$store.state.comment.active;
      },
      set() {
        this.$store.dispatch("comment/neutraliseComment");
      }
    },
    posts: {
      get() {
        return this.$store.state.post.posts;
      }
    }
  },
  watch:{
    inputFile(){
      if(this.inputFile===undefined){
        this.newsrcimg = null
      }
    }
  },
  methods: {
    parseImage(evt) {
      var reader = new FileReader();
      reader.onload = e => {
        this.newsrcimg = e.target.result;
      };
      if(typeof evt === 'object'){
        reader.readAsDataURL(evt);
      }
    },
    activateSnack(color, msg) {
      this.$store.dispatch("activateSnack", { color, msg });
    },
    follow() {
      if (this.followed) {
        fetch(
          process.env.VUE_APP_BACKEND + "/api/users/follow/" + this.$route.params.id,
          { credentials: "include", method: "delete" }
        )
          .then(() => {
            this.followed = false;
          })
          .catch(error => console.log(error));
      } else if (!this.followed) {
        fetch(
          process.env.VUE_APP_BACKEND + "/api/users/follow/" + this.$route.params.id,
          { credentials: "include" }
        )
          .then(() => (this.followed = true))
          .catch(error => console.log(error));
      }
    },
    sendUpdate() {
      fetch(
        process.env.VUE_APP_BACKEND + "/api/users/account/" + this.$route.params.id,
        {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          method: "put",
          body: JSON.stringify({ description: this.input_description })
        }
      )
        .then(response =>
          response.json().then(res => {
            if (response.ok) {
              this.$store.dispatch("activateSnack", {
                color: "success",
                msg: res.message
              });
              this.edit_description = false;
              this.description = res.user.description;
            } else {
              this.$store.dispatch("activateSnack.", {
                color: "error",
                msg: res.message
              });
            }
          })
        )
        .catch(error => {
          console.log(error);
          this.snackbar = true;
          this.snackbarColor = "error";
          this.snackbarMsg = "Erreur lors de la requête, veuillez rééssayer";
          this.edit_description = false;
        });
    },
    updateImg(endpoint) {
      const body = new FormData();
      body.append("image", this.inputFile);
      fetch(
        process.env.VUE_APP_BACKEND + "/api/users/account/" +
          this.$store.state.user.userId +
          "/" +
          endpoint,
        {
          credentials: "include",
          method: "put",
          body
        }
      )
        .then(response => {
          if (response.ok) {
            response.json().then(res => {
              this.activateSnack("success", "Image modifié !");
              if (endpoint === "profil") {
                this.$store.commit(
                  "user/pushProfilImgUrl",
                  res.user.profilImgUrl
                );
                this.$set(this, "profilImgUrl", res.user.profilImgUrl);
              } else if (endpoint === "banner") {
                this.$store.commit("user/pushBanner", res.user.bannerUrl);
                this.$set(this, "bannerurl", res.group.bannerUrl);
              }
            });
          } else {
            response.json().then(res => {
              this.activateSnack("error", res.message);
            });
          }
        })
        .catch(error => {
          console.log(error);
          this.activateSnack(
            "error",
            "Erreur lors de l'envoi au serveur ! Veuillez rééssayer."
          );
        });
    },
    deleteUserRequest() {
      fetch(process.env.VUE_APP_BACKEND + "/api/users/delete", {
        method: "delete",
        credentials: "include"
      })
        .then(res => {
          if (res.ok) {
            this.activateSnack(
              "success",
              "Votre compte à bien été suppprimé, vous allez être redirigé !"
            );
            this.$store.dispatch("user/disconnect");
            setTimeout(() => {
              this.$router.push("/login");
            }, 2000);
          } else {
            this.activateSnack(
              "error",
              "Erreur lors de la requête au serveur !"
            );
          }
        })
        .catch(error => {
          console.log(error);
          this.activateSnack("error", "Erreur lors de la requête au serveur !");
        });
    },
    getDataTable(link) {
      if (link === undefined) {
        link =
          process.env.VUE_APP_BACKEND + "/api/users/" + this.$route.params.id + "/post";
      }
      fetch(link, { credentials: "include" })
        .then(response =>
          response.json().then(res => {
            this.$store.dispatch("post/loadPost", res.posts);
            this.$set(this, "links", res.links);
            this.$set(this, "current_page", res.current_page);
          })
        )
        .catch(error => console.log(error));
    }
  },
  mounted() {
    fetch(process.env.VUE_APP_BACKEND + "/api/users/" + this.$route.params.id, {
      credentials: "include"
    })
      .then(response => {
        if (response.ok) {
          response.json().then(resparse => {
            const res = resparse.user;
            if (resparse.user === null) {
              this.$router.push("/notfound");
            }
            this.firstName = res.firstName;
            this.lastName = res.lastName;
            this.bannerUrl = res.bannerUrl;
            this.profilImgUrl = res.profilImgUrl;
            this.description = res.description;
          });
        } else {
          this.$router.push("/notfound");
        }
      })
      .catch(error => console.log(error));

    this.getDataTable();

    if (this.$route.params.id !== this.$store.state.user.userId) {
      fetch(
        process.env.VUE_APP_BACKEND + "/api/users/follow/check/" + this.$route.params.id,
        { credentials: "include" }
      )
        .then(res => {
          if (res.status === 200) {
            this.followed = true;
          } else if (res.status === 204) {
            this.followed = false;
          }
        })
        .catch(error => console.log(error));
    }
  }
};
</script>

<style lang="scss">
.v-input__prepend-outer {
  margin: auto !important;
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
    &-change{
      height:100px;
      width:200px;
    }
  }
  &-profil {
    width: 10vw;
    height: 10vw;

    &-wrapper {
      width: 10vw;
      height: 10vw;
      background-color: white;
      overflow: hidden;
      position: relative;
      border: 1px solid grey;
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
    max-width:70vw;
  }
}

.d-grid {
  display: grid;
}
.justify-self-center {
  justify-self: center;
}

.menu--account {
  position: absolute;
  right: 0;
}

.photo-wrapper {
  display: grid;
  width: max-content;
  position: relative;
}

#comment-wrapper{
  position:sticky;
  top:10vh;
  height:90vh;
}
</style>

<style lang="scss">
@media screen and (max-width: 960px) {
  .img-profil-wrapper {
    width: 100px;
    height: 100px;
  }
  .img-profil{
    width:100px;
    height:100px;
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