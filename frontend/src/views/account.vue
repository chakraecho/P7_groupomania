<template>
  <v-container fluid class="pt-0 ma-0">
    <template v-if="isUser">
      <v-dialog v-model="menuDialog" v-if="menuDialog">
        <v-card>
          <v-container>
            <v-row>
              <v-btn text @click="deleteUser = true">
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
              <v-btn @click="deleteUserRequest()" class="mr-3">
                Oui
              </v-btn>
              <v-btn
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
                <v-btn @click="updateImg('profil')">
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
                <v-btn @click="updateImg('banner')">
                  Mettre à jour
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>
    </template>
    <v-row>
      <v-container fluid class="pt-0">
        <v-row>
          <v-btn
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
              <v-btn
                icon
                class="modify--profile--img pa-0 ma-0 rounded-circle"
                @click="modify_photo_profile = true"
                v-if="isUser"
                ><v-icon>mdi-pencil</v-icon>
              </v-btn>
            </div>
          </v-container>
          <div class="name-card-wrapper">
            <v-card class="name-card">
              <h1>{{ firstName }} {{ lastName }}</h1>
            </v-card>
            <div class="menu--account">
              <v-btn icon @click="menuDialog = true">
                <v-icon>
                  mdi-dots-horizontal
                </v-icon>
              </v-btn>
            </div>
          </div>
          <div class="ml-auto mt-2 mr-2" v-if="!isUser">
            <v-btn color="primary" @click="follow">
              {{ followed ? "Ne plus suivre" : "Suivre" }}
            </v-btn>
          </div>
        </v-row>
      </v-container>
    </v-row>
    <v-row>
      <v-col>
        <v-container class="mt-5 pt-5">
          <template v-if="posts === null">

          </template>
          <template v-else-if="posts.length === 0">
            <p>Cet utilisateur n'a aucun post</p>
          </template>
          <template v-else-if="posts.length > 0">
            <v-row justify="center">
              <v-col cols="11" md="6" lg="5">
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
              <v-col cols="11" md="5" lg="4" class="pl-3" v-if="activeComment">
                <commentCard />
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
        </v-container>
      </v-col>
      <v-col cols="3">
        <div id="description" class="position-md-sticky">
          <h2>
            Description
            <v-btn
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
          </h2>
          <p v-if="!edit_description">{{ description }}</p>
          <template v-else-if="edit_description">
            <v-text-field outlined label="edition" v-model="input_description">
            </v-text-field>
            <div class="d-flex">
              <v-btn text @click="sendUpdate">
                Mettre à jour
              </v-btn>
              <v-btn text @click="edit_description = false">
                Annuler
              </v-btn>
            </div>
          </template>
        </div>
      </v-col>
    </v-row>
    <options @snackbar="activateSnack($event.color, $event.msg)" />
    <v-snackbar
      v-model="snackbar"
      timeout="4000"
      :color="snackbarColor"
      top
      right
    >
      {{ snackbarMsg }}
    </v-snackbar>
  </v-container>
</template>

<script>
import postCard from "@/components/post/post.vue";
import commentCard from "@/components/post/comment.vue";
import options from "@/components/post/option.vue";

export default {
  components: {
    postCard,
    commentCard,
    options
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
      snackbar: false,
      snackbarColor: "",
      snackbarMsg: "",
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
    parseImage(evt) {
      var reader = new FileReader();
      reader.onload = e => {
        this.newsrcimg = e.target.result;
      };
      reader.readAsDataURL(evt);
    },
    activateSnack(color, msg) {
      this.snackbar = true;
      this.snackbarColor = color;
      this.snackbarMsg = msg;
    },
    follow() {
      if (this.followed) {
        fetch(
          "http://localhost:3000/api/users/follow/" + this.$route.params.id,
          { credentials: "include", method: "delete" }
        )
          .then(() => {
            this.followed = false;
          })
          .catch(error => console.log(error));
      } else if (!this.followed) {
        fetch(
          "http://localhost:3000/api/users/follow/" + this.$route.params.id,
          { credentials: "include" }
        )
          .then(() => (this.followed = true))
          .catch(error => console.log(error));
      }
    },
    sendUpdate() {
      fetch(
        "http://localhost:3000/api/users/account/" + this.$route.params.id,
        {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          method: "put",
          body: JSON.stringify({ description: this.input_description })
        }
      )
        .then(response =>
          response.json().then(res => {
            this.snackbar = true;
            this.snackbarMsg = "Votre description à bien été mis à jour !";
            this.snackbarColor = "success";
            this.edit_description = false;
            this.description = res.user.description;
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
        "http://localhost:3000/api/users/account/" +
          this.$store.state.user.userId +
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
    deleteUserRequest() {
      fetch("http://localhost:3000/api/users/delete", {
        method: "delete",
        credentials: "include"
      })
        .then(() => {
          this.activateSnack(
            "success",
            "Votre compte à bien été suppprimé, vous allez être redirigé !"
          );
          this.$store.dispatch("user/disconnect");
          setTimeout(() => {
            this.$router.push("/login");
          }, 2000);
        })
        .catch(error => {
          console.log(error);
          this.activateSnack("error", "Erreur lors de la requête au serveur !");
        });
    },
    getDataTable(link) {
      if (link === undefined) {
        link =
          "http://localhost:3000/api/users/" + this.$route.params.id + "/post";
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
    fetch("http://localhost:3000/api/users/" + this.$route.params.id, {
      credentials: "include"
    })
      .then(response =>
        response.json().then(resparse => {
          const res = resparse.user[0];
          this.firstName = res.firstName;
          this.lastName = res.lastName;
          this.bannerUrl = res.bannerUrl;
          this.profilImgUrl = res.profilImgUrl;
          this.description = res.description;
        })
      )
      .catch(error => console.log(error));

    this.getDataTable();

    if (this.$route.params.id !== this.$store.state.user.userId) {
      fetch(
        "http://localhost:3000/api/users/follow/check/" + this.$route.params.id,
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
  }
  &-profil {
    width: 80%;

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
    position: absolute;
    top: 27vh;
    margin: auto;
    width: 100%;
  }
}

#description {
  position: sticky;
  top: 10vh;
}

.menu--account{
}
</style>