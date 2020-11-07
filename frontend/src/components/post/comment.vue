<template>
  <v-card id="comment-block">

    <v-container class="container-fluid border py-15 ov-scroll">
      <v-card-title id="title">
        <p text-center>Commentaires</p>
      </v-card-title>
      <v-row class="comment-list">
        <v-row
            class="align-items-center"
            v-for="comment in comments"
            :key="comment"

        >
          <v-col>
            <v-row>
              <v-col
                  cols="3"
                  md="2"
                  class=" d-flex flex-column justify-content-between "
              >
                <img
                    :src="comment.User.profilImgUrl"
                    :alt="
                  'photo de ' +
                    comment.User.firstName +
                    ' ' +
                    comment.User.lastName
                "
                    class="rounded-circle w-100"
                />
              </v-col>
              <v-col cols="7">
                <p>{{ comment.content }}</p>
              </v-col>
              <v-btn
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
        </v-row>
      </v-row>


        <p v-if="comments.length === 0" class="text-center">Pas de commentaire pour le moment, n'hésitez pas à commenter</p>

      <div align="center" class=" d-flex flex-row input-lign">
        <v-col cols="8" md="10" lg="10">
          <v-text-field outline label="commentez !" v-model="content">
          </v-text-field>
        </v-col>
        <v-col cols="3" md="2" lg="1">
          <v-btn icon @click="sendComment">
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
      fetch(
        "http://localhost:3000/api/post/" +
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
        }
      ).then(response => {
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
      fetch("http://localhost:3000/api/post/comment/" + id + "/like", {
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

<style>
#title{
  position:absolute;
  top:0; left:0;
}

#comment-block{
  height:90vh;
}

.input-lign{
  position: absolute;
  bottom: 0; left:0;
  width:100%
}

.ov-scroll{
  overflow: scroll;
}

.comment-list{
  max-height:50vh
}
</style>