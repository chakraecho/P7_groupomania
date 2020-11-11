<template>
  <v-card class="create-post">
    <v-dialog v-model="success" width="200" class="rounded-circle">
      <v-card class="success-dialog">
        <div class="success-checkmark">
          <div class="check-icon">
            <span class="icon-line line-tip"></span>
            <span class="icon-line line-long"></span>
            <div class="icon-circle"></div>
            <div class="icon-fix"></div>
          </div>
        </div>
      </v-card>
    </v-dialog>
    <v-row class="align-center justify-center">
      <v-col cols="2" md="1">
        <img
          :src="profilImgUrl"
          :alt="'photo de profil du compte'"
          class="w-100 img-profil rounded-circle"
        />
      </v-col>
      <v-col cols="6" md="9" lg="9">
        <v-textarea
          name="post"
          rows="2"
          label="Nouveau post"
          dense
          auto-grow
          placeholder="Quelque chose à dire ?"
          v-model="content"
        >
        </v-textarea>
      </v-col>
      <v-col cols="1" md="1" class="d-flex flex-column">
        <v-file-input
          accept="image/png,image/jpg"
          hide-input
          prepend-icon="mdi-image-plus"
          v-model="image"
          @change="parseImg($event)"
        >
        </v-file-input>
        <v-btn name="send_post" aria-label="send_post" icon @click="sendPost()">
          <v-icon>
            mdi-send
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-if="srcImg.length > 2" class="pa-2">
      <div class="img-block mx-auto">
        <img :src="srcImg" alt="photo à envoyer" class="img--inside" />
        <v-btn
            aria-label="close"
            name="close"
          icon
          class="ml-auto mr-3 mt-3 btn--close"
          @click="
            srcImg = '';
            image = undefined;
          "
        >
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
      </div>
    </v-row>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      content: "",
      image: undefined,
      dialog: false,
      loading: false,
      success: false,
      srcImg: ""
    };
  },
  computed: {
    ...mapState("user", ["profilImgUrl"])
  },
  methods: {
    parseImg(evt) {
      var reader = new FileReader();
      reader.onload = e => {
        this.srcImg = e.target.result;
      };
      reader.readAsDataURL(evt);
    },
    sendPost() {
      if(this.content.length === 0){
        return false;
      }

      this.loading = true;
      let body = new FormData();
      body.append(
        "body",
        JSON.stringify({
          userId: this.$store.state.user.userId,
          content: this.content
        })
      );

      if (this.image !== undefined) {
        body.append("file", this.image);
      }

      if (this.$route.name !== "group") {
        fetch(process.env.VUE_APP_BACKEND + "/api/post/submit", {
          method: "POST",
          body,
          credentials: "include"
        })
          .then(res => {
            if (res.ok) {
              this.loading = false;
              this.content = "";
              this.image = undefined;
              res.json().then(response => {
                this.$store.dispatch("activateSnack", {
                  color: "success",
                  msg: response.message
                });
                this.$emit('send-post')
              });
            } else {
              this.loading = false;
              res.json().then(response => {
                this.$store.dispatch("activateSnack", {
                  color: "error",
                  msg: response.message
                });
              });
                              this.$emit('send-post')

            }
          })
          .catch(error => {
            console.log(error);
            this.$store.dispatch("activateSnack", {
              color: "error",
              msg: "Une erreur s'est produite lors de l'envoi !"
            });
          });
      } else {
        fetch(process.env.VUE_APP_BACKEND + "/api/group/" +this.$route.params.id + "/submit",
          {
            method: "POST",
            body,
            credentials: "include"
          }
        )
          .then(res => {
            if (res.ok) {
              this.loading = false;
              this.content = "";
              this.image = undefined;
              res.json().then(response => {
                this.$store.dispatch("activateSnack", {
                  color: "success",
                  msg: response.message
                });
              });
                              this.$emit('send-post')

            } else {
              this.loading = false;
              res.json().then(response => {
                this.$store.dispatch("activateSnack", {
                  color: "error",
                  msg: response.message
                });
              });
            }
          })
          .catch(error => {
            console.log(error);
            this.$store.dispatch("activateSnack", {
              color: "error",
              msg: "Une erreur s'est produite lors de l'envoi !"
            });
          });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.img {
  &--inside {
    width: 100%;
    height: 100%;
  }

  &-block {
    background-size: cover;
    border: 2px grey solid;
    max-width: 200px !important;
    max-height: 200px !important;
  }
}

.btn--close {
  position: absolute;
}
</style>


<style lang="scss" scoped>
.w-100 {
  width: 100%;
}

.w-50 {
  width: 50%;
}

.img-profil {
  border: 2px grey solid;
}

/**
 * Extracted from: SweetAlert
 * Modified by: Istiak Tridip
 */
.success-checkmark {
  width: 80px;
  height: 115px;
  margin: 0 auto;

  .check-icon {
    width: 80px;
    height: 80px;
    position: relative;
    border-radius: 50%;
    box-sizing: content-box;
    border: 4px solid #4caf50;

    &::before {
      top: 3px;
      left: -2px;
      width: 30px;
      transform-origin: 100% 50%;
      border-radius: 100px 0 0 100px;
    }

    &::after {
      top: 0;
      left: 30px;
      width: 60px;
      transform-origin: 0 50%;
      border-radius: 0 100px 100px 0;
      animation: rotate-circle 4.25s ease-in;
    }

    &::before,
    &::after {
      content: "";
      height: 100px;
      position: absolute;
      background: #ffffff;
      transform: rotate(-45deg);
    }

    .icon-line {
      height: 5px;
      background-color: #4caf50;
      display: block;
      border-radius: 2px;
      position: absolute;
      z-index: 10;

      &.line-tip {
        top: 46px;
        left: 14px;
        width: 25px;
        transform: rotate(45deg);
        animation: icon-line-tip 0.75s;
      }

      &.line-long {
        top: 38px;
        right: 8px;
        width: 47px;
        transform: rotate(-45deg);
        animation: icon-line-long 0.75s;
      }
    }

    .icon-circle {
      top: -4px;
      left: -4px;
      z-index: 10;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      position: absolute;
      box-sizing: content-box;
      border: 4px solid rgba(76, 175, 80, 0.5);
    }

    .icon-fix {
      top: 8px;
      width: 5px;
      left: 26px;
      z-index: 1;
      height: 85px;
      position: absolute;
      transform: rotate(-45deg);
      background-color: #ffffff;
    }
  }
}

@keyframes rotate-circle {
  0% {
    transform: rotate(-45deg);
  }
  5% {
    transform: rotate(-45deg);
  }
  12% {
    transform: rotate(-405deg);
  }
  100% {
    transform: rotate(-405deg);
  }
}

@keyframes icon-line-tip {
  0% {
    width: 0;
    left: 1px;
    top: 19px;
  }
  54% {
    width: 0;
    left: 1px;
    top: 19px;
  }
  70% {
    width: 50px;
    left: -8px;
    top: 37px;
  }
  84% {
    width: 17px;
    left: 21px;
    top: 48px;
  }
  100% {
    width: 25px;
    left: 14px;
    top: 45px;
  }
}

@keyframes icon-line-long {
  0% {
    width: 0;
    right: 46px;
    top: 54px;
  }
  65% {
    width: 0;
    right: 46px;
    top: 54px;
  }
  84% {
    width: 55px;
    right: 0px;
    top: 35px;
  }
  100% {
    width: 47px;
    right: 8px;
    top: 38px;
  }
}
</style>