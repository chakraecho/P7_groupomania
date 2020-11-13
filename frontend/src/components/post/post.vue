<template>
  <div>
    <v-card class="position-relative">

      <v-card-title class="pa-0 post-header">

        <v-row>
          <div class="rounded-circle img-profil" @click="$router.push('/account/' + userId)">
            <img :src="User.profilImgUrl" :alt="'image de profil de ' + fullName" class="w-100"/>
          </div>
          <v-col class="py-0 pl-10 ml-10 ml-md-5">
            <p>{{ fullName }} <template v-if="group">dans le groupe {{group.groupName}}</template></p>
          </v-col>



          <v-btn
              name="options"
              icon class="position-absolute mr-3"
              aria-label="open_option"
              @click="$store.dispatch('post/open_sideoption', dataId)"
          >
            <v-icon>
              mdi-dots-vertical
            </v-icon>
          </v-btn>
        </v-row>
      </v-card-title>
      <v-card-text>
        {{ post.content }}
        <div v-if="post.imgUrl !== null" class="post--wrapper--img">
          <img :src="post.imgUrl" alt="image de post" class="post--img"/>
        </div>
      </v-card-text>
      <v-card-actions class="pa-0 h5">
        <v-row justify-space-between>
          <v-col>
            <v-btn
                name="dislike"
                icon
                :disabled="likefocus == true ? true : false"
                :class="likefocus == false ? 'active-btn' : 'inactive'"
                @click="likefocus === false ? sendLike(0) : sendLike(-1)"
            >
              -
            </v-btn>
            {{ likes }}
            <v-btn
                name="like"
                icon
                :disabled="likefocus == false ? true : false"
                :class="likefocus == true ? 'active-btn' : 'inactive'"
                @click="likefocus === true ? sendLike(0) : sendLike(1)"
            >
              +
            </v-btn>
          </v-col>

            <p class="text--minor mt-auto mb-5">le {{ date }}</p>

          <v-col>
            <v-btn name="open_comment" text @click.native="openComment">
              commentaires
            </v-btn>
          </v-col>
        </v-row>

      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
export default {
  props: ["post", "dataId"],
  data() {
    return {
      ...this._props.post,
    };
  },
  computed: {
    date() {
      return this._props.post.createdAt.split(" ")[0];
    },
    fullName() {
      return (
          this._props.post.User.firstName + " " + this._props.post.User.lastName
      );
    },
    likes() {
      return this._props.post.like - this._props.post.dislike;
    },
    likefocus() {
      if (this._props.post.userLikeds) {
        if (this._props.post.userLikeds.length === 0) {
          return null;
        } else if (this._props.post.userLikeds.length > 0) {
          if (
              Object.prototype.hasOwnProperty.call(
                  this._props.post.userLikeds[0],
                  "type"
              )
          ) {
            return this._props.post.userLikeds[0].type;
          } else {
            return null;
          }
        }
      } else {
        return null;
      }
      return null;
    }
  },
  methods: {
    openComment() {
      if (this._props.dataId == this.$store.state.comment.postId) {
        this.$store.dispatch("comment/neutraliseComment");
      } else {
        this.$store.dispatch("comment/setId", {postId: this._props.dataId});
      }
    },
    sendLike(like) {
      fetch(process.env.VUE_APP_BACKEND + "/api/post/" + this.postId + "/like", {
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        method: "post",
        body: JSON.stringify({like})
      }).then(response =>
          response.json().then(res => {
            this.$store.commit("post/UPDATE_POST", res.post);
            if (!response.ok) {
              this.$store.dispatch("activateSnack", {color: "error", msg: res.message})
            }
          })
      );
    }
  },
};
</script>


<style lang="scss" scoped>
.active-btn {
  background-color: grey;
}

.post {
  &-header {
    font-size: 16px;
  }

  &--wrapper--img {
    max-width: 200px !important;
    max-height: 200px !important;
    border: 1px grey solid;
    margin: auto
  }

  &--img {
    width: 100%
  }
}


.text--minor {
  font-size: 15px;
  height:max-content;
}

.img-profil {
  position: absolute;
  top: -10px;
  left: -10px;
  width: 50px;
  height: 50px;
  overflow: hidden;
  border: 2px solid grey;
  background-color: lightcyan;

  &:hover {
    cursor: pointer;
  }
}

.w-100 {
  width: 100%;
}

.position-relative {
  position: relative;
}
</style>
