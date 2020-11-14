<template>
  <v-card id="comment-block">

    <v-container class="container-fluid border d-flex flex-column justify-between h-100">
      <v-card-title id="title">
        <p text-center>Commentaires</p>
      </v-card-title>
      <div class="comment-list">
                <p v-if="comments.length === 0" class="text-center">Pas de commentaire pour le moment, n'hésitez pas à commenter</p>

        <div
            class="align-items-center"
            v-for="comment in comments"
            :key="comment"

        >
          <v-col>
            <v-row>
              <v-col
                  cols="2"
                  md="3"
                  class=" profil-link"
                  @click="$router.push('/account/' + comment.userId)"
              >
                <img
                    :src="comment.User.profilImgUrl"
                    :alt="
                  'photo de ' +
                    comment.User.firstName +
                    ' ' +
                    comment.User.lastName
                "
                    class="rounded-circle comment_img border"
                />
              </v-col>
              <v-col cols="7">
                <p>{{ comment.content }}</p>
              </v-col>
              <v-btn
                  aria-label="open_comment_option"
                  name="comment_option"
                  icon
                  class="ml-auto"
                  @click="
                $store.dispatch('comment/open_sideoption', comment.commentId)
              "
              >
                <v-icon>
                  mdi-dots-vertical
                </v-icon>
              </v-btn>
            </v-row>
            <v-row align="center" justify="end">
              <v-btn
                  name="dislike"
                  :disabled="
                comment.commentLikeds[0]
                  ? comment.commentLikeds[0].type
                    ? true
                    : false
                  : false
              "
                  icon
                  @click="
                comment.commentLikeds[0]
                  ? comment.commentLikeds[0].type
                    ? commentLike({ id: comment.commentId, value: -1 })
                    : commentLike({ id: comment.commentId, value: 0 })
                  : commentLike({ id: comment.commentId, value: -1 })
              "
              >
                -
              </v-btn>
              <p class="ma-0 pa-0">{{ comment.like - comment.dislike }}</p>
              <v-btn
                  name="like"
                  :disabled="
                comment.commentLikeds[0]
                  ? comment.commentLikeds[0].type
                    ? false
                    : true
                  : false
              "
                  icon
                  @click="
                comment.commentLikeds[0]
                  ? comment.commentLikeds[0].type
                    ? commentLike({ id: comment.commentId, value: 0 })
                    : commentLike({ id: comment.commentId, value: 1 })
                  : commentLike({ id: comment.commentId, value: 1 })
              "
              >
                +
              </v-btn>
            </v-row>
          </v-col>
        </div>
      </div>
      <div align="center" class=" d-flex flex-row input-lign">
        <v-col cols="8" md="10" lg="10">
          <v-text-field name="comment" outline label="commentez !" v-model="content">
          </v-text-field>
        </v-col>
        <v-col cols="3" md="2" lg="1">
          <v-btn name="send_post" aria-label="send_post" icon @click="sendComment">
            <v-icon>
              mdi-send
            </v-icon>
          </v-btn>
        </v-col>
      </div>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      content: ""
    };
  },
  computed: {
    comments: {
      get() {
        return this.$store.state.comment.comments;
      }
    }
  },
  methods: {
    sendComment() {
      if(this.content.length === 0){
        return false ;
      }
      fetch(
        process.env.VUE_APP_BACKEND + "/api/post/" +
          this.$store.state.comment.postId +
          "/comment",
        {
          method: "post",
          body: JSON.stringify({
            userId: this.$store.state.user.userId,
            content: this.content
          }),
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          }
        }).then(response => {
        this.$store.dispatch("comment/setId", {
          postId: this.$store.state.comment.postId
        });
        response.json().then(res => {
          if (response.ok) {
            this.$store.dispatch("activateSnack", {
              color: "success",
              msg: "Commentaire envoyé !"
            });
          } else {
            this.$store.dispatch("activateSnack", {
              color: "error",
              msg: res.message
            });
          }
        });
      });
    },
    commentLike({ id, value }) {
      fetch(process.env.VUE_APP_BACKEND + "/api/post/comment/" + id + "/like", {
        method: "post",
        credentials: "include",
        body: JSON.stringify({ like: parseInt(value) }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => {
          if (!response.ok) {
            response.json().then(res => {
              this.$store.dispatch("activateSnack", {
                color: "error",
                msg: res.message
              });
            });
          }
          response.json().then(res => {
            this.$store.commit("comment/UPDATE_COMMENT", res.comment);
          });
        })
        .catch(error => console.log(error));
    }
  }
};
</script>

<style lang="scss" scoped>
.border{
  border : 1px solid grey;
}

#comment-block{
  height:90vh;
}
.w-100{
  width:100%
}
.comment_img{
  height:40px;
  width:40px;
}

.input-lign{

  width:100%
}


.comment-list{
  height:100%;
  overflow-y: scroll;
}

.h-100{
  height:100%
}

.profil-link{
    &:hover{
    cursor: pointer;
  }
}
</style>