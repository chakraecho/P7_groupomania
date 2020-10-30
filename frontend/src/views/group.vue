<template>
  <v-container fluid class="pt-0 ma-0">

    <template v-if="isAdmin">
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
                <v-btn @click="updateImg('img')">
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
              v-if="isAdmin"
          ><v-icon>mdi-pencil</v-icon>
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
                  icon
                  class="modify--profile--img pa-0 ma-0 rounded-circle"
                  @click="modify_photo_profile = true"
                  v-if="isAdmin"
              ><v-icon>mdi-pencil</v-icon>
              </v-btn>
            </div>


          </v-container>
          <div class="name-card-wrapper">
            <v-card class="name-card">
              <h1>{{ groupName }}</h1>
            </v-card>
          </div>
        </v-row>
      </v-container>
    </v-row>
    <v-row class="mt-5">
      <v-container>
        <v-row>
          <v-col>
            <v-row>
              <v-col cols="12" md="8" class="mx-auto">
                <postCreator ref="postcreator"/>
              </v-col>
            </v-row>
            <v-row justify="center" class="mt-5 pt-5">
              <v-col>
                <v-col cols="11" md="6" lg="5">
                  <v-row
                      justify="center"
                      v-for="post in posts"
                      :key="'post_' + post.postId"
                  >
                    <v-col>
                      <postCard
                          :post="post"
                          :dataId="post.postId"
                      />
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="11" md="5" lg="4" class="pl-3" v-if="activeComment">
                  <commentCard/>
                </v-col>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="3">
            <div id="description" class="position-md-sticky">
              <h2>
                Description
                <v-btn
                    class="position-absolute"
                    icon
                    v-if="isAdmin"
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

      </v-container>
    </v-row>
    <options
        @snackbar="activateSnack($event.color, $event.msg)"/>
    <v-snackbar v-model="snackbar" timeout="4000" :color="snackbarColor" top right>
      {{ snackbarMsg }}
    </v-snackbar>
  </v-container>
</template>

<script>
import postCard from "@/components/post/post.vue";
import commentCard from '@/components/post/comment.vue'
import postCreator from "@/components/post/createPost.vue"
import options from "@/components/post/option.vue"

export default {
  components: {
    postCard,
    commentCard,
    postCreator,
    options
  },
  data() {
    return {
      userId: this.$route.params.id,
      groupName: '',
      bannerUrl: "",
      imgUrl: "",
      description:"",
      posts: [],
      isAdmin : false,
      snackbar: false,
      snackbarColor: "",
      snackbarMsg: "",
      edit_description: false,
      input_description: "",
      modify_photo_profile: false,
      modify_photo_banner: false,
      inputFile: undefined,
      newsrcimg: undefined
    };
  },
  methods: {
    activateSnack(color, msg) {
      this.snackbar = true;
      this.snackbarColor = color;
      this.snackbarMsg = msg;
    },
    parseImage(evt) {
      var reader = new FileReader();
      reader.onload = e => {
        this.newsrcimg = e.target.result;
      };
      reader.readAsDataURL(evt);
    },
    sendUpdate() {
      fetch(
          "http://localhost:3000/api/group/" + this.$route.params.id,
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
                this.description = res.group.description;
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
          "http://localhost:3000/api/group/" +
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
                this.activateSnack("success", "Image modifié !");
                if (endpoint === "img") {
                  this.imgUrl = res.group.imgUrl
                } else if (endpoint === "banner") {
                  this.bannerUrl = res.group.bannerUrl

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
    }
  },
  computed: {
    activeComment: {
      get() {
        return this.$store.state.comment.active
      }
    }
  },
  beforeCreate() {
    fetch("http://localhost:3000/api/group/" + this.$route.params.id, {credentials:"include"})
        .then(response =>
            response.json().then(resparse => {
              const res = resparse.group[0];
              this.groupName = res.groupName
              this.bannerUrl = res.bannerUrl;
              this.imgUrl = res.imgUrl;
              this.description = res.description
              resparse.role === 1 ? this.isAdmin = true : this.admin = false
            })
        )
        .catch(error => console.log(error));
    fetch(
        "http://localhost:3000/api/group/" + this.$route.params.id + "/post",
        {credentials: "include"}
    )
        .then(response =>
            response.json().then(res => {
              this.posts = res.posts;
            })
        )
        .catch(error => console.log(error));
  }
};
</script>

<style lang="scss">
.position-relative{
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
</style>